import {open} from "sqlite";
import sqlite3 from "sqlite3";
import SQL from 'sql-template-strings'
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { login, password } = await request.json();

    const db = await open({
      filename: 'db/dev.db',
      driver: sqlite3.Database
    })

    const query = SQL`SELECT * FROM user WHERE login = ${login} AND password = ${password}`;
    const result = await db.get(query)

    if (result) {
      return new Response(
        JSON.stringify(result),
        { status: 200 }
      )
    }

    return new Response(
      JSON.stringify({ code: 2001 }),
      { status: 400 }
    )

  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({ error: error, }),
      { status: 500 }
    )
  }
}
