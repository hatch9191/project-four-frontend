import axios from 'axios'
import { getToken } from './auth'
import { baseUrl } from '../config'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}


//* users

export function registerUser(formData) {
  return axios.post(`${baseUrl}/auth/register/`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/auth/login/`, formData)
}

export function getSingleUser(userId) {
  return axios.get(`${baseUrl}/auth/profile/${userId}/`, headers())
}

export function followToggle(userId) {
  return axios.post(`${baseUrl}/auth/profile/${userId}/follow/`, null, headers())
}

//* posts

export function getAllPosts() {
  return axios.get(`${baseUrl}/posts/`)
}