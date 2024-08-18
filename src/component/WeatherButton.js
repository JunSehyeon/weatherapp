import React from 'react'
import {Button} from 'react-bootstrap'

const WeatherButton = ({cities,selectedCity,onCityClick,onCurrentLocationClick}) => {
  //console.log('cities',cities)

  return (
    <div>
      <Button variant={selectedCity===''?'primary':'light'} onClick={onCurrentLocationClick}>
        current location
      </Button>

      {cities.map((item)=>(
        <Button variant={selectedCity===item?'primary':'light'} onClick={()=>onCityClick(item)}>
          {item}
        </Button>
      ))}
    </div>
  )
}

export default WeatherButton
