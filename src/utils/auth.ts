import { SignInSet, SignUpSet } from '@/constants'
import { validateRegex } from '.'

// Only allow letters, numbers, and underscores, with a length of at least 3
export const usernameRegex = /^[a-zA-Z0-9_]{3,}$/

// Regular expression to match the format of an email address
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// The password must have a minimum length of 8 characters
export const passwordRegex = /.{8,}/

// Only allow number, the verification code must have a minimum length of 6 characters
export const verificationCodeRegex = /^\d{6,}$/

export const validateUsername = (username?: string): boolean =>
  validateRegex(usernameRegex, username)

export const validateEmail = (email?: string): boolean =>
  validateRegex(emailRegex, email)

export const validatePassword = (password?: string): boolean =>
  validateRegex(passwordRegex, password)

export const validateVerificationCode = (code?: string): boolean =>
  validateRegex(verificationCodeRegex, code)

export const validateSignIn = (profile: SignInSet): boolean => {
  return validateEmail(profile.email) && validatePassword(profile.password)
}

export const validateSignUp = (profile: SignUpSet): boolean => {
  const { username, password, email, code } = profile
  return (
    validateUsername(username) &&
    validatePassword(password) &&
    validateEmail(email) &&
    validateVerificationCode(code)
  )
}
