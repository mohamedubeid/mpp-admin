import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/banners'

const getAllBanners = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const getBanners = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const postBanners = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteBanners = (code) => {
  return axios.delete(API_URL + "/" +code, { headers: authHeader() })
}
const editBanners = (code) => {
  return axios.put(API_URL + "/" + code, { headers: authHeader() })
}
const bannersService = {
  getAllBanners,
  getBanners,
  postBanners,
  deleteBanners,
  editBanners
}

export default bannersService
