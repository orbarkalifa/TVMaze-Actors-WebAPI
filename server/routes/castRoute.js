import express from 'express'
import { getCast } from '../controllers/castController.js'

const router = express.Router()

router.get('/', getCast)

export default router