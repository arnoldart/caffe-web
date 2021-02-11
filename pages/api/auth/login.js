import db from '../../../libs/db'
import bcrypt from 'bcryptjs'
import { FaEraser } from 'react-icons/fa'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  const checkUser = await db('user')
                            .where({ email })
                            .first()

  if(!checkUser) return res.status(401).end()

  const checkPass = await bcrypt.compare(password, checkUser.password)

  if(!checkPass) return res.status(401).end()

  const token = jwt.sign({
    id: checkUser.id,
    email: checkUser.email
  }, 'yujincantikmpshhh', {
    expiresIn: '7d'
  })

  res.status(200)
  res.json({
    message: 'Login succesfully',
    token
  })
}