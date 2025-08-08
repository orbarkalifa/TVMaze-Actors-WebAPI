import { useState, useEffect } from 'react'
import { getActorComment, addActorComment, deleteActor } from '../services/api.js'

const ActorDetails = ({ actor, onActorDeleted }) => {
  const [comment, setComment] = useState('')
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState('true')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComment = async () => {
      try {
        setError(null)
        setLoading('Fetching comment...')
        const response = await getActorComment(actor.id)
        setComment(response.data || '')
      } catch (error) {
        console.error(error);
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchComment()
  },[actor.id])

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      setError(null)
      setLoading('Posting new comment...')
      const response = await addActorComment(actor.id, newComment)
      const savedComment = response.data
      if (savedComment) {
        setComment(savedComment)
        setNewComment('')
      }
    } catch (error) {
      console.error(error);
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFromCache = async () => {
    try {
      setLoading('Deleting actor...')
      setError(null)
      await deleteActor(actor.id)
      onActorDeleted(actor.id);
    } catch (error) {
      console.error(error);
      setError(error.message)
    } finally {
      setLoading('')
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
        {loading && (
          <div>Loading comments...</div>
        )}
        {error && (
          <div>Error loading comments</div>
        )}
        {!loading && !error && comment ? (
          <p><strong>Comment:</strong> {comment}</p>
        ) : (
          <p>No comment yet.</p>
        )}
        <form onSubmit={handleSubmitComment}>
          <div className="input-group">
              <textarea 
                className="form-control"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="btn btn-outline-secondary">Button</button>
          </div>
        </form>
      </div>
      <div className='card-footer'>
        <button className="btn btn-danger" onClick={handleDeleteFromCache}>
          Delete Actor
        </button>
      </div>
    </div>
  )
}

export default ActorDetails
