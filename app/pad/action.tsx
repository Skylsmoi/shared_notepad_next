'use server'

import {open} from "sqlite";
import sqlite3 from "sqlite3";
import SQL from 'sql-template-strings'
import {revalidatePath} from "next/cache";
import {SavedPadType} from '../lib/SavedPadList/SavedPadList'

const db = await open({
  filename: 'db/dev.db',
  driver: sqlite3.Database
})

export async function getCurrentPad(): Promise<string> {
  const query = 'SELECT * FROM pad';
  const result = await db.get(query)
  return result?.text || ''
}

export async function updateCurrentPad(newText: string):Promise<void> {
  const query = SQL`UPDATE pad SET text = ${newText} WHERE id = 1`;
  const result = await db.run(query);
  console.log('result', result);

  revalidatePath('/pad');
}

export async function getPadList(): Promise<SavedPadType[]> {
  const query = "SELECT * FROM SavedPad";
  const result = await db.all(query)
  console.log('result', result);

  return result.map(p => {
    const dateObject = new Date(Number(p.modified));
    const dateString =  `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`
    console.log('dateString', dateString)
    return {
      ...p,
      modified: dateString,
    }
  })
}

export async function savePad(name:string, text:string): Promise<void> {
  const modified = Date.now();

  const query = SQL`
    INSERT INTO SavedPad (name, text, modified) VALUES (${name},${text},${modified})
      ON CONFLICT(name) DO UPDATE SET text = ${text}, modified = ${modified};
  `

  const result = await db.run(query);
  console.log('result', result);

  revalidatePath('/pad');
}

export async function setCurrentPad(pad: SavedPadType): Promise<void> {
  const query = SQL`UPDATE pad SET text = ${pad.text} WHERE id = 1`;
  const result = await db.run(query);
  console.log('result', result);

  revalidatePath('/pad');
}

export async function deletePad(padId: number): Promise<void> {
  const query = SQL`DELETE FROM SavedPad WHERE id = ${padId}`;
  const result = await db.run(query);
  console.log('result', result);

  revalidatePath('/pad');
}
