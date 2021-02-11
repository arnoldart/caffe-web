import db from '../../../libs/db'

export default async function handler(req, res) {
  if(req.method !== 'GET') return res.status(405)

  const posts = await db('post')

  res.status(200)
  res.json({
    message: 'Post Data',
    data: posts
  })
}