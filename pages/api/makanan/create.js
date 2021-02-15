import db from '../../../libs/db'
import authorization from '../../../middleware/authorization'

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()
  
  const auth = await authorization(req, res)

  const { type, name, img, harga, desc } = req.body

  const create = await db('makanan').insert({
    type, 
    name, 
    img,
    harga, 
    desc
  })

  const createdData = await db('makanan').where('id', create).first()

  res.status(200)
  res.json({
    message: 'Post created successfully',
    data: createdData
  })
}