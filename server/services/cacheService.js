import config from '../config.js';
import NodeCache from 'node-cache'

const CACHE_TTL = config.cache.ttl;

const client = new NodeCache({stdTTL: CACHE_TTL})

export const getCache = () => client.get('cast');
export const setCache = (value) => client.set('cast', value)