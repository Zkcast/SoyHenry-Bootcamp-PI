import axios from 'axios'

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES"
export const FILTER_COUNTRY = "FILTER_COUNTRY"
export const HANDLE_NAVIGATION = "HANDLE_NAVIGATION"
export const NAVBAR_INPUT = "NAVBAR_INPUT"
export const APPLY_FILTERS = "APPLY_FILTERS"
export const APPLY_CONTINENT = "APPLY_CONTINENT"
export const APPLY_HENRYFILTER = "APPLY_HENRYFILTER"
export const RESET_NAVIGATION = "RESET_NAVIGATION"
export const APPLY_POPULATION = "APPLY_POPULATION"
export const APPLY_ORDER = "APPLY_ORDER"
export const APPLY_ACTIVITY = "APPLY_ACTIVITY"
export const APPLY_REFRESH = "APPLY_REFRESH"

export const getAllCountries = () => {
     return async function (dispatch) {
        fetch(`http://localhost:3001/countries`)
        .then(response => response.json())
        .then(data => dispatch({type: GET_ALL_COUNTRIES, payload: data}))
    }
}

export const getAllActivities = () => {
    return async function (dispatch) {
        fetch(`http://localhost:3001/activities`)
        .then(response => response.json())
        .then(data => dispatch({type: GET_ALL_ACTIVITIES, payload: data}))
    }
}

export function addActivity(payload) {
    return async function () {
        try {
            const res = await axios.post('http://localhost:3001/activities', payload)
            return res;
        } catch (error) {
            console.log(error)
        }
    }
}

export const navBarInput = (inputValue) => {
    return {type: NAVBAR_INPUT, payload: inputValue}
}


export const filterCountry = (inputValue) => {
    return {type: FILTER_COUNTRY, payload: inputValue}
}

export const handleNavigation = (payload) => {
    return {type: HANDLE_NAVIGATION, payload}
}

export function resetNavigation() {
    return {type: RESET_NAVIGATION}
}

export function applyFilters() {
    return {type: APPLY_FILTERS}
}

export function applyContinent(payload) {
    return {type: APPLY_CONTINENT, payload}
}

export function applyHenryFilter() {
    return {type: APPLY_HENRYFILTER}
}

export function applyPopulation() {
    return {type: APPLY_POPULATION}
}

export function applyOrder(payload) {
    return {type: APPLY_ORDER, payload}
}

export function applyActivity(payload) {
    return {type: APPLY_ACTIVITY, payload}
}

export function applyRefresh() {
    return {type: APPLY_REFRESH}
}

