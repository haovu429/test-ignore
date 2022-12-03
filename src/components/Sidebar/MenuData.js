const employmentType = [
    {"name": "FULL_TIME", "label":"Full Time", value:"Full Time"},
    {"name": "PART_TIME", "label":"Part Time", value:"Part Time"},
    {"name": "INTERNSHIP", "label":"Internship", value:"Internship"},
    {"name": "FREELANCE", "label":"Freelance", value:"Freelance"},
    {"name": "CONTRACT", "label":"Contract", value:"Contract"},
    {"name": "TEMPORARY", "label":"Temporary", value:"Temporary"},
]

const experienceYear = [
    {"id": 1, "name": "All", "value":-1, "label":"All"},
    {"id": 2, "name": "Senior", "value":5, "label":"Senior (5 years)"},
    {"id": 3, "name": "Mid", "value": 3, "label":"Mid (3 years)"},
    {"id": 4, "name": "Junior", "value": 2, "label":"Junior (2 years)"},
]

const postTime = [
    {"id": 1, "name": "Anytime", "value":-1, "label":"All"},
    {"id": 2, "name": "LastDay", "value":1, "label":"Last day"},
    {"id": 3, "name": "Last3Days", "value":3, "label":"Last 3 days"},
    {"id": 4, "name": "LastWeek", "value":7, "label":"Last week"},
]

export {employmentType, experienceYear, postTime};