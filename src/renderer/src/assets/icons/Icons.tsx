import { CssClassProps } from '@renderer/utils/interfaces'
import { FC } from 'react'

//* TopBar
export const WindowMinIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 36 36">
    <path
      fill="#6b7280"
      d="M27 27H9a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2"
      className={`clr-i-outline clr-i-outline-path-1 ${cssClass}`}
    />
    <path fill="none" d="M0 0h36v36H0z" />
  </svg>
)

export const WindowUnMaximizeIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 48 48">
    <path
      fill="#6b7280"
      className={`${cssClass}`}
      d="M6 11.5A5.5 5.5 0 0 1 11.5 6h25a5.5 5.5 0 0 1 5.5 5.5v25a5.5 5.5 0 0 1-5.5 5.5h-25A5.5 5.5 0 0 1 6 36.5zM11.5 9A2.5 2.5 0 0 0 9 11.5v25a2.5 2.5 0 0 0 2.5 2.5h25a2.5 2.5 0 0 0 2.5-2.5v-25A2.5 2.5 0 0 0 36.5 9z"
    />
  </svg>
)
export const WindowMaximizeIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24">
    <path
      fill="#6b7280"
      className={`${cssClass}`}
      d="M20.857 9.75a.75.75 0 1 0 0-1.5h-4.046l5.72-5.72a.75.75 0 0 0-1.061-1.06l-5.72 5.72V3.142a.75.75 0 0 0-1.5 0V9c0 .414.336.75.75.75zm-17.714 4.5a.75.75 0 0 0 0 1.5h4.046l-5.72 5.72a.75.75 0 1 0 1.061 1.06l5.72-5.72v4.047a.75.75 0 1 0 1.5 0V15a.75.75 0 0 0-.75-.75z"
    />
  </svg>
)
export const WindowCloseIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24">
    <path
      fill="#6b7280"
      className={`${cssClass}`}
      d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
    />
  </svg>
)
