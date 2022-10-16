import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/lifestyles'

const getAllLifestyle = (lang, page) => {
  return axios.get(`/lifestyles?language_id=${lang}&page=${page}`, { headers: authHeader() })
}
const getLifestyle = (code) => {
  return axios.get(API_URL + '/' + code, { headers: authHeader() })
}
const postLifestyle = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteLifestyle = (code) => {
  return axios.delete(API_URL + '/' + code, { headers: authHeader() })
}
const editLifestyle = (id, data) => {
  return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
}
const getLifestyleImagesList = (id) => {
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

const selectLifestyle = (language_id, data) => {
  return axios.post(API_URL + `/selected/posts?language_id=${language_id}`, data, {
    headers: authHeader(),
    'Content-Type': `multipart/form-data;`,
  })
}

const getSelectedLifestyle = (language_id) => {
  return axios.get(API_URL + `/selected/posts?language_id=${language_id}`, {
    headers: authHeader(),
  })
}

const ClearSelectedLifestyle = (language_id) => {
  return axios.delete(API_URL + `/selected/posts?language_id=${language_id}`, {
    headers: authHeader(),
  })
}
const lifestyleService = {
  getAllLifestyle,
  getLifestyle,
  postLifestyle,
  deleteLifestyle,
  editLifestyle,
  getLifestyleImagesList,
  deleteImage,
  postImage,
  selectLifestyle,
  getSelectedLifestyle,
  ClearSelectedLifestyle,
}

export default lifestyleService
