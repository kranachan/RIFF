import { withDefaultRequestOptions } from '@/utils'
import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from 'axios'
import { toast } from 'vue-sonner'

export interface ErrorResponse {
  error?: string
  message?: string
  statusCode: number
}

export const withErrorHandling = async <T, R = AxiosResponse<T>>(
  asyncFn: () => Promise<R>,
  errorHandler: (error: AxiosError<ErrorResponse>) => void,
): Promise<R> => {
  try {
    const result = await asyncFn()
    return result
  } catch (error: any) {
    if (error instanceof AxiosError) {
      errorHandler(error)
    }
    throw new Error(error)
  }
}

export const handleAxiosError = (error: AxiosError<ErrorResponse>) => {
  const errorMessage = error.response?.data.message
  if (errorMessage) {
    toast.error(errorMessage)
  }
}

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
    const getFn = () => this.$http.get<T, R>(requestUrl, options)
    return withErrorHandling(getFn, handleAxiosError)
  }

  post = async <T, R = AxiosResponse<T>>(
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const requestUrl = this.$entryRoute
    const options = await withDefaultRequestOptions(config)
    const postFn = () => this.$http.post<T, R>(requestUrl, data, options)
    return withErrorHandling(postFn, handleAxiosError)
  }

  put = async <T, R = AxiosResponse<T>>(
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const requestUrl = this.$entryRoute
    const options = await withDefaultRequestOptions(config)
    const putFn = () => this.$http.put<T, R>(requestUrl, data, options)
    return withErrorHandling(putFn, handleAxiosError)
  }

  delete = async <T, R = AxiosResponse<T>>(
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const requestUrl = this.$entryRoute
    const options = await withDefaultRequestOptions(config)
    const deleteFn = () => this.$http.delete<T, R>(requestUrl, options)
    return withErrorHandling(deleteFn, handleAxiosError)
  }

  entry = (path: string): HttpStatic => {
    this.$entryRoute = path
    return this
  }
}
