import React from 'react'
import {Button} from 'react-bootstrap'

const WeatherButton = () => {
  return (
    <div>
      <Button variant="light">current location</Button>
      <Button variant="light">london</Button>
      <Button variant="light">paris</Button>
      <Button variant="light">edinburgh</Button>
      <Button variant="light">weymouth</Button>
    </div>
  )
}

export default WeatherButton
