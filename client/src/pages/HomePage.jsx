import { useState } from 'react'
import ActorsList from '../components/ActorsList.jsx'
import ActorDetails from '../components/ActorDetails.jsx'


const HomePage = () => {
  const [selectedActor, setSelectedActor] = useState(null)

  return (
    <div className='container text-center'>
      <div className='row'>
        <div className='col'>
          <ActorsList
            onSelected={(actor) => setSelectedActor(actor)} 
            selectedActor={selectedActor?.person}
          />
        </div>
        
        <div className='col'>
          {selectedActor ? (
            <ActorDetails
              actor={selectedActor.person}
            />
          ) : (
            <h1>Select an actor from the list to show it's details</h1>
          )}  
        </div>
      </div>
    </div>
  )
}

export default HomePage
