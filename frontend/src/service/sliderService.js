import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/sliders'

const getAllSliders = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const getSliders = (code) => {
  return axios.get(API_URL + "/" +code, { headers: authHeader() })
}
const postSliders = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteSliders = (code) => {
  return axios.delete(API_URL + "/" +code, { headers: authHeader() })
}
const editSliders = (id, data) => {
  return axios.put(API_URL + "/" + id, data, { headers: authHeader() })
}
const slidersService = {
  getAllSliders,
  getSliders,
  postSliders,
  deleteSliders,
  editSliders
}

export default slidersService
