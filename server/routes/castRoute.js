import express from 'express'
import { validationHandler, handleValidationErrors } from '../middleware/validationMiddleware.js'
import {
  handleGetCast,
  handleAddActorComment,
  handleGetActorComment,
  handleDeleteActor
} from '../controllers/castController.js'

const router = express.Router()

router.get('/', handleGetCast)
router.post('/:id/comment',validationHandler, handleValidationErrors, handleAddActorComment)
router.get('/:id/comment', handleGetActorComment)
router.delete('/cache/:id', handleDeleteActor)

export default router