import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/tvs'

const getAllTvCategories = () => {
  return axios.get(API_URL + "/categories", { headers: authHeader() })
}
const getAllTvVideos = () => {
  return axios.get(API_URL + "/videos", { headers: authHeader() })
}
const getTvCategory = (code) => {
  return axios.get(API_URL + "/categories/" + code, { headers: authHeader() })
}
const getTvVideo = (code) => {
  return axios.get(API_URL + "/videos/" + code , { headers: authHeader() })
}
const postTvCategory = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const postTvPost = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteTvCategory = (code) => {
  return axios.delete(API_URL + "/categories/" +code, { headers: authHeader() })
}
const deleteTvPost = (code) => {
  return axios.delete(API_URL + "/videos/" +code, { headers: authHeader() })
}
const editTvCategory = (id, data) => {
  return axios.put(API_URL + "/categories/" + id, data, { headers: authHeader() })
}
const editTvPost = (id, data) => {
  return axios.put(API_URL + "/videos/" + id, data, { headers: authHeader() })
}
const tvService = {
  getAllTvCategories,
  getAllTvVideos,
  getTvCategory,
  getTvVideo,
  postTvCategory,
  postTvPost,
  deleteTvCategory,
  deleteTvPost,
  editTvCategory,
  editTvPost
}

export default tvService
