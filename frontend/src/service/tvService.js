import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/tvs'

const getAllTvCategories = (lang) => {
  return axios.get(API_URL + `/categories?language_id=${lang}`, { headers: authHeader() })
}
const getAllTvVideos = (lang, page) => {
  return axios.get(API_URL + `/videos?language_id=${lang}&page=${page}`, { headers: authHeader() })
}
const getTvCategoryList = (id) => {
  return axios.get(API_URL + '/videos/' + 'categories/' + id, { headers: authHeader() })
}
const getTvCategory = (code) => {
  return axios.get(API_URL + '/categories/' + code, { headers: authHeader() })
}
const getTvVideo = (code) => {
  return axios.get(API_URL + '/videos/' + code, { headers: authHeader() })
}
const postTvCategory = (data) => {
  return axios.post(API_URL +"/categories", data, { headers: authHeader() })
}
const postTvPost = (data) => {
  return axios.post(API_URL + "/videos", data, { headers: authHeader() })
}
const deleteTvCategory = (code) => {
  return axios.delete(API_URL + '/categories/' + code, { headers: authHeader() })
}
const deleteTvPost = (code) => {
  return axios.delete(API_URL + '/videos/' + code, { headers: authHeader() })
}
const editTvCategory = (id, data) => {
  return axios.put(API_URL + '/categories/' + id, data, { headers: authHeader() })
}
const editTvPost = (id, data) => {
  return axios.put(API_URL + '/videos/' + id, data, { headers: authHeader() })
}

const selectTvVideos = (language_id, data) => {
  return axios.post(API_URL + `/selected/posts?language_id=${language_id}`, data, {
    headers: authHeader(),
    'Content-Type': `multipart/form-data;`,
  })
}

const getSelectedTvVideos = (language_id) => {
  return axios.get(API_URL + `/selected/posts?language_id=${language_id}`, {
    headers: authHeader(),
  })
}

const ClearSelectedPosts = (language_id) => {
  return axios.delete(API_URL + `/selected/posts?language_id=${language_id}`, {
    headers: authHeader(),
  })
}
const tvService = {
  getAllTvCategories,
  getAllTvVideos,
  getTvCategory,
  getTvVideo,
  postTvCategory,
  postTvPost,
  getTvCategoryList,
  deleteTvCategory,
  deleteTvPost,
  editTvCategory,
  editTvPost,
  selectTvVideos,
  getSelectedTvVideos,
  ClearSelectedPosts,
}

export default tvService
