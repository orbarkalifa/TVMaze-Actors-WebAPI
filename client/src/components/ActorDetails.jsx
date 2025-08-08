import React from 'react'

const ActorDetails = ({actor}) => {
  return (
    <div>
      <h1>{actor.name}</h1>
      <h1>{actor.id}</h1>
      <h1>{actor.birthday}</h1>
      <h1>{actor.gender}</h1>
    </div>
  )
}

export default ActorDetails
