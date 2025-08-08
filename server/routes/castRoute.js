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
router.delete('/:id', handleDeleteActor)
router.post('/:id/comment',validationHandler, handleValidationErrors, handleAddActorComment)
router.get('/:id/comment', handleGetActorComment)

export default router