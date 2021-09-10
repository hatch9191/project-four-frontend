import axios from 'axios'
// import { getToken } from './auth'
import { baseUrl } from '../config'

// function headers() {
//   return {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   }
// }


// users

export function registerUser(formData) {
  return axios.post(`${baseUrl}/register`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/login`, formData)
}

// posts

export function getAllPosts() {
  return axios.get(`${baseUrl}/posts`)
}