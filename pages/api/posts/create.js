import db from '../../../libs/db'
import authorization from '../../../middleware/authorization'

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end()
  
  const auth = await authorization(req, res)

  const { product, makanan, minuman, name, img, harga, desc } = req.body

  if (minuman === '') {
    const create = await db('posts').insert({ 
      product, 
      makanan, 
      minuman: null,
      name, 
      img, 
      harga, 
      desc

    })

    const createdData = await db('posts').where('id', create).first()

    res.status(200)
    res.json({
      message: 'Post created successfully',
      data: createdData
    })

    return
  }

  if (makanan === '') {
    const create = await db('posts').insert({
      product, 
      makanan: null, 
      minuman,
      name, 
      img, 
      harga, 
      desc

    })
    
    const createdData = await db('posts').where('id', create).first()

    res.status(200)
    res.json({
      message: 'Post created successfully',
      data: createdData
    })

    return
  }

  res.status(200)
  res.json({
    message: 'Post created failed',
  })
}