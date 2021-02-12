import db from '../../../../libs/db'
import bcrypt from 'bcryptjs'
import { FaEraser } from 'react-icons/fa'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()

  const { user, password } = req.body

  const checkUser = await db('admin')
                            .where({ user })
                            .first()

  if(!checkUser) return res.status(401).end()

  const checkPass = await bcrypt.compare(password, checkUser.password)

  if(!checkPass) return res.status(401).end()

  const token = jwt.sign({
    id: checkUser.id,
    user: checkUser.user
  }, 'chaeryeongimut', {
    expiresIn: '7d'
  })
  // $2a$10$Z/BoFk74WJkhpGXEba2hC.9ttFwUDV9m3gxpIV0.i0/S.S1jEu4rC
  res.status(200)
  res.json({
    message: 'Login succesfully',
    token
  })
}