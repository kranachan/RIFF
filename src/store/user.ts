import { UserApi } from '@/api/user'
import { User } from '@/models'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userList: [] as User[],
  }),
  getters: {
    getUserById: (state) => {
      return (userId: string): User | undefined =>
        state.userList.find((user) => user.id === userId)
    },
  },
  actions: {
    async fetchUserById(id: string): Promise<User> {
      const foundedUser = this.getUserById(id)
      if (foundedUser) {
        return foundedUser
      }
      const resp = await UserApi.getUserById(id)
      this.$patch((state) => {
        state.userList.push(resp)
      })
      return resp
    },
  },
})
