import { AxiosRequestConfig } from 'axios'
import { TippyOptions } from 'vue-tippy'
import { getLocalStorage } from './localstorage'

/**
 * Converts a regular expression to its pattern string representation,
 * without the leading and trailing slashes (/),
 * used for <input /> pattern attribute.
 * @param {RegExp} regex - The regular expression to convert
 * @returns {string} The pattern string representation of the regular expression
 */
export const regex2PatternString = (regex: RegExp) => {
  return regex.toString().slice(1, -1)
}

export const validateRegex = (regex: RegExp, string?: string) => {
  if (!string) {
    return false
  }
  return regex.test(string)
}

type CreateTippyReturns = (content: string) => TippyOptions
export const createTippy = (
  options: Omit<TippyOptions, 'content'>,
): CreateTippyReturns => {
  return (content: string) => ({
    ...options,
    content,
  })
}

export const validateToken = async () => !!(await getLocalStorage('token'))

export const withDefaultRequestOptions = async (
  config?: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const token = await getLocalStorage('token')
  const Authorization = token && `Bearer ${token}`
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    Authorization,
  }

  if (!config) {
    return { headers: defaultHeaders }
  }

  const { headers, ...rest } = config
  return {
    headers: { ...defaultHeaders, ...headers },
    ...rest,
  }
}

export * from './auth'
export * from './localstorage'
