import db from '../../../../libs/db'
import authorization from '../../../../middleware/authorization'

export default async function handler(req, res) {
  if(req.method !== 'PUT') return res.status(405).end()
  
  // const auth = await authorization(req, res)

  const { id } = req.query
  const { product, makanan, minuman, name, img, harga, desc } = req.body

  const update = await db('posts')
                          .where({ id })
                          .update({
                            product, 
                            makanan: null, 
                            minuman, 
                            name, 
                            img, 
                            harga, 
                            desc
                          })

  const updatedData = await db('posts').where({ id }).first()

  res.status(200)
  res.json({
    messgae: 'Post updated succesfully',
    data: updatedData
  })
}