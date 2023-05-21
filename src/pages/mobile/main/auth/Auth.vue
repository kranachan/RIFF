<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import TextField from '@/components/text-field/TextField.vue'
import Picture from '@/components/picture/Picture.vue'
import Logo from '@/assets/branding/logo.svg?component'
import AuthBannerPng from '@/assets/images/auth-banner.png?url'
import AuthBannerWebp from '@/assets/images/auth-banner.webp?url'
import { ref, reactive, computed, watchEffect } from 'vue'
import { AuthApi } from '@/api/auth'
import { setLocalStorage } from '@/utils/localstorage'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { SelfWithToken } from '@/models/user'
import { useIntervalFn } from '@vueuse/shared'
import { toast } from 'vue-sonner'
import {
  usernameRegex,
  passwordRegex,
  emailRegex,
  verificationCodeRegex,
  validateSignIn,
  validateSignUp,
  regex2PatternString,
  validateEmail,
  createTippy,
} from '@/utils'
import { SignInSet, SignUpSet } from '@/constants'

enum AuthScheme {
  SignIn,
  SignUp,
}

const authScheme = ref<AuthScheme>(AuthScheme.SignIn)

const signInSet = reactive<SignInSet>({})
const signUpSet = reactive<SignUpSet>({})

const { app } = useStore()
const router = useRouter()

watchEffect(() => {
  if (app.state.isLoggedIn) {
    router.push('/profile')
  }
})

const isSignInScheme = computed(() => authScheme.value === AuthScheme.SignIn)
const isSignUpScheme = computed(() => authScheme.value === AuthScheme.SignUp)
const isValidSignInSet = computed(() => validateSignIn(signInSet))
const isValidSignUpSet = computed(() => validateSignUp(signUpSet))

const next = async (result: SelfWithToken) => {
  const { token, ...self } = result
  try {
    await setLocalStorage('token', token)
    app.state.self = self
    toast.success('Authenticated')
    router.push('/profile')
  } catch (e) {
    console.warn(e)
  }
}

const signIn = async () => {
  if (!isValidSignInSet.value) {
    return
  }
  const resp = await AuthApi.login(signInSet.email!, signInSet.password!)
  await next(resp)
}

const signUp = async () => {
  if (!isValidSignUpSet.value) {
    return
  }
  const resp = await AuthApi.register(
    signUpSet.username!,
    signUpSet.email!,
    signUpSet.password!,
    signUpSet.code!,
  )
  await next(resp)
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
  authScheme.value = isSignInScheme.value
    ? AuthScheme.SignUp
    : AuthScheme.SignIn
}

const tippy = createTippy({
  trigger: 'focusin',
})
</script>

<template>
  <div class="header">
    <Logo />
    <Button
      variant="outlined"
      class="toggle-scheme-btn"
      @click="toggleAuthScheme"
    >
      {{ isSignInScheme ? 'Sign Up' : 'Sign In' }}
    </Button>
  </div>

  <Picture :png-source="AuthBannerPng" :webp-source="AuthBannerWebp" />
  <b class="welcome-text">Welcome to RIFF</b>

  <form v-if="isSignInScheme" class="frame" @submit.prevent="signIn">
    <TextField
      type="email"
      placeholder="Email"
      v-model="signInSet.email"
      :pattern="regex2PatternString(emailRegex)"
      v-tippy="tippy('Example: me@riff.rocks.')"
    />
    <TextField
      type="password"
      placeholder="Password"
      v-model="signInSet.password"
      :pattern="regex2PatternString(passwordRegex)"
      v-tippy="tippy('At least 8 characters.')"
    />
    <Button class="action-btn" :disabled="!isValidSignInSet">Sign In</Button>
  </form>

  <form v-if="isSignUpScheme" class="frame" @submit.prevent="signUp">
    <TextField
      placeholder="Username"
      v-model="signUpSet.username"
      :pattern="regex2PatternString(usernameRegex)"
      v-tippy="tippy('Allow letters, numbers, and underscores.')"
    />
    <TextField
      type="password"
      placeholder="Password"
      v-model="signUpSet.password"
      :pattern="regex2PatternString(passwordRegex)"
      v-tippy="tippy('At least 8 characters.')"
    />
    <TextField
      type="email"
      placeholder="Email"
      v-model="signUpSet.email"
      :pattern="regex2PatternString(emailRegex)"
      v-tippy="tippy('Example: me@riff.rocks.')"
    />

    <div class="verification">
      <TextField
        class="verification-field"
        placeholder="Verification Code"
        v-model="signUpSet.code"
        maxlength="6"
        :pattern="regex2PatternString(verificationCodeRegex)"
        v-tippy="tippy('6-digit number.')"
      />
      <Button
        class="verification-btn"
        @click="sendVerificationCode"
        :disabled="!validateEmail(signUpSet.email) || isActive"
      >
        Send {{ isActive ? `(${sendableCountdown})` : null }}
      </Button>
    </div>

    <Button class="action-btn" :disabled="!isValidSignUpSet">Sign Up</Button>
  </form>
</template>

<style scoped>
@import url('./Auth.css');
</style>
