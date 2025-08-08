import config from '../config.js';
import { Low, JSONFile } from 'lowdb'
import path from 'path';

const FILE_PATH = config.db.path;

const file = path.join(process.cwd(), FILE_PATH)
const adapter = new JSONFile(file)
const db = new Low(adapter)

const initializeDatabase = async () => {
  await db.read(); 
  db.data ||= { comments: {} }; 
  await db.write(); 
};

initializeDatabase();

export const saveComment = async (actorId, comment) => {
  db.data.comments[actorId] = comment;
  await db.write();
};

export const getComment = async (actorId) => {
  await db.read()
  return db.data.comments[actorId]
}

export const deleteComment = async (actorId) => {
  if (db.data.comments[actorId]){
    delete db.data.comments[actorId];
    await db.write();
    return true; 
  }
  return false;
}