import NodeCache from 'node-cache'

const CACHE_TTL = process.env.CACHE_TTL || 300

const client = new NodeCache({stdTTL: CACHE_TTL})

export const getCache = () => client.get('cast');
export const setCache = (value) => client.set('cast', value)