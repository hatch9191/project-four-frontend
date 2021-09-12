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

export function editUser(userId, formData) {
  return axios.put(`${baseUrl}/auth/profile/${userId}/edit/`, formData, headers())
}

export function followToggle(userId) {
  return axios.post(`${baseUrl}/auth/profile/${userId}/follow/`, null, headers())
}

//* posts

export function getAllPosts() {
  return axios.get(`${baseUrl}/posts/`)
}

export function getSinglePost(postId) {
  return axios.get(`${baseUrl}/posts/${postId}/`, headers())
}

export function savePost(postId) {
  return axios.post(`${baseUrl}/posts/${postId}/save/`, null, headers())
}

//* chats

export function getAllChatsUserIsIn(userId) {
  return axios.get(`${baseUrl}/auth/profile/${userId}/loaduserchats/`, headers(), null)
}

export function getSingleChat(userId, chatId) {
  return axios.get(`${baseUrl}/auth/profile/${userId}/chats/${chatId}/`, headers(), null)
}

export function checkForExistingChat(userId) {
  return axios.get(`${baseUrl}/auth/profile/${userId}/loadchats/`, headers(), null)
}

export function createAChat(userId) {
  return axios.post(`${baseUrl}/auth/profile/${userId}/chats/`, headers(), headers())
}

//* messages

export function createMessage(userId, chatId, formData) {
  return axios.post(`${baseUrl}/auth/profile/${userId}/chats/${chatId}/messages/`, formData, headers())
}
