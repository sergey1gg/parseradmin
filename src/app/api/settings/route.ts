import { NextResponse } from "next/server"

const db = require('@/lib/db')
const SQL = require('sql-template-strings')

export async function GET() {
    const usernames = await db.query(SQL`
        SELECT id,username
        FROM usernames
    `)
    const settings= await db.query(SQL`
        SELECT setting_key, setting_value
        FROM settings`)
  return NextResponse.json({usernames, settings})
}

export async function POST(req: Request) {
    const {id}= await req.json()
    const usernames = await db.query(SQL`
        DELETE FROM usernames
        WHERE id =${id}
    `)

  return NextResponse.json({usernames})
}