import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/celebrities'

const getAllCelebritiesCategories = (lang) => {
  return axios.get(API_URL + '/categories' + `?language_id=${lang}`, { headers: authHeader() })
}
const getAllCelebritiesPosts = (lang, page) => {
  return axios.get(API_URL + `/posts?language_id=${lang}&page=${page}`, { headers: authHeader() })
}
const getCelebritiesCategory = (code) => {
  return axios.get(API_URL + '/categories/' + code, { headers: authHeader() })
}
const getCelebritiesPost = (code) => {
  return axios.get(API_URL + '/posts/' + code, { headers: authHeader() })
}
const postCelebritiesCategory = (code) => {
  return axios.post(API_URL + "/categories", code, { headers: authHeader() })
}
const postCelebritiesPost = (code) => {
  return axios.post(API_URL + "/posts" , code, { headers: authHeader() })
}
const deleteCelebritiesCategory = (code) => {
  return axios.delete(API_URL + '/categories/' + code, { headers: authHeader() })
}
const deleteCelebritiesPost = (code) => {
  return axios.delete(API_URL + '/posts/' + code, { headers: authHeader() })
}
const editCelebritiesCategory = (id, data) => {
  return axios.put(API_URL + '/categories/' + id, data, { headers: authHeader() })
}
const editCelebritiesPost = (id, data) => {
  return axios.put(API_URL + '/posts/' + id, data, { headers: authHeader() })
}
const getCelebrityImagesList = (id) => {
  return axios.get(API_URL + '/posts/' + id + '/images', { headers: authHeader() })
}
const deleteImage = (id) => {
  return axios.delete(API_URL + '/posts' + '/images/' + id, { headers: authHeader() })
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
const celebritiesService = {
  getAllCelebritiesCategories,
  getAllCelebritiesPosts,
  getCelebritiesCategory,
  getCelebritiesPost,
  postCelebritiesCategory,
  postCelebritiesPost,
  deleteCelebritiesCategory,
  deleteCelebritiesPost,
  editCelebritiesCategory,
  editCelebritiesPost,
  getCelebrityImagesList,
  deleteImage,
  postImage,
  selectPosts,
  getSelectedPosts,
  ClearSelectedPosts,
}

export default celebritiesService
