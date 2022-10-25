let activitiesOfWorld = [

    {
        name: "Surf",
        difficulty: "4",
        duration: "06:00:00",
        season: "summer",
    },

    {
        name: "Raffting",
        difficulty: "3",
        duration: "08:00:00",
        season: "autumm"
    },

    {
        name: "Skydiving",
        difficulty: "5",
        duration: "02:00:00",
        season: "spring"
    },
 
    {
        name: "Skate",
        difficulty: "5",
        duration: "04:00:00",
        season: "winter"
    },

    {
        name: "Running",
        difficulty: "2",
        duration: "04:00:00",
        season: "winter"
    },
    
    {
        name: "Diving",
        difficulty: "5",
        duration: "03:30:00",
        season: "summer"
        
    },

    {
        name: "Trekking",
        difficulty: "1",
        duration: "02:00:00",
        season: "spring"
    },

]

let CountriesWhereSkate = [
    "MEX",
    "COL",
    "VAT",
    "ARG"
]

let CountriesWhereSurf = [
    "ARG",
    "COL",
    "VAT",
    "USA"
]

let CountriesWhereRaffting = [
    "ARG",
    "CHN"
]

let CountriesWhereSkydiving = [
    "COL",
    "VAT"
]

let CountriesWhereRunning = [
    "CIV",
    "CHN",
    "AGO"
]

let CountriesWhereDiving = [
    "DOM",
    "ECU",
    "FSM"
]

let CountriesWhereTrekking = [
    "NZL",
    "PER",
    "BTN"
]

const CountriesWhere = (activity) => {

    if (activity == 'Surf') return CountriesWhereSurf 
    if (activity == 'Raffting') return CountriesWhereRaffting 
    if (activity == 'Skydiving') return CountriesWhereSkydiving 
    if (activity == 'Skate') return CountriesWhereSkate 
    if (activity == 'Running') return CountriesWhereRunning 
    if (activity == 'Diving') return CountriesWhereDiving 
    if (activity == 'Trekking') return CountriesWhereTrekking 
}

module.exports = {
    activitiesOfWorld,
    CountriesWhere,
};