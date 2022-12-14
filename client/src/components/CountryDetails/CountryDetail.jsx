import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllActivities, getAllCountries } from '../../redux/actions'
import { Link } from 'react-router-dom'
import add_small from '../../assets/icons/add_small.png'



import './CountryDetail.css'

export const CountryDetail = (props) => {
    const id = props.match.params.id

    const dispatch = useDispatch()

    const allCountries = useSelector(state => state.allCountries)
    const allActivities = useSelector(state => state.allActivities)
    const filteredCountries = useSelector(state => state.filteredCountries)
    const filters = useSelector(state => state.filters)


    useEffect(() => {
        if (filteredCountries.length < 1) {
            dispatch(getAllCountries())
            dispatch(getAllActivities())
        }
    }, [])


    const Country = allCountries.find((country) => country.id == id)

    const CountryIndex = filteredCountries.indexOf(Country)
    const nextCountry = filteredCountries[CountryIndex + 1]
    const prevCountry = filteredCountries[CountryIndex - 1]


    return (
        <div>
            <Link className='go_home' to='/home'><button className='go_home_button'>&#x276E; Home</button></Link>
            <div className='navigator_detail'>
            <Link className={prevCountry ? 'navBoton_detail' : 'hidden_navBoton_detail'} to={prevCountry && `/detail/${prevCountry.id}`}>&#x276E;</Link>
            <Link className={nextCountry ? 'navBoton_detail' : 'hidden_navBoton_detail'} to={nextCountry && `/detail/${nextCountry.id}`}>&#x276F;</Link>
            </div>

            {Country &&

                <div className="container">



                    <h1 className={Country.name.length < 17 ? 'countryname_detail' : 'countryname_small_detail'}>{Country.name.toUpperCase()} ({Country.id})</h1>
                    <img className="countrydetail_flag" src={Country.flag} alt={Country.id} />
                    <h3 className="">Capital: {Country.capital}</h3>
                    <div><h5 className="">{Country.subregion}</h5></div>
                    <small>Population: {Country.population}</small>
                    <div><small className="">Area: {Country.area}km??</small></div>
                    <small className='small_more'><a target="_blank" href={`https://es.wikipedia.org/wiki/${Country.name}`} className="" >...learn more</a></small>
                    <hr></hr>

                    <div>
                        {Country.Activities.length > 0 ?
                            <div>
                                <h2>Activities of {Country.name}:</h2>
                                <div className='activitiesxcountry_container'>
                                {
                                    Country.Activities.map((act) =>
                                        <div className="activity_name">
                                        <small>
                                            <Link to={`../activities/${act.name}`}>{act.name.toUpperCase()}</Link>
                                        </small>
                                        </div>
                                        )
                                        
                                }
                                </div>
                                <div>
                                    {/* <Link to={`../activity/add/${Country.id}`}><small className='small_addmore'>+ add activity</small></Link> */}
                                    <Link to={`../activity/add/${Country.id}`}><button className='addmore'>+ add activity</button></Link>

                                </div>

                            </div> :
                            <div>
                                <h3>There is no activities for {Country.name.toUpperCase()}</h3>
                                <Link to={`../activity/add/${Country.id}`}><h2>??Wanna create one?</h2></Link></div>
                        }

                    </div>
                </div>
            }
        </div>

    )
}




{/* <div>
<h1 classNameName='country_title'>{Country.name.toUpperCase()} ({Country.id})</h1>    

{
<div classNameName='Container'>
    <div>
        <div classNameName='countrydetail_div'>
        <span><img classNameName='countrydetail_flag' src={Country.flag}></img></span>
        <span>
        <h5>Continent: {Country.continent}</h5>
        <h5>Capital: {Country.capital}</h5>
        <h5>Area: {Country.area}</h5>
        <h5>Population: {Country.population}</h5>
        </span>
        </div>
    </div>
    <div classNameName='Activities'>
    <h2>in {Country.name} you can do this activities:</h2>
            <ul>
            {
                Country.Activities.map((act) => 
                <span classNameName='activity_name'>{act.name}</span>
                )
            }
            </ul>
    </div>
</div>
}


</div> */}