import { getCache, setCache } from "./cacheService.js"
import { saveComment, getComment } from "./commentService.js"

const API_URL = process.env.EXT_API_URL 

export const fetchAndCacheCast = async () => {
  const response = await fetch(API_URL)
  const data = await response.json()
  setCache(data)
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
  const cast = getCache()
  if (!cast) {
    throw new Error("Cache is not available.");
  }
  const originalLength = cast.length;
  const filteredCast = cast.filter((actor) => actor.person.id != id);
  const newLength = filteredCast.length;

  if (originalLength > newLength) {
    setCache(filteredCast);
  } 
  else {
    throw new Error("Actor was not found in cache")
  }
}

export const addActorComment = (id, comment) => {
  saveComment(id,comment)
}

export const getActorComment = (id) => {
  return getComment(id)
}

