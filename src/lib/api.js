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
  return axios.post(`${baseUrl}/auth/register/`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/auth/login/`, formData)
}

// posts

export function getAllPosts() {
  return axios.get(`${baseUrl}/posts/`)
}