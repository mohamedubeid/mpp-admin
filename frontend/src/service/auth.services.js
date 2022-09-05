import axios from '../api/axios'
import authHeader from './auth-header'

const API_URL = '/users'

const login = (email, password) => {
  return axios
    .post(API_URL + '/signIn', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data.accessToken))
      }
      return response.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  login,
  logout,
}

export default authService
