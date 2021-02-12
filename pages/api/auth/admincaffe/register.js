import db from '../../../../libs/db'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()

  const {user, password} = req.body

  const salt = bcrypt.genSaltSync(10)
  const passHas = bcrypt.hashSync(password, salt)

  const register = await db('admin').insert({
    user,
    password: passHas
  })

  const registeredUser = await db('admin')
                                  .where({ id:register })
                                  .first()

  res.status(200)
  res.json({
    message: 'Register',
    data: registeredUser
  })
}