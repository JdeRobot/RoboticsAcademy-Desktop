import { SettingsIcon } from './../../assets/index'
import { socialLinks } from '@renderer/constants'

import React from 'react'

type Props = {}

const FooterLinks = (props: Props) => {
  return (
    <div className="w-full px-4 flex justify-between items-center">
      {/* icons */}
      <div className="flex gap-1 ">
        {socialLinks.map((social, index) => (
          <div
            className={`w-[28px] h-[28px] flex justify-center items-center hover:bg-yellow-500 rounded-full`}
            key={index}
          >
            <img
              src={social.icon}
              alt={social.id}
              key={social.id}
              className={`w-[20px] h-[20px] cursor-pointer `}
              onClick={() => window.open(social.link)}
            />
          </div>
        ))}
      </div>
      <div className="w-[28px] h-[28px] flex justify-center items-center hover:bg-yellow-500 rounded-full cursor-pointer">
        <img src={SettingsIcon} alt="settings" className="w-[20px]" />
      </div>
    </div>
  )
}

export default FooterLinks
