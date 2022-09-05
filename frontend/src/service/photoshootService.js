import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/photoshoots'

const getAllPhotoshoots = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const getPhotoshoots = (code) => {
  return axios.get(API_URL + "/" + code, { headers: authHeader() })
}
const postPhotoshoots = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deletePhotoshoots = (code) => {
  return axios.delete(API_URL + "/" +code, { headers: authHeader() })
}
const editPhotoshoots = (id, data) => {
  return axios.put(API_URL + "/" + id, data, { headers: authHeader() })
}
const getPhotoshootImagesList = (id) => {
  return axios.get(API_URL + "/posts/" + id + "/images", { headers: authHeader() })
}
const deleteImage = (id) => {
  return axios.delete(API_URL + "/posts" + "/images"  + id, { headers: authHeader() })
}
const postImage = (id, data) => {
  return axios.post(API_URL + "/posts/" + id + "/images", data, { headers: authHeader(), 'Content-Type': `multipart/form-data;` })
}
const photoshootService = {
  getAllPhotoshoots,
  getPhotoshoots,
  postPhotoshoots,
  deletePhotoshoots,
  editPhotoshoots,
  getPhotoshootImagesList,
  deleteImage,
  postImage
}

export default photoshootService
