import { User } from '@/models'
import { HttpStatic } from '..'

class UserInstance {
  get root() {
    return new HttpStatic('user')
  }

  getUserById = async (id: string): Promise<User> => {
    const resp = await this.root.entry(`/${id}`).get<User>()
    return resp.data
  }
}

export const UserApi = new UserInstance()
