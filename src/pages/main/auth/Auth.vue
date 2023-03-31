<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import TextField from '@/components/text-field/TextField.vue'
import Picture from '@/components/picture/Picture.vue'
import Logo from '@/assets/branding/logo.svg?component'
import AuthBannerPng from '@/assets/images/auth-banner.png?url'
import AuthBannerWebp from '@/assets/images/auth-banner.webp?url'
import { ref, reactive, computed, onMounted } from 'vue'
import { AuthApi } from '@/api/auth'
import { setLocalStorage } from '@/utils/localstorage'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { SelfWithToken } from '@/models/user'

enum AuthScheme {
  SignIn,
  SignUp,
}

const authScheme = ref<AuthScheme>(AuthScheme.SignIn)

interface SignInSet {
  username?: string
  password?: string
}
interface SingUpSet extends SignInSet {
  email?: string
}

const signInSet = reactive<SignInSet>({
  username: undefined,
  password: undefined,
})
const signUpSet = reactive<SingUpSet>({
  username: undefined,
  email: undefined,
  password: undefined,
})

const { app } = useStore()
const router = useRouter()

onMounted(() => {
  if (app.isLoggedIn) {
    router.push('/profile')
  }
})

const isSignIn = computed(() => authScheme.value === AuthScheme.SignIn)
const isSignUp = computed(() => authScheme.value === AuthScheme.SignUp)
const isValidSignInSet = computed(() =>
  Boolean(signInSet.username && signInSet.password),
)
const isValidSignUpSet = computed(() =>
  Boolean(signUpSet.username && signUpSet.email && signUpSet.password),
)

const next = (result: SelfWithToken) => {
  const { token, ...self } = result
  app.self = self
  setLocalStorage('token', token)
  router.push('/profile')
}

const signIn = async () => {
  if (!isValidSignInSet.value) {
    return
  }
  const res = await AuthApi.login(signInSet.username!, signInSet.password!)
  next(res)
}

const signUp = async () => {
  if (!isValidSignUpSet.value) {
    return
  }
  const res = await AuthApi.register(
    signUpSet.username!,
    signUpSet.email!,
    signUpSet.password!,
  )
  next(res)
}

const toggleAuthScheme = () => {
  authScheme.value = isSignIn.value ? AuthScheme.SignUp : AuthScheme.SignIn
}
</script>

<template>
  <div class="header">
    <Logo />
    <Button
      variant="outline"
      class="toggle-scheme-btn"
      @click="toggleAuthScheme"
    >
      {{ isSignIn ? 'Sign Up' : 'Sign In' }}
    </Button>
  </div>

  <Picture :png-source="AuthBannerPng" :webp-source="AuthBannerWebp" />
  <b class="welcome-text">Welcome to RIFF</b>

  <form v-if="isSignIn" class="frame" @submit.prevent="signIn">
    <TextField placeholder="Email" v-model="signInSet.username" />
    <TextField
      type="password"
      placeholder="Password"
      v-model="signInSet.password"
    />
    <Button class="action-btn" :disabled="!isValidSignInSet">Sign In</Button>
  </form>

  <form v-if="isSignUp" class="frame" @submit.prevent="signUp">
    <TextField placeholder="Username" v-model="signUpSet.username" />
    <TextField placeholder="Email" v-model="signUpSet.email" />
    <TextField
      type="password"
      placeholder="Password"
      v-model="signUpSet.password"
    />
    <Button class="action-btn" :disabled="!isValidSignUpSet">Sign Up</Button>
  </form>
</template>

<style scoped>
@import url('./Auth.css');
</style>
