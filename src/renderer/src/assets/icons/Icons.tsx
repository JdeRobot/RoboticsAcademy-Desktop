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
      stroke="#fcfcfc"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      d="M4.513 19.487c2.512 2.392 5.503 1.435 6.7.466c.618-.501.897-.825 1.136-1.065c.837-.777.784-1.555.24-2.177c-.219-.249-1.616-1.591-2.956-2.967c-.694-.694-1.172-1.184-1.582-1.58c-.547-.546-1.026-1.172-1.744-1.154c-.658 0-1.136.58-1.735 1.179c-.688.688-1.196 1.555-1.375 2.333c-.539 2.273.299 3.888 1.316 4.965m0 0L2 21.999M19.487 4.515c-2.513-2.394-5.494-1.42-6.69-.45c-.62.502-.898.826-1.138 1.066c-.837.778-.784 1.556-.239 2.178c.078.09.31.32.635.644m7.432-3.438c1.017 1.077 1.866 2.71 1.327 4.985c-.18.778-.688 1.645-1.376 2.334c-.598.598-1.077 1.179-1.735 1.179c-.718.018-1.09-.502-1.639-1.048m3.423-7.45L22 2m-5.936 9.964c-.41-.395-.994-.993-1.688-1.687c-.858-.882-1.74-1.75-2.321-2.325m4.009 4.012l-1.562 1.524m-3.99-3.983l1.543-1.553"
    />
  </svg>
)

import type { SVGProps } from 'react'

export function HugeiconsPlugSocket(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16px"
      height="16px"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="#fcfcfc"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M17.854 12.16c-.383.45-1.09.454-1.537.007l-4.484-4.483c-.447-.447-.444-1.155.007-1.538l1.231-1.047a6.5 6.5 0 0 1 3.133-1.448l.725-.122c.685-.116 1.405.123 1.919.637l.986.987c.514.513.753 1.233.637 1.918l-.122.725a6.5 6.5 0 0 1-1.448 3.133zM19.5 4.5l2-2m-19 19l2-2m1.646-7.66c.383-.45 1.09-.454 1.538-.007l4.483 4.484c.447.446.444 1.154-.007 1.537l-1.231 1.047a6.5 6.5 0 0 1-3.133 1.448l-.725.122c-.685.116-1.405-.123-1.918-.637l-.987-.986c-.514-.514-.753-1.234-.637-1.919l.122-.725a6.5 6.5 0 0 1 1.448-3.133zm2.354.66l2-2m1 5l2-2"
        color="#fcfcfc"
      ></path>
    </svg>
  )
}
