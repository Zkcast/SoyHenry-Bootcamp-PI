import {
    GET_ALL_COUNTRIES,
    GET_ALL_ACTIVITIES,
    NAVBAR_INPUT,
    HANDLE_NAVIGATION,
    APPLY_FILTERS,
    APPLY_CONTINENT,
    APPLY_HENRYFILTER,
    RESET_NAVIGATION,
    APPLY_ORDER,
    APPLY_ACTIVITY,
    APPLY_REFRESH

} from "./actions";


const initialState = {
    allCountries: [],
    allActivities: [],
    filteredCountries: [],
    countriesPerPages: 10,
    navigation: { page1: 0, page2: 10, index: 1 },
    navBarInput: '',
    filters: {
        continents: "All continents",
        orderby: '',
        NineCountriesInFirstPage: false,
        activity: '',
    }

}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                filteredCountries: action.payload
            }

        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload
            }

        case NAVBAR_INPUT: {
            return {
                ...state,
                navBarInput: action.payload.toLowerCase()
            }
        }

        case RESET_NAVIGATION:
            return {
                ...state,
                navigation: {
                    page1: 0,
                    page2: state.filters.NineCountriesInFirstPage ? 9 : state.countriesPerPages,
                    index: 1
                }
            }

        case APPLY_REFRESH:
            return {
                ...state,
                navigation: { page1: 0, page2: 10, index: 1 },
                navBarInput: '',
                filters: {
                    continents: "All continents",
                    orderby: '',
                    NineCountriesInFirstPage: false,
                    activity: ''
                }
            }

        case APPLY_CONTINENT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    continents: action.payload
                }
            }

        case APPLY_HENRYFILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    NineCountriesInFirstPage: !state.filters.NineCountriesInFirstPage
                }
            }


        case APPLY_ACTIVITY:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    activity: !action.payload.includes('Select') ? action.payload : ""
                }
            }

        case APPLY_ORDER:

            if (action.payload === 'Order by:') {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        orderby: ''
                    }
                }
            }

            if (action.payload === 'A to Z' || action.payload === 'az') {
                const orderAZ = state.filteredCountries.sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1 }
                    return 0;
                })

                return {
                    ...state,
                    filteredCountries: orderAZ,
                    filters: {
                        ...state.filters,
                        orderby: 'az'
                    }
                }
            }

            if (action.payload === 'Z to A' || action.payload === 'za') {
                const orderZA = state.filteredCountries.sort(function (a, b) {
                    if (a.name > b.name) { return -1 }
                    if (b.name > a.name) { return 1 }
                    return 0;
                })

                return {
                    ...state,
                    filteredCountries: orderZA,
                    filters: {
                        ...state.filters,
                        orderby: 'za'
                    }
                }
            }

            if (action.payload === 'Population') {
                const orderByPopulation = state.filteredCountries.sort(function (a, b) {
                    if (Number(a.population) > Number(b.population)) { return -1 }
                    if (Number(b.population) > Number(a.population)) { return 1 }
                    return 0;
                })

                return {
                    ...state,
                    filteredCountries: orderByPopulation,
                    filters: {
                        ...state.filters,
                        orderby: 'Population'
                    }
                }
            }

            if (action.payload === 'Less population') {
                const orderByPopulation = state.filteredCountries.sort(function (a, b) {
                    if (Number(a.population) > Number(b.population)) { return 1 }
                    if (Number(b.population) > Number(a.population)) { return -1 }
                    return 0;
                })

                return {
                    ...state,
                    filteredCountries: orderByPopulation,
                    filters: {
                        ...state.filters,
                        orderby: 'Less population'
                    }
                }
            }


        case APPLY_FILTERS:

            const filter = state.filters
            let superFilter = state.allCountries

            if (state.navBarInput.length > 0) {
                superFilter = superFilter.filter(country => country.name.toLowerCase().startsWith(state.navBarInput.toLowerCase()))
            }

            if (filter.continents !== 'All continents') {
                superFilter = superFilter.filter(country => country.continent == filter.continents)
            }

            if (filter.activity.length > 0) {
                superFilter = superFilter.filter((country) =>
                    country.Activities.some((act) =>
                        act.name == filter.activity)
                )
            }

            return {
                ...state,
                filteredCountries: superFilter
            }


        case HANDLE_NAVIGATION:

            let countriesPerPages = state.countriesPerPages
            let henryfilter = state.filters.NineCountriesInFirstPage
            let index = state.navigation.index
            let page1 = state.navigation.page1
            let page2 = state.navigation.page2

            if (action.payload === 'back' && index !== 1) {
                return {
                    ...state,
                    navigation: {
                        page1: index === 2 ? 0 : page1 - countriesPerPages,
                        page2: index === 2 && henryfilter ? 9 : !henryfilter && index === 2? 10 : page2 - countriesPerPages,
                        index: index - 1
                    }
                }
            }

            else if (action.payload === 'all_back' && index !== 1) {
                return {
                    ...state,
                    navigation: {
                        page1: 0,
                        page2: henryfilter ? 9 : countriesPerPages,
                        index: 1
                    }
                }
            }

            else if (action.payload === 'forward' && page2 < state.filteredCountries.length) {
                return {
                    ...state,
                    navigation: {
                        page1: (page1 + countriesPerPages) - (henryfilter & index == 1 ? 1 : 0),
                        page2: page2 + countriesPerPages,
                        index: index + 1
                    },
                }
            }

            else if (action.payload === 'all_forward' && page2 < state.filteredCountries.length) {
                return {
                    ...state,
                    navigation: {
                        page1: Math.ceil( (state.filteredCountries.length + (henryfilter ? 1 : 0)) - countriesPerPages ),
                        page2: Math.ceil( state.filteredCountries.length + (henryfilter ? 1 : 0) ),
                        index: Math.ceil( (state.filteredCountries.length + (henryfilter ? 1: 0)) / countriesPerPages )
                    },
                }

            } else { return { ...state } }




        default:
            return { ...state }
    }

}

export default rootReducer;
