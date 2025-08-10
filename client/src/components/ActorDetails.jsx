import { useState, useEffect } from 'react'
import { getActorComment, addActorComment, deleteActor, deleteActorComment } from '../services/api.js'
import notificationService from '../services/notificationService';

const ActorDetails = ({ actor, onActorDeleted }) => {
  const [comment, setComment] = useState('')
  const [newComment, setNewComment] = useState('')
  const [loadingComment, setLoadingComment] = useState(false)
  const [submittingAction, setSubmittingAction] = useState(null);

  useEffect(() => {
    setLoadingComment(true)
    const fetchComment = async () => {
      try {
        const response = await getActorComment(actor.id)
        setComment(response.text || '')
      } catch (err) {
        notificationService.error(err.message);
      } finally {
        setLoadingComment(false)
      }
    }
    fetchComment()
  },[actor.id])

  const handleAddComment = async (event) => {
    event.preventDefault();

    const promise = addActorComment(actor.id, newComment);

    notificationService.promise(promise, {
      pending: "Posting your comment...",
      success: "Comment added successfully!",
      error: {
        render: ({ data }) => data.message,
      },
    });

    try {
      setSubmittingAction("addComment");
      const response = await promise;
      setComment(response.data.text);
      setNewComment("");
    } catch (err) {
      console.error(err.message);
    } finally {
      setSubmittingAction(null);
    }
  };

  const handleDeleteFromCache = async () => {
    const promise = deleteActor(actor.id);

    notificationService.promise(promise, {
      pending: "Deleting actor from cache...",
      success: "Actor deleted!",
      error: ({ data }) => data.message,
    });

    try {
      setSubmittingAction("deleteCache");
      await promise;
      onActorDeleted(actor.id);
    } catch (err) {
      console.error(err.message);
    } finally {
      setSubmittingAction(null);
    }
  };

  const handleDeleteComment = async () => {
    const promise = deleteActorComment(actor.id);

    notificationService.promise(promise, {
      pending: "Deleting actor comment...",
      success: "Comment deleted!",
      error: "Error deleting comment",
    });

    try {
      setSubmittingAction("deleteComment");
      await promise;
      setComment("");
    } catch (err) {
      console.error(err.message);
    } finally {
      setSubmittingAction(null);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <img src={actor.image.medium} alt="actor image" />
        <h3>{actor.name}</h3>
      </div>
      <div className="card-body">
        <p><strong>ID:</strong> {actor.id}</p>
        <p><strong>Birthday:</strong> {actor.birthday}</p>
        <p><strong>Gender: </strong> {actor.gender}</p>
        {loadingComment ? (
          <p>Loading comment...</p> 
        ) : comment ? (
          <p><strong>Comment:</strong> {comment}</p>
        ) : (
          <p>No comment yet.</p>
        )}
        <form onSubmit={handleAddComment}>
          <div className="input-group">
              <textarea
                className="form-control"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                disabled={submittingAction || !newComment}
              >
                {submittingAction === "addComment"
                  ? "Submitting..."
                  : "Add Comment"}
              </button>
          </div>
        </form>
        <button
          className="btn btn-sm btn-outline-warning"
          onClick={handleDeleteComment}
          disabled={submittingAction || !comment}
        >
          {submittingAction === "deleteComment"
            ? "Deleting..."
            : "Delete Comment"}
        </button>
      </div>
      <div className='card-footer'>
        <button
          className="btn btn-danger"
          onClick={handleDeleteFromCache}
          disabled={submittingAction}
        >
          <i className="bi bi-trash">
            {" "}
            {submittingAction === "deleteCache"
              ? "Deleting..."
              : "Delete from cache"}
          </i>
        </button>
      </div>
    </div>
  )
}

export default ActorDetails
