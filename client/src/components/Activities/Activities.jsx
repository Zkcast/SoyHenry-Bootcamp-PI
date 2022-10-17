import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Activities.css'
import add from '../../assets/icons/add.png'
import add_small from '../../assets/icons/add_small.png'
import { getAllActivities } from '../../redux/actions'


export const Activities = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(getAllActivities())
  }, [])


  const allActivities = useSelector(state => state.allActivities)
  const stars = ['★', '★', '★', '★', '★']
  const emptystars = ['☆', '☆', '☆', '☆', '☆']

  const difficultySet = (dif) => {
    return stars.slice(0, dif).concat(emptystars.slice(0, (5 - dif))) 
  }
  
  return (
    <div>
      <Link className='go_home'to='/home'><button className='go_home_button'>&#x276E; Home</button></Link>

      <h1>Activities</h1>

      <div className='main_activities_container'>
    {
        allActivities.map((act) => 
        <div className='activityContainer'key={act.id}>
        <h1>{act.name}</h1>
        <div className='rating'>
        <h5 title={act.difficulty}>Difficulty: {difficultySet(Number(act.difficulty))}</h5>
        </div>
        <h5>Duration: {act.duration.slice(0,2)}hs</h5>
        <h5>Season: {act.season}</h5>
        <hr></hr>
        <div className='flag_country_container'>
        {act.Countries.map(country => 
          <Link to={`/detail/${country.id}`}>
            <img title={country.name} className='country_icon' src={country.flag}/>
          </Link>
          )}
          <Link to={`/activities/add/${act.name}`}><img className='add_activity_button_small' src={add_small}></img></Link>

                    
                  <hr></hr>
          </div>
        </div>
        )

    }
     <div className='add_activity_container'key='asd'>
    <Link to='/activities/add'><img className='add_activity_button' src={add}></img></Link>
     </div>

      </div>


    </div>
  )
}
