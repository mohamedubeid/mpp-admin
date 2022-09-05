import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/events'

const getAllEvents = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const getEvents = (code) => {
  return axios.get(API_URL+"/"+code, { headers: authHeader() })
}
const postEvents = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteEvents = (code) => {
  return axios.delete(API_URL + "/" +code, { headers: authHeader() })
}
const editEvents = (id, data) => {
  return axios.put(API_URL + "/" + id, data, { headers: authHeader() })
}
const getEventsImagesList = (id) => {
  return axios.get(API_URL + "/posts/" + id + "/images", { headers: authHeader() })
}
const deleteImage = (id) => {
  return axios.delete(API_URL + "/posts" + "/images"  + id, { headers: authHeader() })
}
const postImage = (id, data) => {
  return axios.post(API_URL + "/posts/" + id + "/images", data, { headers: authHeader(), 'Content-Type': `multipart/form-data;` })
}
const eventsService = {
  getAllEvents,
  getEvents,
  postEvents,
  deleteEvents,
  editEvents,
  getEventsImagesList,
  deleteImage,
  postImage
}

export default eventsService
