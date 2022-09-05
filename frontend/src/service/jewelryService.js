import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/jewelry'

const getAllJewelryCategories = () => {
  return axios.get(API_URL + "/categories", { headers: authHeader() })
}
const getAllJewelryPosts = () => {
  return axios.get(API_URL + "/posts", { headers: authHeader() })
}
const getJewelryCategory = (code) => {
  return axios.get(API_URL + "/categories/" + code, { headers: authHeader() })
}
const getJewelryPost = (code) => {
  return axios.get(API_URL + "/posts/" + code , { headers: authHeader() })
}
const postJewelryCategory = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const postJewelryPost = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteJewelryCategory = (code) => {
  return axios.delete(API_URL + "/categories/" +code, { headers: authHeader() })
}
const deleteJewelryPost = (code) => {
  return axios.delete(API_URL + "/posts/" +code, { headers: authHeader() })
}
const editJewelryCategory = (code) => {
  return axios.put(API_URL + "/categories/" + code, { headers: authHeader() })
}
const editJewelryPost = (code) => {
  return axios.put(API_URL + "/posts/" + code, { headers: authHeader() })
}
const jewelryService = {
  getAllJewelryCategories,
  getAllJewelryPosts,
  getJewelryCategory,
  getJewelryPost,
  postJewelryCategory,
  postJewelryPost,
  deleteJewelryCategory,
  deleteJewelryPost,
  editJewelryCategory,
  editJewelryPost
}

export default jewelryService
