import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addActivity, applyOrder, getAllActivities, getAllCountries } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './AddActivity.css';

export const AddActivity = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        
        dispatch(getAllCountries())
        dispatch(getAllActivities())
        let id = props.match.params.id

        if (id && !input.countries.includes(id)) {
            setInput({ ...input, countries: input.countries.concat(id) })
            handleFullCountry(id)
        }
        if (allActivities.some(act => act.name === id)) {
            setInput({ ...input, name: id })
        }

    }, [])

    // ---- Selectors ---
    const allActivities = useSelector(state => state.allActivities)
    const allCountries = useSelector(state => state.allCountries).sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    })



    // ---- Local States ----
    const [input, setInput] = useState({
        name: '',
        difficulty: 0,
        duration: '',
        season: '',
        countries: []
    })

    const [error, setError] = useState(false)
     
    const [selectedFullCountries, setFullCountry] = useState([])
    const [hover, setHover] = useState(0);
    const existingActivity = allActivities.some(act => act.name == input.name)

    let fullFilled = 
    input.name && 
    input.difficulty && 
    input.duration && 
    input.season && 
    input.countries.length > 0 ? 
    true : false



    // ---- Handlers ----
    const handleFullCountry = (id) => {
        let finder = allCountries.find(country => country.id == id)
        if (finder) {
            setFullCountry([...selectedFullCountries.concat(finder)])
        }
    }

    const inputHandler = (e) => {
        const inputValue = e.target.value;
        var letters = /^[A-Za-z\s]*$/

        if (e.target.name === 'name' && inputValue.length < 16 && inputValue.match(letters)) {
            setInput({
                ...input,
                [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
            })

        } else if (e.target.name === 'countries') {
            if (!(input.countries.some(country => country == e.target.value))) {
                setInput({
                    ...input,
                    [e.target.name]: input.countries.concat(e.target.value)
                })
                handleFullCountry(e.target.value)
            }

        } else if (e.target.name !== 'name') {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }


    const handleSubmit = (e) => {
    e.preventDefault();

        if (fullFilled) {
            dispatch(addActivity(input))
            history.push(`/activities/${input.name}`)
            existingActivity ? 
            alert(`Countries successfully added to ${input.name}`) : alert(`Activity ${input.name} successfully created`)
        } else {
            setError(true)
            // alert('Faltan completar datos')
        }
    }

    const handleSubmitError = (e) => {
        e.preventDefault();
    }

    const handleIconDelete = (e) => {
        setFullCountry(selectedFullCountries.filter(country => country.id !== e.target.id))
        setInput({
            ...input,
            countries: input.countries.filter(country => country !== e.target.id)
        })
    }



    return (
        <div>
            <Link className='go_home' to='/home'><button className='go_home_button'>&#x276E; Home</button></Link>

            <h1>Create/ADD new activity</h1>
            <div className='form_container'>
                <form onSubmit={input.name.length > 2 ? handleSubmit : handleSubmitError}>

                    {/* ACTIVITY NAME INPUT */}

                    <div className='add_activityname'>
                        <label>Activity: </label>
                        <input
                            autoComplete="off"
                            autoCorrect='off'
                            className='add_input'
                            onChange={inputHandler}
                            value={input.name}
                            type='text'
                            name='name'
                            placeholder='Activity name: '
                            />
                    </div>
                    <div>
                    </div>
                    <hr></hr>


                    {/* ACTIVITY SEASON INPUT */}
                    <div className='add_activityseason'>
                        <label>Season: </label>
                        <select name='season' className='add_input' onChange={inputHandler} required>
                            <option hidden>Select season</option>
                            <option value='summer'>Summer</option>
                            <option value='spring'>Spring</option>
                            <option value='winter'>Winter</option>
                            <option value='autumn'>Autumn</option>
                        </select>
                    </div>
                    <hr></hr>



                    {/* ACTIVITY DURATION INPUT */}
                    <div className='add_activitydifficulty'>
                        <label>Duration: </label>
                        <input name='duration' className='add_input' onChange={inputHandler} type="time" required></input>
                    </div>
                    <hr></hr>



                    {/* ACTIVITY DIFFICULTY INPUT */}
                    <div className="add_rating">
                        <label>Difficulty: </label>
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={index <= (hover || input.rating) ? "on" : "off"}
                                    onClick={() => setInput({ ...input, difficulty: index })}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(input.difficulty)}
                                >
                                    <span className="star">&#9733;</span>
                                </button>
                            );
                        })}
                    </div>
                    <hr></hr>


                    {/* ACTIVITY COUNTRIES INPUT */}
                    <div className='add_activitycountry'>
                        <label>Countries: </label>
                        <select name='countries' className='add_input' onChange={inputHandler} required>
                            <option value="" hidden>Select Countries</option>
                            {allCountries.map(country =>
                                <option value={country.id}
                                    flag={country.subregion}
                                    name='countries'
                                    key={country.id}>
                                    {country.name}
                                </option>)}
                        </select>
                    </div>



                    {/* SELECTED COUNTRIES */}
                    <hr></hr>
                    <div className='selected_countries'>

                        {selectedFullCountries && selectedFullCountries.map(country =>
                            <img
                                id={country.id}
                                onClick={handleIconDelete}
                                title={`Click to delete ${country.name}`}
                                src={country.flag}
                                className='country_icon' />)}

                    </div>


                    {/* SUBMIT BUTTON */}
                    <button className='add' type="submit">Add Activity</button>

                    <div>
                        {input.name.length > 0 && input.name.length < 3 ? <small className='errors'>Name must have at least 3 characters</small> : ''}
                        {existingActivity ? <small className='adding_cuntries_msg'>Adding countries to {input.name}</small> : ''}
                        {error ? <small className='errors'>All fields are required</small> : ''}
                    </div>

                </form>
            </div>


        </div>
    )
}

