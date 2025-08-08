import { getCast, deleteActor, addActorComment, getActorComment } from '../services/actorsService.js'

export const handleGetCast = async (req, res, next) => {
  try {
    const data = await getCast()
    console.log(data);
    res.status(200).json({ data: data })
  } catch (error) {
    next(error)
  }
}

export const handleAddActorComment = async (req, res, next) => {
  const { id } = req.params
  const { comment } = req.body
  try {
    addActorComment(id, comment)
    res.status(200).json({data: comment})
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const handleGetActorComment = async (req,res, next) => {
  const { id } = req.params
  try {
    const data = await getActorComment(id)
    res.status(200).json({data: data})
  } catch (error) {
    console.error(error);
    next()
  }
}

export const handleDeleteActor = async (req,res,next) => {
  const { id } = req.params
  try {
    deleteActor(id)
    res.status(200).json({message: "Actor deleted"})
  } catch (error) {
    console.error(error)
    next()
  }
}