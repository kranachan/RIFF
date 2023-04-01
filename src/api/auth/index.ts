import { SelfWithToken } from '@/models/user'
import { HttpInstance } from '..'

class Auth {
  get root() {
    return new HttpInstance('auth')
  }

  login = async (
    username: string,
    password: string,
  ): Promise<SelfWithToken> => {
    const resp = await this.root.entry('/login').post<SelfWithToken>({
      username,
      password,
    })
    return resp.data
  }

  verify = async (email: string): Promise<void> => {
    await this.root.entry('/verify').post({
      email,
    })
  }

  register = async (
    username: string,
    email: string,
    password: string,
    code: string,
  ): Promise<SelfWithToken> => {
    const resp = await this.root.entry('/register').post<SelfWithToken>({
      username,
      email,
      password,
      code,
    })
    return resp.data
  }
}

export const AuthApi = new Auth()
