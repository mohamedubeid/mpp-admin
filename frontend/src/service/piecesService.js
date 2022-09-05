import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/pieces'

const getAllPieces = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const getPieces = () => {
  return axios.get(API_URL, { headers: authHeader() })
}
const postPieces = (code) => {
  return axios.post(API_URL, code, { headers: authHeader() })
}
const deletePieces = (code) => {
  return axios.delete(API_URL + "/" +code, { headers: authHeader() })
}
const editPieces = (code) => {
  return axios.put(API_URL + "/" + code, { headers: authHeader() })
}
const piecesService = {
  getAllPieces,
  getPieces,
  postPieces,
  deletePieces,
  editPieces
}

export default piecesService
