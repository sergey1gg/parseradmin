const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: "45.9.24.153",
    database: "parsertg",
    user: "parsertg",
    password: "a23sdg@d5!kd#29"
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