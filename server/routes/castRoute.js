import express from 'express'
import { handleGetCast } from '../controllers/castController.js'

const router = express.Router()

router.get('/', handleGetCast)

export default router