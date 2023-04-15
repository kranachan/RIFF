import { withDefaultRequestOptions } from '@/utils'
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'

export class HttpStatic {
  private $http: AxiosInstance
  private $entryRoute: string

  constructor(root: string) {
    this.$http = axios.create({ baseURL: `/api/${root}` })
    this.$entryRoute = ''
  }

  get = async <T, R = AxiosResponse<T>>(
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const requestUrl = this.$entryRoute
    const options = await withDefaultRequestOptions(config)
    const response = await this.$http.get<T, R>(requestUrl, options)
    return response
  }

  post = async <T, R = AxiosResponse<T>>(
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const requestUrl = this.$entryRoute
    const options = await withDefaultRequestOptions(config)
    const response = await this.$http.post<T, R>(requestUrl, data, options)
    return response
  }

  put = async <T, R = AxiosResponse<T>>(
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const requestUrl = this.$entryRoute
    const options = await withDefaultRequestOptions(config)
    const response = await this.$http.put<T, R>(requestUrl, data, options)
    return response
  }

  delete = async <T, R = AxiosResponse<T>>(
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const requestUrl = this.$entryRoute
    const options = await withDefaultRequestOptions(config)
    const response = await this.$http.delete<T, R>(requestUrl, options)
    return response
  }

  entry = (path: string): HttpStatic => {
    this.$entryRoute = path
    return this
  }
}
