import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Activities.css'
import add from '../../assets/icons/add.png'
import add_small from '../../assets/icons/add_small.png'
import {getAllActivities} from '../../redux/actions'

class Activities extends React.Component {
    constructor(props){
      super(props)
      this.state = {mainActivity: ''}
  }

  componentDidMount() {
    this.props.getAllActivities()
    let id = this.props.match.params.id
    if (id) { this.setState({mainActivity: id.toLowerCase()}) }
  }

  difficultySet = (dif) => {
    const stars = ['★', '★', '★', '★', '★']
    const emptystars = ['☆', '☆', '☆', '☆', '☆']
    return stars.slice(0, dif).concat(emptystars.slice(0, (5 - dif)))
  }

  handleClick = (e) => {
    let value = e.target.id.toLowerCase()
    this.state.mainActivity == value ? this.setState({mainActivity: ''}) :
    this.setState({mainActivity: value})

  }
  
  render() {
    return (
      <>
    <div>
      <Link className='go_home' to='/home'><button className='go_home_button'>&#x276E; Home</button></Link>
      <h1>Activities</h1>
      <div className='main_activities_container'>
        {
          this.props.allActivities?.map((act) =>
            <div onClick={this.handleClick} id={act.name} className={this.state.mainActivity == act.name.toLowerCase() ? 'mainActivityContainer' : 'activityContainer'} key={act.id}>

              <h1 className='activity__name'>{act.name}</h1>
              <div className='difficulty'>
                <h6 title={act.difficulty}>Difficulty</h6>
              </div>
              <div title={act.difficulty} className='difficulty_stars'>
                <h2>{this.difficultySet(Number(act.difficulty))}</h2>
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
    </>
  )
}
};

const mapStateToProps=(state) => {
  return {
      allActivities: state.allActivities,
    }
  };

const mapDispatchToProps=(dispatch) => {
    return {
      getAllActivities: ()=> dispatch(getAllActivities())
    };
  };

  
export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(Activities);