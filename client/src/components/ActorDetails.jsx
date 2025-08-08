import { useState, useEffect } from 'react'
import { getActorComment, addActorComment } from '../services/api.js'

const ActorDetails = ({actor}) => {
  const [comment, setComment] = useState('')
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getActorComment(actor.id)
        if (response && response.data) {
          setComment(response.data)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  },[])

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      const response = await addActorComment(id, newComment)
      const savedComment = response.data
      if (savedComment) {
        setComment(savedComment)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>{actor.name}</h3>
      </div>
      <div className="card-body">
        <p><strong>ID:</strong> {actor.id}</p>
        <p><strong>Birthday:</strong> {actor.birthday}</p>
        <p><strong>Gender: </strong> {actor.gender}</p>
      </div>
      {comment ? (
        <p><strong>Comment:</strong> {comment}</p>
      ) : (
        <p>No comment yet.</p>
      )}
      <form onSubmit={handleSubmitComment}></form>
      <div className="input-group mx-4 my-2">
        <input
          className="form-control"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
          <button className="btn btn-outline-secondary" type="button">Button</button>
      </div>

    </div>
  )
}

export default ActorDetails
