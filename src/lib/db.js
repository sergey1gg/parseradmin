const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_USER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  }
})

exports.query = async query => {
  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}