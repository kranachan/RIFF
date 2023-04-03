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
import { storeToRefs } from 'pinia'
import { useIntervalFn } from '@vueuse/shared'

enum AuthScheme {
  SignIn,
  SignUp,
}

const authScheme = ref<AuthScheme>(AuthScheme.SignIn)

interface SignInSet {
  email?: string
  password?: string
}
interface SingUpSet extends SignInSet {
  username?: string
  code?: string
}

const signInSet = reactive<SignInSet>({})
const signUpSet = reactive<SingUpSet>({})

const { app } = useStore()
const { isLoggedIn } = storeToRefs(app)
const router = useRouter()

onMounted(() => {
  if (isLoggedIn.value) {
    router.push('/profile')
  }
})

const isSignIn = computed(() => authScheme.value === AuthScheme.SignIn)
const isSignUp = computed(() => authScheme.value === AuthScheme.SignUp)
const isValidSignInSet = computed(() =>
  Boolean(signInSet.email && signInSet.password),
)
const isValidSignUpSet = computed(() => {
  const { username, email, password, code } = signUpSet
  return Boolean(username && email && password && code)
})

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
  const res = await AuthApi.login(signInSet.email!, signInSet.password!)
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
    signUpSet.code!,
  )
  next(res)
}

const sendableCountdown = ref<number>(60)
const { pause, resume, isActive } = useIntervalFn(
  () => {
    if (sendableCountdown.value === 0) {
      pause()
      sendableCountdown.value = 60
      return
    }
    sendableCountdown.value--
  },
  1000,
  {
    immediate: false,
  },
)

const sendVerificationCode = async () => {
  if (!signUpSet.email || isActive.value) {
    return
  }
  try {
    await AuthApi.verify(signUpSet.email)
    resume()
  } catch (e) {
    console.warn(e)
  }
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
    <TextField placeholder="Email" v-model="signInSet.email" />
    <TextField
      type="password"
      placeholder="Password"
      v-model="signInSet.password"
    />
    <Button class="action-btn" :disabled="!isValidSignInSet">Sign In</Button>
  </form>

  <form v-if="isSignUp" class="frame" @submit.prevent="signUp">
    <TextField placeholder="Username" v-model="signUpSet.username" />
    <TextField
      type="password"
      placeholder="Password"
      v-model="signUpSet.password"
    />
    <TextField placeholder="Email" v-model="signUpSet.email" />
    <div class="verification">
      <TextField
        class="verification-field"
        placeholder="Verification Code"
        v-model="signUpSet.code"
      />
      <Button
        class="verification-btn"
        @click="sendVerificationCode"
        :disabled="!signUpSet.email || isActive"
        >Send {{ isActive ? `(${sendableCountdown})` : null }}</Button
      >
    </div>
    <Button class="action-btn" :disabled="!isValidSignUpSet">Sign Up</Button>
  </form>
</template>

<style scoped>
@import url('./Auth.css');
</style>
