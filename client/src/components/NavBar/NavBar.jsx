import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetNavigation, navBarInput, applyFilters, applyRefresh, getAllCountries } from '../../redux/actions';
import HomeIMG from "../../assets/icons/home.png"
import './navbar.css'


export const NavBar = () => {

  const dispatch = useDispatch()
  const [input, setInput] = useState("")


  function changeHandler(e) {
    const inputValue = e.target.value;
    var letters = /^[A-Za-z\s]*$/

    if (e.target.value.match(letters) && input.length < 45) {
      dispatch(navBarInput(inputValue))
      setInput(inputValue)
      dispatch(applyFilters())
      dispatch(resetNavigation())
    }
    if (input.length == 45) { setInput('') }
  }

  const submitHandler = (e) => {
    e.preventDefault();
  }

  const handleClick = () => {
    dispatch(applyRefresh())
    dispatch(getAllCountries())
  }

  return (
    <div>

      <form onSubmit={submitHandler}>
        <Link onClick={handleClick} to='/'><img className='home_img' src={HomeIMG} /></Link>
        <input
          value={input}
          className='navbarinput'
          autoComplete="off"
          type='text'
          autoCorrect='off'
          name='Input'
          id='NavbarInput'
          placeholder='Search a country'
          onChange={changeHandler}
        ></input>
      </form>


    </div>
  )
}

export default NavBar;