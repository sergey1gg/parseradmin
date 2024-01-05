import { NextResponse } from "next/server"

const db = require('@/lib/db')
const SQL = require('sql-template-strings')


export async function POST(req: Request) {
    const {username}= await req.json()
    const usernames = await db.query(SQL`
        INSERT INTO usernames (username)
        VALUES (${username})
    `)

  return NextResponse.json({usernames})
}