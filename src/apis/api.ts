import axios, {Axios, AxiosInstance, AxiosRequestHeaders} from 'axios'



export let baseUri =  import.meta.env.DEV
    // ? 'http://192.168.91.224:1000'
    ? 'http://localhost:1000'
    : 'https://phone-mela-server-nine.vercel.app'

interface MyHeaders  extends  AxiosRequestHeaders {
  token: string
}




const api: AxiosInstance = axios.create({
    baseURL: baseUri,
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      token: window.localStorage.getItem("token")
    }
  })

export function getApi() : AxiosInstance {
  return axios.create({
    baseURL: baseUri,
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      token: window.localStorage.getItem("token")
    }
  })
}



export default api
