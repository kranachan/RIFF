import { useRouter } from 'vue-router'

export const useGoBack = () => {
  const router = useRouter()
  return () => {
    if ('back' in window.history.state && window.history.state.back) {
      router.back()
    } else {
      router.replace('/explore')
    }
  }
}
