import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import maps_img from "../../assets/icons/ubication.png"
import './home.css'
import {
    applyHenryFilter,
    applyContinent,
    applyFilters,
    getAllCountries,
    getAllActivities,
    handleNavigation,
    resetNavigation,
    applyOrder,
    applyActivity,
    applyRefresh
} from '../../redux/actions'


export const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {

        setTimeout(async function () {
            if (filteredCountries.length < 1) {
                dispatch(getAllCountries())
                dispatch(getAllActivities())
            }
            setLoading(false)
        }, 300);

    }, [])




    // --- Selectors ---
    const filteredCountries = useSelector(state => state.filteredCountries)
    const navigation = useSelector(state => state.navigation)
    const henryFilter = useSelector(state => state.filters.NineCountriesInFirstPage)
    const allActivities = useSelector(state => state.allActivities)
    const continent = useSelector(state => state.filters.continents)
    const activity = useSelector(state => state.filters.activity)
    const order = useSelector(state => state.filters.orderby)



    // ---- Local states ----
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState('')
    const [filterValues, setFilterValues] = useState({
        continent: continent,
        orderby: order,
        activity: activity
    })


    // ---- Handlers ---- 
    const handleHenryFilter = () => {
        dispatch(applyHenryFilter())
        dispatch(resetNavigation())
        setRefresh('henryfilter')
    }

    const handlePagination = (e) => {
        dispatch(handleNavigation(e.target.name))
        setRefresh('pagination')
    }


    const handleOrder = (e) => {
        dispatch(applyFilters())
        dispatch(applyOrder(e.target.value))
        setFilterValues({
            ...filterValues,
            orderby: e.target.value
        })
    }

    const handleContinent = (e) => {
        dispatch(applyContinent(e.target.value))
        dispatch(applyFilters())
        dispatch(resetNavigation())
        dispatch(applyOrder(order))
        setFilterValues({
            ...filterValues,
            continent: e.target.value
        })
    }

    const handleActivity = (e) => {
        dispatch(applyActivity(e.target.value))
        dispatch(applyFilters())
        dispatch(applyOrder(order))
        setFilterValues({
            ...filterValues,
            activity: e.target.value
        })
    }

    const handleRefresh = () => {
        dispatch(applyRefresh())
        dispatch(getAllCountries())
        setFilterValues({
            continent: 'All continents',
            orderby: '',
            activity: ''
        })
    }

    return (

        <div>

            <div>
                <button name='refresh' className='refresh' title='' onClick={handleRefresh}>Refresh</button>
                <Link to='/activities'><button name='allActivities' className='see_activities_button'>See all activities</button></Link>
                <button name='henryfilter' className={henryFilter ? 'active' : 'disabled'} onClick={handleHenryFilter}>HenryFilter</button>
            </div>

            {/* ---- Filters ---- */}

            <select value={filterValues.orderby} className={filterValues.orderby && !filterValues.orderby.startsWith('Order') ? 'inputSelected' : 'inputSelector'} onChange={handleOrder}>
                <option>Order by:</option>
                <option className='inputSelector'>A to Z</option>
                <option className='inputSelector'>Z to A</option>
                <option className='inputSelector'>Population</option>
                <option className='inputSelector'>Less population</option>
            </select>

            <select value={filterValues.continent} className={filterValues.continent && filterValues.continent !== 'All continents' ? 'inputSelected' : 'inputSelector'} onChange={handleContinent}>
                <option name='All'>All continents</option>
                <option name='Africa'>Africa</option>
                <option name='Antarctica'>Antarctica</option>
                <option name='Asia'>Asia</option>
                <option name='Europe'>Europe</option>
                <option name='North America'>North America</option>
                <option name='Oceania' >Oceania</option>
                <option name='South America'>South America</option>
            </select>

            <select value={filterValues.activity} className={filterValues.activity && filterValues.activity !== 'Select activity:' ? 'inputSelected' : 'inputSelector'} onChange={handleActivity}>
                <option>Select activity:</option>
                {allActivities.map((act) =>
                    <option>{act.name}</option>
                )
                }
            </select>



            {/* ---- Navigation ---- */}

            {!loading &&
                <div className='navigation'>
                    <button className={navigation.page1 > 0 ? 'navBoton' : 'hidden_navBoton'} name='all_back' title='Show first ten' onClick={handlePagination}>&#x276E;&#x276E;</button>
                    <button className={navigation.page1 > 0 ? 'navBoton' : 'hidden_navBoton'} name='back' onClick={handlePagination}>&#x276E;</button>
                    {navigation.index !== 0 ? navigation.index : ""}
                    <button className={navigation.page2 < filteredCountries.length ? 'navBoton' : 'hidden_navBoton'} name='forward' onClick={handlePagination}>&#x276F;</button>
                    <button className={navigation.page2 < filteredCountries.length ? 'navBoton' : 'hidden_navBoton'} name='all_forward' title='Show last ten' onClick={handlePagination}>&#x276F;&#x276F;</button>
                </div>
            }


            {/* ---- Main countries container  */}
            <div className='main_country_container'>
                {
                    loading ? (<p>Loading...</p>) :
                        (
                            filteredCountries.length > 0 ?
                                filteredCountries.slice(

                                    navigation.page1,
                                    navigation.page2,

                                )?.map((country) =>

                                    <div className='flagContainer' key={country.id}>
                                        <a href={country.maps} target="_blank" ><img className="maps" type="image" src={maps_img} border="0" alt="maps_img" /></a>
                                        <div className={country.name.length < 17 ? 'countryname' : 'countryname_small'}><h4>{country.name}</h4></div>
                                        <Link to={`/detail/${country.id}`}><img className='country_flag' src={country.flag}></img></Link>
                                        <h5>{country.continent}</h5>
                                    </div>

                                ) : <p className='navigation'>No country with that name. Try again</p>
                        )
                }

            </div>

        </div>
    )
}

export default Home;