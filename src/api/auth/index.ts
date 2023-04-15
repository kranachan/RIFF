import { Self, SelfWithToken } from '@/models/user'
import { HttpStatic } from '..'

class Auth {
  get root() {
    return new HttpStatic('auth')
  }

  login = async (email: string, password: string): Promise<SelfWithToken> => {
    const resp = await this.root.entry('/login').post<SelfWithToken>({
      username: email, // Due to some limitation of passport, the username here actually accepts an email address
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

  loginByToken = async (): Promise<Self> => {
    const resp = await this.root.entry('/login-by-token').get<Self>()
    return resp.data
  }
}

export const AuthApi = new Auth()
