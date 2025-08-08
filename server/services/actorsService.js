import { getCache, setCache } from "./cacheService.js"
import { saveComment, getComment } from "./commentService.js"

const API_URL = process.env.EXT_API_URL 

export const fetchAndCacheCast = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch from TVMaze API. Status: ${response.status}`);
  }
  const data = await response.json()
  setCache(data)
  console.log("Cast fetched and cache populated");
  return data
}

export const getCast = async () => {
  const cast = getCache()
  if (cast) {
    console.log("Cache hit");
    return cast
  }
  console.log("Cache miss");
  return await fetchAndCacheCast()  
}

export const deleteActor = (id) => {
  const cachedCast = getCache()
  if (!cachedCast) {
    console.log('Cache is empty, nothing to delete');
    
  } else {
    const characterExistsInCache = cachedCast.some(c => c.person.id.toString() === id);
    if (!characterExistsInCache) {
      const notFoundError = new Error(`Character with ID ${id} not found.`);
      notFoundError.status = 404;
      throw notFoundError; 
    }
    const updatedCast = cachedCast.filter(c => c.person.id.toString() !== id);
    setCache(updatedCast);
    console.log(`Character ${id} removed from cache.`);
  }
}

export const addActorComment = (id, comment) => {
  // TODO: validate id
  saveComment(id,comment)
}

export const getActorComment = (id) => {
  // TODO: validate id
  return getComment(id)
}

