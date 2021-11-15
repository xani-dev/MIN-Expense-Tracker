import axios from "axios"

const baseURL = "http://localhost:1337"

const service = axios.create({ baseURL:baseURL});

const transactionsAPI = {
    all: () => service.get(`/transactions`)
};

export { transactionsAPI };