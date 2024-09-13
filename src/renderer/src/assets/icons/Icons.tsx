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

export const ConnectIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    className={`${cssClass}`}
  >
    <path
      fill="none"
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      d="M17.854 12.16c-.383.45-1.09.454-1.537.007l-4.484-4.483c-.447-.447-.444-1.155.007-1.538l1.231-1.047a6.5 6.5 0 0 1 3.133-1.448l.725-.122c.685-.116 1.405.123 1.919.637l.986.987c.514.513.753 1.233.637 1.918l-.122.725a6.5 6.5 0 0 1-1.448 3.133zM19.5 4.5l2-2m-19 19l2-2m1.646-7.66c.383-.45 1.09-.454 1.538-.007l4.483 4.484c.447.446.444 1.154-.007 1.537l-1.231 1.047a6.5 6.5 0 0 1-3.133 1.448l-.725.122c-.685.116-1.405-.123-1.918-.637l-.987-.986c-.514-.514-.753-1.234-.637-1.919l.122-.725a6.5 6.5 0 0 1 1.448-3.133zm2.354.66l2-2m1 5l2-2"
      color="#ffffff"
    />
  </svg>
)

export const ConfigureIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    className={`${cssClass}`}
  >
    <path
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      d="M21 5h-3m-4.25-2v4M13 5H3m4 7H3m7.75-2v4M21 12H11m10 7h-3m-4.25-2v4M13 19H3"
    />
  </svg>
)
export const CmdIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    className={`${cssClass}`}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2.22 1.97a.75.75 0 0 0 0 1.06l.97.97l-.97.97a.75.75 0 1 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06l-1.5-1.5a.75.75 0 0 0-1.06 0M8.75 8.5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"
      clipRule="evenodd"
    />
  </svg>
)

export const NextArrowIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    className={`${cssClass}`}
  >
    <path d="M13 18v-8l3.5 3.5l1.42-1.42L12 6.16l-5.92 5.92L7.5 13.5L11 10v8zM12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2" />
  </svg>
)

export const AddIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg
    className={`${cssClass}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 1v16M1 9h16"
    />
  </svg>
)

export const MinusIcon: FC<CssClassProps> = ({ cssClass }) => (
  <svg
    className={`${cssClass}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 2"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1h16"
    />
  </svg>
)
