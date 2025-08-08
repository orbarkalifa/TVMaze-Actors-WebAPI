import { Low, JSONFile } from 'lowdb'
import path from 'path';

const file = path.join(process.cwd(),'db/comments.txt')
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
  await db.read()
  if (db.data.comments[actorId]){
    delete db.data.comments[actorId];
    await db.write();
    return true; 
  }
  return false;
}