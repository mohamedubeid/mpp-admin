import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/events'

const getAllEvents = (lang, page) => {
  return axios.get(`/events?language_id=${lang}&page=${page}`, { headers: authHeader() })
}
const getEvents = (code) => {
  return axios.get(API_URL + '/' + code, { headers: authHeader() })
}
const postEvents = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteEvents = (code) => {
  return axios.delete(API_URL + '/' + code, { headers: authHeader() })
}
const editEvents = (id, data) => {
  return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
}
const getEventsImagesList = (id) => {
  return axios.get(API_URL + '/posts/' + id + '/images', { headers: authHeader() })
}
const deleteImage = (id) => {
  return axios.delete(API_URL + '/posts' + '/images' + id, { headers: authHeader() })
}
const postImage = (id, data) => {
  return axios.post(API_URL + '/posts/' + id + '/images', data, {
    headers: authHeader(),
    'Content-Type': `multipart/form-data;`,
  })
}

const selectEvents = (language_id, data) => {
  return axios.post(API_URL + `/selected/posts?language_id=${language_id}`, data, {
    headers: authHeader(),
    'Content-Type': `multipart/form-data;`,
  })
}

const getSelectedEvents = (language_id) => {
  return axios.get(API_URL + `/selected/posts?language_id=${language_id}`, {
    headers: authHeader(),
  })
}

const ClearSelectedEvents = (language_id) => {
  return axios.delete(API_URL + `/selected/posts?language_id=${language_id}`, {
    headers: authHeader(),
  })
}

const eventsService = {
  getAllEvents,
  getEvents,
  postEvents,
  deleteEvents,
  editEvents,
  getEventsImagesList,
  deleteImage,
  postImage,
  selectEvents,
  getSelectedEvents,
  ClearSelectedEvents,
}

export default eventsService
