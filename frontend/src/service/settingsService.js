import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/settings'

const getAllSetting = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const getSetting = (code) => {
  return axios.get(API_URL + "/" + code, { headers: authHeader() })
}
const postSetting = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deleteSetting = (code) => {
  return axios.delete(API_URL + "/" +code, { headers: authHeader() })
}
const editSetting = (id, data) => {
  return axios.put(API_URL + "/" + id, data, { headers: authHeader() })
}
const SettingsService = {
  getAllSetting,
  getSetting,
  postSetting,
  deleteSetting,
  editSetting
}

export default SettingsService
