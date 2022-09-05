import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/banners'

const getAllBanners = (lang, page) => {
  return axios.get(`/banners?language_id=${lang}&page=${page}`, { headers: authHeader() })
}
const getBanners = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const postBanners = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteBanners = (code) => {
  return axios.delete(API_URL + '/' + code, { headers: authHeader() })
}
const editBanners = (code) => {
  return axios.put(API_URL + '/' + code, { headers: authHeader() })
}
const selectBanner = (id, data) => {
  return axios.post('/banners/select/' + id, data, {
    headers: authHeader(),
    'Content-Type': `multipart/form-data;`,
  })
}

const bannersService = {
  getAllBanners,
  getBanners,
  postBanners,
  deleteBanners,
  editBanners,
  selectBanner,
}

export default bannersService
