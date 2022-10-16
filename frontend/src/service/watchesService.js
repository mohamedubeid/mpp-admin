import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/watches'

const getAllWatchCategories = (lang) => {
  return axios.get(API_URL + `/categories?language_id=${lang}`, { headers: authHeader() })
}
const getAllWatchPosts = (lang, page) => {
  return axios.get(API_URL + `/posts?language_id=${lang}&page=${page}`, { headers: authHeader() })
}
const getWatchCategory = (code) => {
  return axios.get(API_URL + '/categories/' + code, { headers: authHeader() })
}
const getWatchPost = (code) => {
  return axios.get(API_URL + '/posts/' + code, { headers: authHeader() })
}
const postWatchCategory = (code) => {
  return axios.post(API_URL + '/categories', code, { headers: authHeader() })
}
const postWatchPost = (code) => {
  return axios.post(API_URL + '/posts', code, { headers: authHeader() })
}
const deleteWatchCategory = (code) => {
  return axios.delete(API_URL + '/categories/' + code, { headers: authHeader() })
}
const deleteWatchPost = (code) => {
  return axios.delete(API_URL + '/posts/' + code, { headers: authHeader() })
}
const editWatchCategory = (code, data) => {
  return axios.put(API_URL + '/categories/' + code, data, { headers: authHeader() })
}
const editWatchPost = (code, data) => {
  return axios.put(API_URL + '/posts/' + code, data,{ headers: authHeader() })
}
const getWatchesImagesList = (id) => {
  return axios.get(API_URL + '/posts/' + id + '/images', { headers: authHeader() })
}
const deleteImage = (id) => {
  return axios.delete(API_URL + '/posts' + '/images' + id, { headers: authHeader() })
}
const postImage = (id, data) => {
  return axios.post(API_URL + '/posts/' + id + '/images', data, {
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

const watchesService = {
  getAllWatchCategories,
  getAllWatchPosts,
  getWatchCategory,
  getWatchPost,
  postWatchCategory,
  postWatchPost,
  deleteWatchCategory,
  deleteWatchPost,
  editWatchCategory,
  editWatchPost,
  getWatchesImagesList,
  deleteImage,
  postImage,
  selectPosts,
  getSelectedPosts,
  ClearSelectedPosts,
}

export default watchesService
