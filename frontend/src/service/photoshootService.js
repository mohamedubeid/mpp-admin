import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/photoshoots'

const getAllPhotoshoots = (lang, page) => {
  return axios.get(`/photoshoots?language_id=${lang}&page=${page}`, { headers: authHeader() })
}
const getPhotoshoots = (code) => {
  return axios.get(API_URL + '/' + code, { headers: authHeader() })
}
const postPhotoshoots = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deletePhotoshoots = (code) => {
  return axios.delete(API_URL + '/' + code, { headers: authHeader() })
}
const editPhotoshoots = (id, data) => {
  return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
}
const getPhotoshootImagesList = (id) => {
  return axios.get(API_URL + '/' + id + '/images', { headers: authHeader() })
}
const deleteImage = (id) => {
  return axios.delete(API_URL + '/images/' + id, { headers: authHeader() })
}
const postImage = (id, data) => {
  return axios.post(API_URL + '/' + id + '/images', data, {
    headers: authHeader(),
    'Content-Type': `multipart/form-data;`,
  })
}

const selectPosts = (language_id, data) => {
  return axios.post(API_URL + `/selected/posts?language_id=${language_id}`, data, {
    headers: authHeader(),
    'Content-Type': `multipart/form-data;`,
  })
}

const getSelectedPosts = (language_id) => {
  return axios.get(API_URL + `/selected/posts?language_id=${language_id}`, {
    headers: authHeader(),
  })
}

const ClearSelectedPosts = (language_id) => {
  return axios.delete(API_URL + `/selected/posts?language_id=${language_id}`, {
    headers: authHeader(),
  })
}

const photoshootService = {
  getAllPhotoshoots,
  getPhotoshoots,
  postPhotoshoots,
  deletePhotoshoots,
  editPhotoshoots,
  getPhotoshootImagesList,
  deleteImage,
  postImage,
  selectPosts,
  getSelectedPosts,
  ClearSelectedPosts,
}

export default photoshootService
