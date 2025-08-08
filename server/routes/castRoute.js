import express from 'express'
import { handleGetCast, handleAddActorComment,handleGetActorComment, handleDeleteActor } from '../controllers/castController.js'

const router = express.Router()

router.get('/', handleGetCast)
router.post('/:id/comment', handleAddActorComment)
router.get('/:id/comment', handleGetActorComment)
router.delete('/cache/:id', handleDeleteActor)

export default router