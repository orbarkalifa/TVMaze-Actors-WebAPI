import config from '../config.js';
import { getCache, setCache } from "./cacheService.js"
import { saveComment, getComment, deleteComment } from "./commentService.js"

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
  let cast = getCache();
  if (!cast || cast?.length === 0) {
    cast = await fetchAndCacheCast()  
  }
  return cast;
};

export const deleteActor = (id) => {
  const cachedCast = getCache()
  const characterExistsInCache = cachedCast?.some(c => c.person.id.toString() === id);

  if (!cachedCast || !characterExistsInCache) {
    const notFoundError = new Error(`Character with ID ${id} not found.`);
    notFoundError.status = 404;
    throw notFoundError; 
  }
  const updatedCast = cachedCast.filter(c => c.person.id.toString() !== id);
  setCache(updatedCast);
}

export const addActorComment = async (id, comment) => {
  const cast = await getCast()
  const actor = cast.find(actor => actor.person.id === Number(id))
  if (!actor) {
    const notFoundError = new Error(`Actor not found.`);
    notFoundError.status = 404;
    throw notFoundError; 
  }
  await saveComment(id,comment)
}

export const getActorComment = async (id) => {
  return await getComment(id)
}

export const deleteActorComment = async(id) => {
  const commentExists = await getComment(id)
  if (!commentExists) {
    const notFoundError = new Error(`Actor comment not found for deletion`);
    notFoundError.status = 404;
    throw notFoundError; 
  }
  await deleteComment(id)
}