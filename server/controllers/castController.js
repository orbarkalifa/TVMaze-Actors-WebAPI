import * as actorService from '../services/actorsService.js'

// GET /api
export const handleGetCast = async (req, res, next) => {
  try {
    const castData = await actorService.getCast()
    res.status(200).json(castData)
  } catch (error) {
    next(error); 
  }
}

// POST /api/:id/comment
export const handleAddActorComment = async (req, res, next) => {
  const { id } = req.params
  const { comment } = req.body
  try {
    await actorService.addActorComment(id, comment)
    res.status(201).json({text: comment})
  } catch (error) {
    next(error)
  }
}

// GET /api/:id/comment
export const handleGetActorComment = async (req,res, next) => {
  try {
    const { id } = req.params
    const data = await actorService.getActorComment(id)
    res.status(200).json({text: data})
  } catch (error) {
    next(error)
  }
}

// DELETE /api/:id
export const handleDeleteActor = (req,res,next) => {
  try {
    const { id } = req.params
    actorService.deleteActor(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export const handleDeleteActorComment = async (req, res, next) => {
  try {
    const { id } = req.params
    await actorService.deleteActorComment(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}