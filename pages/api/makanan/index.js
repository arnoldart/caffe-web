import db from '../../../libs/db'
import authorization from '../../../middleware/authorization'

export default async function handler(req, res) {
  if(req.method !== 'GET') return res.status(405).end()

  const auth = await authorization(req, res)

  const makanan = await db('makanan')

  res.status(200)
  res.json({
    message: 'Post Data',
    data: makanan
  })
}