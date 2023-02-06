export interface ColorTokens {
  primary: string
  foreground: string
  background: string
  surface: string
  placeholder: string
  emphasize: string
  hint: string
  'white-forever': string
  'black-forever': string
}

export enum ColorScheme {
  Light = 'light',
  Dark = 'dark',
  Auto = 'auto',
}

export type Theme = Record<ColorScheme.Light | ColorScheme.Dark, ColorTokens>

export interface ThemeOptions {
  scheme: ColorScheme
  theme: Theme
}
