import config from '../config.js';
import { getCache, setCache } from "./cacheService.js"
import { saveComment, getComment } from "./commentService.js"

const API_URL = config.api.tvmazeUrl 

export const fetchAndCacheCast = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch from TVMaze API. Status: ${response.status}`);
  }
  const data = await response.json()
  setCache(data)
  return data
}

export const getCast = async () => {
  const cast = getCache()
  if (cast) {
    return cast
  }
  return await fetchAndCacheCast()  
}

export const deleteActor = (id) => {
  const cachedCast = getCache()
  if (!cachedCast) {
    const notFoundError = new Error(`Cannot delete. Character with ID ${id} not found.`);
    notFoundError.status = 404;
    throw notFoundError; 
  }

  const characterExistsInCache = cachedCast.some(c => c.person.id.toString() === id);
  if (!characterExistsInCache) {
    const notFoundError = new Error(`Character with ID ${id} not found.`);
    notFoundError.status = 404;
    throw notFoundError; 
  }
  const updatedCast = cachedCast.filter(c => c.person.id.toString() !== id);
  setCache(updatedCast);
}

export const addActorComment = (id, comment) => {
  // validate id (?)
  saveComment(id,comment)
}

export const getActorComment = (id) => {
  // validate id (?)
  return getComment(id)
}

