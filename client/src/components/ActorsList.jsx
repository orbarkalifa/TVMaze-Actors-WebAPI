import { Button } from 'react-bootstrap'

const ActorsList = ({cast, onSelected, selectedActor}) => {

  return (
    <div className='list-group'>
      {cast.map((actor) => (
        <Button
          className={`list-group-item ${selectedActor?.id === actor.person.id ? 'active' : '' }`}
          key={actor.person.id}
          onClick={() => onSelected(actor)}
        >
         {actor.person.name} 
        </Button>
      ))}
    </div>
  )
}

export default ActorsList
