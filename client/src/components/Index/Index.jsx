import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import plane from '../../assets/icons/plane.png'
import './index.css'


export const Index = () => {

  const [visual_plane, setPlane] = useState(false)


  function handleHover() {
    visual_plane ? setPlane(false) : setPlane(true)

  }



  return (
    <div>
      <Link to='/home'>
        <img
          onMouseOver={handleHover}
          onMouseOut={handleHover}
          src={plane}
          className='indexButton' />

      </Link>
      {visual_plane && <h5 className='indexPlane'>CLICK TO ENTER</h5>}

    </div>
  )
}

export default Index;