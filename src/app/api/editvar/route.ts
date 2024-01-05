import { NextResponse } from "next/server"

const db = require('@/lib/db')
const SQL = require('sql-template-strings')


export async function POST(req: Request) {
    const {setting_value, setting_key}= await req.json()
    const usernames = await db.query(SQL`
        UPDATE settings
        SET setting_value = ${setting_value}
        WHERE setting_key = ${setting_key}
    `)

  return NextResponse.json({usernames})
}