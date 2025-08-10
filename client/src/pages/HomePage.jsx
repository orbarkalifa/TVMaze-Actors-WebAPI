import { useState, useEffect } from 'react'
import { getCastData } from '../services/api'
import ActorsList from '../components/ActorsList.jsx'
import ActorDetails from '../components/ActorDetails.jsx'


const HomePage = () => {
  const [cast, setCast] = useState([])
  const [selectedActor, setSelectedActor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setError(null)
        setLoading(true)
        const data = await getCastData()
        setCast(data)
      } catch (error) {
        setError(error.message)  
      } finally{
        setLoading(false)
      } 
    }
    fetchCast()
  }, [])

  const handleActorDeleted = (actorId) => {
    setCast(prevCast => prevCast.filter(actor => actor.person.id !== actorId)); // optimistic ui
    setSelectedActor(null); 
    getCastData().then(setCast).catch(setError); // background sync
  };

  if (loading) return (<div className="alert alert-info" role="alert">
  Loading...
</div>)
  if (error) return (<div className="alert alert-danger" role="alert">
Error: {error}</div>)



  return (
    <div className='container mt-4'>
      <div className='row'>
        <h1>Under the Dome - Cast</h1>
        <div className='col-md-4'>
          <ActorsList
            cast={cast}
            onSelected={(actor) => setSelectedActor(actor)} 
            selectedActor={selectedActor?.person}
          />
        </div>
        
        <div className='col-md-8'>
          {selectedActor ? (
            <ActorDetails
              actor={selectedActor.person}
              onActorDeleted={handleActorDeleted}
            />
          ) : (
            <div className='card'>
              <div className='card-body text-center'>
                <p className='text-muted'>Select an actor from the list to show it's details</p>
              </div>
            </div>
          )}  
        </div>
      </div>
    </div>
  )
}

export default HomePage
