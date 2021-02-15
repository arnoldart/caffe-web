import db from '../../../libs/db'
import authorization from '../../../middleware/authorization'

export default async function handler(req, res) {
  if(req.method !== 'GET') return res.status(405).end()
  
  // const auth = await authorization(req, res)

  const { name } = req.query
  
  const updatedData = await db('makanan').where({ name }).first()

  res.status(200)
  res.json({
    messgae: 'Post updated succesfully',
    data: updatedData
  })
}