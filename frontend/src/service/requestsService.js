import axios from '../api/axios'
import authHeader from './auth-header'

const CONTACT_API_URL = '/contacts'
const NEWSLETTER_API_URL = '/newsletters'

const getAllContact = () => {
  return axios.get(CONTACT_API_URL, { headers: authHeader() })
}
const getAllNewsletters = () => {
  return axios.get(NEWSLETTER_API_URL, { headers: authHeader() })
}
const deleteContact = (code) => {
  return axios.delete(CONTACT_API_URL + '/' + code, { headers: authHeader() })
}
const deleteNewsletter = (code) => {
  return axios.delete(NEWSLETTER_API_URL + '/' + code, { headers: authHeader() })
}
const requestsService = {
  getAllContact,
  getAllNewsletters,
  deleteContact,
  deleteNewsletter,
}

export default requestsService
