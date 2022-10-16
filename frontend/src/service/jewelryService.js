import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/jewelry'

const getAllJewelryCategories = (lang) => {
  return axios.get(API_URL + '/categories'+`?language_id=${lang}`, { headers: authHeader() })
}
const getAllJewelryPosts = (lang, page) => {
  return axios.get(API_URL + `/posts?language_id=${lang}&page=${page}`, { headers: authHeader() })
}
const getJewelryCategory = (code) => {
  return axios.get(API_URL + '/categories/' + code, { headers: authHeader() })
}
const getJewelryPost = (code) => {
  return axios.get(API_URL + '/posts/' + code, { headers: authHeader() })
}
const getJewelryImagesList = (id) => {
  return axios.get(API_URL + '/posts/' + id + '/images', { headers: authHeader() })
}
const getJewelryCategoryList = (id) => {
  return axios.get(API_URL + '/posts/' + 'categories/' + id, { headers: authHeader() })
}
const postJewelryCategory = (code) => {
  return axios.post(API_URL + '/categories', code, { headers: authHeader() })
}
const postJewelryPost = (code) => {
  return axios.post(API_URL + '/posts',code, { headers: authHeader() })
}
const postImage = (id, data) => {
  return axios.post(API_URL + '/posts/' + id + '/images', data, {
    headers: authHeader(),
    'Content-Type': `multipart/form-data;`,
  })
}
const deleteJewelryCategory = (code) => {
  return axios.delete(API_URL + '/categories/' + code, { headers: authHeader() })
}
const deleteJewelryPost = (code) => {
  return axios.delete(API_URL + '/posts/' + code, { headers: authHeader() })
}
const deleteImage = (id) => {
  return axios.delete(API_URL + '/posts' + '/images/' + id, { headers: authHeader() })
}
const editJewelryCategory = (code, data) => {
  return axios.put(API_URL + '/categories/' + code,data, { headers: authHeader() })
}
const editJewelryPost = (code,data) => {
  return axios.put(API_URL + '/posts/' + code,data, { headers: authHeader() })
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

const jewelryService = {
  getAllJewelryCategories,
  getAllJewelryPosts,
  getJewelryCategory,
  getJewelryPost,
  getJewelryImagesList,
  getJewelryCategoryList,
  postJewelryCategory,
  postJewelryPost,
  postImage,
  deleteJewelryCategory,
  deleteJewelryPost,
  deleteImage,
  editJewelryCategory,
  editJewelryPost,
  selectPosts,
  getSelectedPosts,
  ClearSelectedPosts,
}

export default jewelryService
