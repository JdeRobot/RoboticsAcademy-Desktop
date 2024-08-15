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
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">
    <path
      fill="#6b7280"
      className={`${cssClass}`}
      d="M4.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 4.5h6a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5"
    />
  </svg>
)
export const WindowMaximizeIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">
    <path
      fill="#6b7280"
      className={`${cssClass}`}
      d="M13.78 3.28a.75.75 0 0 0-1.06-1.06L10.5 4.44V3.25a.75.75 0 0 0-1.5 0v2.9l.002.052a.748.748 0 0 0 .796.796L9.85 7h2.9a.75.75 0 0 0 0-1.5h-1.19zM6.25 13.5a.75.75 0 0 1-.75-.75v-1.19l-2.22 2.22a.75.75 0 0 1-1.06-1.06l2.22-2.22H3.25a.75.75 0 0 1 0-1.5h2.9l.052.002a.748.748 0 0 1 .796.796L7 9.85v2.9a.75.75 0 0 1-.75.75"
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
