import axios from 'axios'
import router from '@/router'

// set base URL
const baseURL = 'http://127.0.0.1:8000/api/'

// set default axios config
const apiService = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Authorization': `JWT  ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken'
})

// interceptor to intercept unauthorized requests
apiService.interceptors.response.use(
  response => response,
  error => {

    // save the original request
    const originalRequest = error.config

    // to prevent infinite loops, check status and original request url
    // if response is unauthorized, redirect to login
    if (error.response.status === 401 && originalRequest.url === baseURL+'auth/token/refresh/') {
      router.push({name: 'LogIn'})
      return Promise.reject(error)
    }

    // check if token is valid and request response is unauthorized
    if (error.response.data.code === 'token_not_valid' && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
      const refreshToken = localStorage.getItem('refresh_token');

      // if refresh token is present
      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

        // token exp date is expressed in seconds, while now() returns milliseconds, so convert now() to seconds
        const now = Math.ceil(Date.now() / 1000)

        // if token refresh token is valid
        if (tokenParts.exp > now) {

          // fetch new access and refresh token pair
          return apiService
            .post('auth/token/refresh/', {refresh: refreshToken})
            .then(response => {
                // set new keys in localstorrage
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)

                // update the auth header in both the config as well as in the original requst
                apiService.defaults.headers['Authorization'] = "JWT " + response.data.access
                originalRequest.headers['Authorization'] = "JWT " + response.data.access

                // rerun original request
                return apiService(originalRequest)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          // is refresh token is expired, redirect to login to obtain new pair
          console.log("Refresh token is expired", tokenParts.exp, now)
          router.push({name: 'LogIn'})
        }
      } else {
        // if refresh token is missing, redirect to login to obtain a new pair
        console.log('Refresh token not available')
        router.push({name: 'LogIn'})
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error)
  }
)

export default apiService