import { getCache, setCache } from "./cacheService.js"
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
  return fetchAndCacheCast()
}