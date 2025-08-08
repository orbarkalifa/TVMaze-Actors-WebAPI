import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { getCastData } from '../services/api'

const ActorsList = ({onSelected, selectedActor}) => {
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setError(null)
        setLoading(true)
        const data = await getCastData()
        console.log(data);
        
        setCast(data)
      } catch (error) {
        setError(error.message)        
      } finally{
        setLoading(false)
      } 
    }
    fetchCast()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='list-group'>

      {cast.map((actor) => (
        <Button
          className={`list-group-item ${selectedActor?.id === actor.person.id ? 'active' : '' }`}
          key={actor.person.id}
          onClick={() => onSelected(actor)}
        >
         {actor.person.id} 
        </Button>
      ))}
    </div>
  )
}

export default ActorsList
