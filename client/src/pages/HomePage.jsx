import { useState } from 'react'
import ActorsList from '../components/ActorsList.jsx'
import ActorDetails from '../components/ActorDetails.jsx'


const HomePage = () => {
  const [selectedActor, setSelectedActor] = useState(null)

  return (
    <div className='container mt-4'>
      <div className='row'>
        <h1>Under the Dome - Cast</h1>
        <div className='col-md-4'>
          <ActorsList
            onSelected={(actor) => setSelectedActor(actor)} 
            selectedActor={selectedActor?.person}
          />
        </div>
        
        <div className='col-md-8'>
          {selectedActor ? (
            <ActorDetails
              actor={selectedActor.person}
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
