import { AxiosRequestConfig } from 'axios'
import { TippyOptions } from 'vue-tippy'
import { useThrottleFn } from '@vueuse/core'
import UAParser from 'ua-parser-js'

const parser = new UAParser()
const os = parser.getOS().name

export const isIOS = os === 'iOS'
export const isAndroid = os === 'Android'

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

export const createHeadersWithToken = (
  token: string,
  options?: AxiosRequestConfig['headers'],
) => ({
  Authorization: `Bearer ${token}`,
  ...options,
})

export const onKeyboardShow = (callback: (show: boolean) => void) => {
  if (isIOS) {
    window.addEventListener('focusin', () => callback(true))
    window.addEventListener('focusout', () => callback(false))
  } else if (isAndroid) {
    const innerHeight = window.innerHeight
    const onResize = useThrottleFn(() => {
      const newInnerHeight = window.innerHeight
      const show = innerHeight > newInnerHeight
      callback(show)
    }, 300)
    window.addEventListener('resize', onResize)
  }
}

export * from './auth'
export * from './localstorage'
