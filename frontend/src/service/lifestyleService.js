import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/lifestyles'

const getAllLifestyle = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const getLifestyle = (code) => {
  return axios.get(API_URL + "/" + code, { headers: authHeader() })
}
const postLifestyle = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteLifestyle = (code) => {
  return axios.delete(API_URL + "/" +code, { headers: authHeader() })
}
const editLifestyle = (id, data) => {
  return axios.put(API_URL + "/" + id, data, { headers: authHeader() })
}
const getLifestyleImagesList = (id) => {
  return axios.get(API_URL + "/posts/" + id + "/images", { headers: authHeader() })
}
const deleteImage = (id) => {
  return axios.delete(API_URL + "/posts" + "/images"  + id, { headers: authHeader() })
}
const postImage = (id, data) => {
  return axios.post(API_URL + "/posts/" + id + "/images", data, { headers: authHeader(), 'Content-Type': `multipart/form-data;` })
}
const lifestyleService = {
  getAllLifestyle,
  getLifestyle,
  postLifestyle,
  deleteLifestyle,
  editLifestyle,
  getLifestyleImagesList,
  deleteImage,
  postImage
}

export default lifestyleService
