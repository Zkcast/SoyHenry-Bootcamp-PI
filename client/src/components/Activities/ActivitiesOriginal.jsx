import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Activities.css'
import add from '../../assets/icons/add.png'
import add_small from '../../assets/icons/add_small.png'
import { getAllActivities } from '../../redux/actions'


export const Activities = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    let id = props.match.params.id
    if (id) {setMainActivity(id.toLowerCase())}
    dispatch(getAllActivities())
  }, [])

  const [mainActivity, setMainActivity] = useState('') 
  const allActivities = useSelector(state => state.allActivities)

  const difficultySet = (dif) => {
    const stars = ['★', '★', '★', '★', '★']
    const emptystars = ['☆', '☆', '☆', '☆', '☆']
    return stars.slice(0, dif).concat(emptystars.slice(0, (5 - dif)))
  }

  const handleClick = (e) => {
    let value = e.target.id.toLowerCase()
    mainActivity == value ? setMainActivity('') :
    setMainActivity(value)

  }
  return (
    <div>
      <Link className='go_home' to='/home'><button className='go_home_button'>&#x276E; Home</button></Link>
      <h1>Activities</h1>
      <div className='main_activities_container'>
        {
          allActivities.map((act) =>
            <div onClick={handleClick} id={act.name} className={mainActivity == act.name.toLowerCase() ? 'mainActivityContainer' : 'activityContainer'} key={act.id}>

              <h1 className='activity__name'>{act.name}</h1>
              <div className='difficulty'>
                <h6 title={act.difficulty}>Difficulty</h6>
              </div>
              <div title={act.difficulty} className='difficulty_stars'>
                <h2>{difficultySet(Number(act.difficulty))}</h2>
              </div>

              <h5>Duration: {act.duration.slice(0, 5)}hs</h5>
              <h5>Season: {act.season}</h5>

              <hr></hr>
              <div className='flag_country_container'>
                {act.Countries.map(country =>
                  <Link to={`/detail/${country.id}`}> <img title={country.name} className='country_icon' src={country.flag} /></Link>
                )}

                <Link to={`/activity/add/${act.name}`}><img className='add_activity_button_small' src={add_small}></img></Link>

                <hr></hr>
              </div>
            </div>
          )
        }
        <div className='add_activity_container' key='asd'>
          <Link to='/activity/add'><img className='add_activity_button' src={add}></img></Link>
        </div>

      </div>


    </div>
  )
}
