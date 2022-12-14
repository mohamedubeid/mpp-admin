import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/magazines'

const getAllMagazines = (lang, page) => {
  return axios.get(`/magazines/?language_id=${lang}&page=${page}`, { headers: authHeader() })
}
const getMagazines = (code) => {
  return axios.get(API_URL + '/' + code, { headers: authHeader() })
}
const postMagazines = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteMagazines = (code) => {
  return axios.delete(API_URL + '/' + code, { headers: authHeader() })
}
const editMagazines = (id, data) => {
  return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
}
const getMagazineImagesList = (id) => {
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
const magazinesService = {
  getAllMagazines,
  getMagazines,
  postMagazines,
  deleteMagazines,
  editMagazines,
  getMagazineImagesList,
  deleteImage,
  postImage,
  selectPosts,
  getSelectedPosts,
  ClearSelectedPosts,
}

export default magazinesService
