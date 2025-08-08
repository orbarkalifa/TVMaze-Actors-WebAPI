import 'dotenv/config';

const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  api: {
    tvmazeUrl: process.env.EXT_API_URL,
  },
  cache: {
    // process.env values are strings, NodeCache needs a number.
    ttl: parseInt(process.env.CACHE_TTL, 10) || 300, 
  },
  db: {
    path: process.env.COMMENTS_FILE_PATH || 'db/comments.json'
  }
};

export default config;