import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllActivities, getAllCountries } from '../../redux/actions'
import { Link } from 'react-router-dom'


import './CountryDetail.css'

export const CountryDetail = (props) => {
    const id = props.match.params.id

    const dispatch = useDispatch()

    const allCountries = useSelector(state => state.allCountries)
    const allActivities = useSelector(state => state.allActivities)
    const filteredCountries = useSelector(state => state.filteredCountries)
    const filters = useSelector(state => state.filters)


    useEffect( () => {
        if (filteredCountries.length < 1) {
            dispatch(getAllCountries())
            dispatch(getAllActivities())
        }
    }, [])


    const Country = allCountries.find((country) => country.id == id)

    const CountryIndex = filteredCountries.indexOf(Country)
    const nextCountry = filteredCountries[CountryIndex + 1]
    const prevCountry = filteredCountries[CountryIndex - 1]


    // [ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
    // [ ] Código de país de 3 letras (id)
    // [ ] Capital
    // [ ] Subregión
    // [ ] Área (Mostrarla en km2 o millones de km2)
    // [ ] Población
    // [ ] Actividades turísticas con toda su información asociada

  return (
<div> 
    <Link className='go_home'to='/home'><button className='go_home_button'>&#x276E; Home</button></Link>
    {Country &&     
                    
        <div className="container">
            <div className='navigator_detail'>
            <Link className={prevCountry ? 'navBoton_detail' : 'hidden_navBoton_detail'} to={prevCountry && `/detail/${prevCountry.id}`}>&#x276E;</Link>  
            <Link className={nextCountry ? 'navBoton_detail' : 'hidden_navBoton_detail'} to={nextCountry && `/detail/${nextCountry.id}`}>&#x276F;</Link>
            </div>
            <h1 className={Country.name.length < 17 ? 'countryname_detail' : 'countryname_small_detail'}>{Country.name.toUpperCase()} ({Country.id})</h1>
            <img className="countrydetail_flag" src={Country.flag} alt={Country.id}/>
            <h3 className="">Capital: {Country.capital}</h3>
            <div><h5 className="">{Country.subregion}</h5></div>
            <small>Population: {Country.population}</small>
            <div><small className="">Area: {Country.area}km²</small></div>
            <small><a target="_blank" href={`https://es.wikipedia.org/wiki/${Country.name}`} className="" >...learn more</a></small>
            <hr></hr>
            
            <div classNameName='Activities'>
                {Country.Activities.length > 0 ?
                <div>
                    <h2>Activities of {Country.name}:</h2>
                        {
                        Country.Activities.map((act) => 
                        <Link to='../activities'><small className="activity_name">
                            {act.name.toUpperCase()} 
                            {Country.Activities.indexOf(act) == (Country.Activities.length - 1) ? ' ' : ' /'} 
                        </small></Link>)
                        }
                        <div>
                            <Link to={`../activities/add/${Country.id}`}><small>+add more</small></Link>
                        </div>
                </div> :
                <div>
                <h3>There is no activities for {Country.name.toUpperCase()}</h3>
                <Link to={`../activities/add/${Country.id}`}><h2>¿Wanna create one?</h2></Link></div>
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