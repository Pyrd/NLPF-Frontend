import axios from 'axios'


const GEOJSON_API_BASEURL = "https://geo.api.gouv.fr"
const ETAB_API_BASEURL = "https://app.dvf.etalab.gouv.fr"

function sortByNom(features) {
    return features.sort((a, b) => { return a.properties.nom.localeCompare(b.properties.nom); })
}

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
        if (['75', '69', '13'].includes(code)) {
            const resp2 = await axios.get(`${ETAB_API_BASEURL}/donneesgeo/arrondissements_municipaux-20180711.json`)
            const arrondissements = resp2.data
            const features = communes.features.filter((e) => {
                return !(['13055', '69123', '75056'].includes(e.properties.code))
            })
            arrondissements.features.forEach((arrondissement) => {
                if (arrondissement.properties.code.startsWith(code)) {
                    features.push(arrondissement)
                }
            })
            return { type: 'FeatureCollection', features: sortByNom(features) }

        }
        return resp.data
    } catch (err) {
        console.error(`Some error happened: ${err}`)
        return null
    }
}

export const fetchParcelles = async (code, idSection) => {
    try {
        const resp = await axios.get(`https://cadastre.data.gouv.fr/bundler/cadastre-etalab/communes/${code}/geojson/parcelles`)
        const { data } = resp
        console.log(code, idSection)
        return {
            type: 'FeatureCollection',
            features: data.features.filter((f) => {
                // console.log(f, idSection, f.id.startsWith(idSection))
                return f.id.startsWith(idSection)
            })
        }

    } catch (err) {
        console.error(`Some error happened: ${err}`)
        return null
    }
}

export const fetchSection = async (code) => {
    try {
        const resp = await axios.get(`https://cadastre.data.gouv.fr/bundler/cadastre-etalab/communes/${code}/geojson/sections`)
        return resp.data
    } catch (err) {
        console.error(`Some error happened: ${err}`)
        return null
    }
}

// `https://cadastre.data.gouv.fr/bundler/cadastre-etalab/communes/${communeToGet}/geojson/${layerName}`

//  /departements/35/communes?format=geojson&geometry=contour


// SECTIONS
//  "id": "75104000AB",
//  "commune": "75104",
//  "prefixe": "000",
//  "code": "AB",
//  "created": "2007-01-15",
//  "updated": "2014-02-12"

// PARCELLES
// "properties": {
// "id": "2A0410000A0678",
// "commune": "2A041",
// "prefixe": "000",
// "section": "A",
// "numero": "678",
// "contenance": 2720,
// "arpente": false,
// "created": "2005-12-30",
// "updated": "2019-12-11"
//       }