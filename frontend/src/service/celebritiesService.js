import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/celebrities'

const getAllCelebritiesCategories = () => {
  return axios.get(API_URL + "/categories", { headers: authHeader() })
}
const getAllCelebritiesPosts = () => {
  return axios.get(API_URL + "/posts", { headers: authHeader() })
}
const getCelebritiesCategory = (code) => {
  return axios.get(API_URL + "/categories/" + code, { headers: authHeader() })
}
const getCelebritiesPost = (code) => {
  return axios.get(API_URL + "/posts/" + code , { headers: authHeader() })
}
const postCelebritiesCategory = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const postCelebritiesPost = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteCelebritiesCategory = (code) => {
  return axios.delete(API_URL + "/categories/" +code, { headers: authHeader() })
}
const deleteCelebritiesPost = (code) => {
  return axios.delete(API_URL + "/posts/" +code, { headers: authHeader() })
}
const editCelebritiesCategory = (id, data) => {
  return axios.put(API_URL + "/categories/" + id, data, { headers: authHeader() })
}
const editCelebritiesPost = (id, data) => {
  return axios.put(API_URL + "/posts/" + id, data, { headers: authHeader() })
}
const getCelebrityImagesList = (id) => {
  return axios.get(API_URL + "/posts/" + id + "/images", { headers: authHeader() })
}
const deleteImage = (id) => {
  return axios.delete(API_URL + "/posts" + "/images"  + id, { headers: authHeader() })
}
const postImage = (id, data) => {
  return axios.post(API_URL + "/posts/" + id + "/images", data, { headers: authHeader(), 'Content-Type': `multipart/form-data;` })
}
const celebritiesService = {
  getAllCelebritiesCategories,
  getAllCelebritiesPosts,
  getCelebritiesCategory,
  getCelebritiesPost,
  postCelebritiesCategory,
  postCelebritiesPost,
  deleteCelebritiesCategory,
  deleteCelebritiesPost,
  editCelebritiesCategory,
  editCelebritiesPost,
  getCelebrityImagesList,
  deleteImage,
  postImage
}

export default celebritiesService
