import axios from 'axios'


const GEOJSON_API_BASEURL = "https://geo.api.gouv.fr"


export const fetchDepartements = async () => {
    try {
        const resp = await axios.get(`${GEOJSON_API_BASEURL}/departements`)
        return resp.data
    } catch (err) {
        console.error(`Some error happened: ${err}`)
        return null
    }
}

export const fetchCityOfDepartementContour = async (code) => {
    try {
        const resp = await axios.get(`${GEOJSON_API_BASEURL}/departements/${code}/communes?format=geojson&geometry=contour`)
        return resp.data
    } catch (err) {
        console.error(`Some error happened: ${err}`)
        return null
    }
}



//  /departements/35/communes?format=geojson&geometry=contour