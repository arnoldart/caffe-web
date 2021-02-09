import db from '../../../libs/db'

export default async function handler(req, res) {
  const create = await db('post').insert({
    title: 'Post title 1',
    content: 'Post content 1'
  })

  res.status(200)
  res.json({
    message: 'Post created successfully'
  })
}