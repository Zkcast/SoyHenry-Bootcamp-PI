
//CIV, AGO, ASM, CHN

let activitiesOfWorld = [

    { name: "Surf", 
    difficulty: "4", 
    duration: "06:00:00", 
    season: "summer",}, 

    { name: "Raffting", 
    difficulty: "3", 
    duration: "08:00:00", 
    season: "autumm"},

    { name: "Skydiving", 
    difficulty: "5", 
    duration: "02:00:00", 
    season: "spring"},

    { name: "Ski", 
    difficulty: "3", 
    duration: "04:00:00", 
    season: "winter"},

    { name: "Skate", 
    difficulty: "5", 
    duration: "04:00:00", 
    season: "winter"},

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
    "VAT"
]

let CountriesWhereRaffting = [
    "ARG",
    "CHN"
]

let CountriesWhereSkydiving = [
    "COL",
    "VAT"
]

let CountriesWhereSki = [
    "CIV"
]


module.exports = {
    activitiesOfWorld,
    CountriesWhereSurf,
    CountriesWhereRaffting,
    CountriesWhereSkydiving,
    CountriesWhereSki,
    CountriesWhereSkate 
  };