import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios"

class HTTP {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      config => {
        if (config.headers) {
          const token = sessionStorage.getItem("token")
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      response => {
        if (response.data.code !== 0) {
          console.log(response.data.msg)
        }
        return response.data
      },
      error => {
        const statusText = error?.response?.statusText
        error.message = statusText
          ? `${error?.response.status} (${statusText})`
          : error.message

        return Promise.reject(error)
      }
    )
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<T, T>(config)
        .then(res => {
          resolve(res)
        })
        .catch((error: AxiosError) => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  get<T = any>(
    url: string,
    params: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.request<T>({ url, params, ...config, method: "GET" })
  }

  post<T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.request<T>({ url, data, ...config, method: "POST" })
  }

  delete<T = any>(
    url: string,
    params: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.request<T>({ url, params, ...config, method: "DELETE" })
  }

  patch<T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.request<T>({ url, data, ...config, method: "PATCH" })
  }

  put<T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.request<T>({ url, data, ...config, method: "PATCH" })
  }
}
export default HTTP
