import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/banners'

const getAllBanners = (lang, page) => {
  return axios.get(`/banners?language_id=${lang}&page=${page}`, { headers: authHeader() })
}
const getBanners = (code) => {
  return axios.get(API_URL + '/' + code, { headers: authHeader() })
}
const postBanners = (data) => {
  return axios.post(API_URL, data, { headers: authHeader() })
}
const deleteBanners = (code) => {
  return axios.delete(API_URL + '/' + code, { headers: authHeader() })
}
const editBanners = (code, data) => {
  return axios.put(API_URL + '/' + code, data, { headers: authHeader() })
}

const selectBanners = (language_id, data) => {
  return axios.post(API_URL + `/selected/posts?language_id=${language_id}`, data, {
    headers: authHeader(),
    'Content-Type': `multipart/form-data;`,
  })
}

const getSelectedBanners = (language_id) => {
  return axios.get(API_URL + `/selected/posts?language_id=${language_id}`, {
    headers: authHeader(),
  })
}

const ClearSelectedBanners = (language_id) => {
  return axios.delete(API_URL + `/selected/posts?language_id=${language_id}`, {
    headers: authHeader(),
  })
}

const bannersService = {
  getAllBanners,
  getBanners,
  postBanners,
  deleteBanners,
  editBanners,
  selectBanners,
  getSelectedBanners,
  ClearSelectedBanners,
}

export default bannersService
