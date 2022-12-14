import axios from "axios"

export const http = axios.create({
  baseURL: "https://bible-api.com/"
})
