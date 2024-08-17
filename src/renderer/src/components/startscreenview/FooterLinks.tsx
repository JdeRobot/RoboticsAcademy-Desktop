import PropTypes from 'prop-types'
import { BackIcon, SettingsIcon } from './../../assets/index'
import { socialLinks } from '@renderer/constants'

import { Dispatch, FC } from 'react'
import { ActionEnums, ButtonEnums, ScreenStateEnums } from '@renderer/utils/enums'
import { ReducerActionTypes } from '@renderer/utils/types'

interface FooterLinksInterface {
  screenState: string
  dispatch: Dispatch<ReducerActionTypes>
}
//TODO:  UPDATE ALL LINKS
const FooterLinks: FC<FooterLinksInterface> = ({ screenState, dispatch }) => {
  return (
    <div className="w-full px-4 flex justify-between items-center select-none">
      {/* icons */}
      <div className="flex gap-1 ">
        {socialLinks.map((social, index) => (
          <div
            className={`w-[28px] h-[28px] flex justify-center items-center hover:bg-yellow-500 rounded-full cursor-pointer `}
            key={index}
          >
            <img
              src={social.icon}
              alt={social.id}
              key={social.id}
              className={`w-[18px] xh-[16px] `}
              onClick={() => window.open(social.link)}
            />
          </div>
        ))}
      </div>
      {screenState === ScreenStateEnums.START && (
        <div
          className="w-[28px] h-[28px] flex justify-center items-center hover:bg-yellow-500 rounded-full cursor-pointer"
          onClick={() => {
            dispatch({
              type: ActionEnums.EXPAND_DIV
            })
            dispatch({
              type: ActionEnums.CHANGE_SCREEN,
              payload: {
                screenState: ScreenStateEnums.SETTINGS,
                buttonState: ButtonEnums.START,
                errorWarningMsg: [],
                progress: 0
              }
            })
          }}
        >
          <img src={SettingsIcon} alt="settings" className="w-[20px]" />
        </div>
      )}
      {/* back to start screen */}
      {screenState === ScreenStateEnums.SETTINGS && (
        <div
          className="w-[28px] h-[28px] flex justify-center items-center hover:bg-yellow-500 rounded-full cursor-pointer"
          onClick={() => {
            dispatch({
              type: ActionEnums.EXPAND_DIV
            })
            dispatch({
              type: ActionEnums.CHANGE_SCREEN,
              payload: {
                screenState: ScreenStateEnums.START,
                buttonState: ButtonEnums.START,
                errorWarningMsg: [],
                progress: 0
              }
            })
          }}
        >
          <img src={BackIcon} alt="settings" className="w-[20px]" />
        </div>
      )}
    </div>
  )
}
FooterLinks.propTypes = {
  screenState: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default FooterLinks
