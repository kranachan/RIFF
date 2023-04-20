import { UserApi } from '@/api/user'
import { User } from '@/models'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userList: [] as User[],
  }),
  getters: {
    getUserById: (state) => {
      return (albumId: string) =>
        state.userList.find((item) => item.id === albumId)
    },
  },
  actions: {
    async fetchUserById(id: string) {
      const user = this.getUserById(id)
      if (!user) {
        const resp = await UserApi.getUserById(id)
        this.$patch((state) => {
          state.userList.push(resp)
        })
      }
    },
  },
})
