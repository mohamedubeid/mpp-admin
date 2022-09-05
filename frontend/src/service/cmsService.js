import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/cmspages'

const getAllCMS = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const getCMSPage = (code) => {
  return axios.get(API_URL + "/" + code, { headers: authHeader() })
}
const postCMS = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteCMS = (code) => {
  return axios.delete(API_URL + "/" +code, { headers: authHeader() })
}
const editCMS = (id, data) => {
  return axios.put(API_URL + "/" + id, data, { headers: authHeader() })
}
const cmsService = {
  getAllCMS,
  getCMSPage,
  postCMS,
  deleteCMS,
  editCMS
}

export default cmsService
