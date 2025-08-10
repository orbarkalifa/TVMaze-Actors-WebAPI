import 'dotenv/config';

const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  api: {
    tvmazeUrl: process.env.EXT_API_URL,
  },
  cache: {
    // convert process.env string to number for NodeCache
    ttl: parseInt(process.env.CACHE_TTL, 10) || 300, 
  },
  db: {
    path: process.env.COMMENTS_FILE_PATH || 'db/comments.json'
  }
};

export default config;