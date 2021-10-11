import axios from 'axios'

const URL_API = "https://stormy-taiga-31121.herokuapp.com"

export const fetchUser = async () => {
    try {
        const response = await axios.get(`${URL_API}/user/me`)
        return response.data
    } catch (error) {
        console.error('An error happened: ${error}')
        return null
    }
}