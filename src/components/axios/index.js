import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "https://api-nodejs-todolist.herokuapp.com/",
    headers: { "X-Custom-Header": "foobar" },
    timeout: 10000,
})

