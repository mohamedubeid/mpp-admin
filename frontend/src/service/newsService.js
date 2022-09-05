import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/news'

const getAllNewsCategories = () => {
  return axios.get(API_URL + "/categories", { headers: authHeader() })
}
const getAllNewsPosts = () => {
  return axios.get(API_URL + "/posts", { headers: authHeader() })
}
const getNewsCategory = (code) => {
  return axios.get(API_URL + "/categories/" + code, { headers: authHeader() })
}
const getNewsPost = (code) => {
  return axios.get(API_URL + "/posts/" + code , { headers: authHeader() })
}
const postNewsCategory = (code) => {
  return axios.post(API_URL + "/categories/", code, { headers: authHeader() })
}
const postNewsPost = (code) => {
  return axios.post(API_URL + "/posts/", code, { headers: authHeader() })
}
const deleteNewsCategory = (code) => {
  return axios.delete(API_URL + "/categories/" +code, { headers: authHeader() })
}
const deleteNewsPost = (code) => {
  return axios.delete(API_URL + "/posts/" +code, { headers: authHeader() })
}
const editNewsCategory = (id, data) => {
  return axios.put(API_URL + "/categories/" + id,  data,{ headers: authHeader() })
}
const editNewsPost = (id, data) => {
  return axios.put(API_URL + "/posts/" + id, data, { headers: authHeader() })
}
const getNewsImagesList = (id) => {
  return axios.get(API_URL + "/posts/" + id + "/images", { headers: authHeader() })
}
const deleteImage = (id) => {
  return axios.delete(API_URL + "/posts" + "/images"  + id, { headers: authHeader() })
}
const postImage = (id, data) => {
  return axios.post(API_URL + "/posts/" + id + "/images", data, { headers: authHeader(), 'Content-Type': `multipart/form-data;` })
}
const newsService = {
  getAllNewsCategories,
  getAllNewsPosts,
  getNewsCategory,
  getNewsPost,
  postNewsCategory,
  postNewsPost,
  deleteNewsCategory,
  deleteNewsPost,
  editNewsCategory,
  editNewsPost,
  getNewsImagesList,
  deleteImage,
  postImage
}

export default newsService
