import axios from "axios"

const baseURL = 'http://localhost:3001/'

const service = axios.create({ baseURL:baseURL});

const authAPI = {
    signup: (values) => service.post('/signup', values),
}

export { authAPI };