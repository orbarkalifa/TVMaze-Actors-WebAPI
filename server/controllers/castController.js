import * as actorService from '../services/actorsService.js'

export const handleGetCast = async (req, res, next) => {
  try {
    const castData = await actorService.getCast()
    res.status(200).json(castData)
  } catch (error) {
    console.error("Error in getCast service:", error.message);
    next(error); 
  }
}

export const handleAddActorComment = (req, res, next) => {
  try {
    const { id } = req.params
    const { comment } = req.body
    actorService.addActorComment(id, comment)
    res.status(200).json({data: comment})
  } catch (error) {
    console.error("Error adding actor comment:", error);
    next(error)
  }
}

export const handleGetActorComment = async (req,res, next) => {
  try {
    const { id } = req.params
    const data = await actorService.getActorComment(id)
    res.status(200).json({data: data})
  } catch (error) {
    console.error("Error getting actor comment:", error);
    next(error)
  }
}

export const handleDeleteActor = (req,res,next) => {
  try {
    const { id } = req.params
    actorService.deleteActor(id)
    res.status(204).send()
  } catch (error) {
    console.error("Error deleting actor from cache:", error)
    next(error)
  }
}