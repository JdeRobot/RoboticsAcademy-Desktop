import { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'
interface LoaderInterface {
  children: ReactNode
  cssClass?: string
}

const Loader: FC<LoaderInterface> = ({ children, cssClass }) => {
  return (
    <div className={`flex items-center gap-2`}>
      <div
        className={`border-[#D9D9D9] h-[16px] w-[16px] animate-spin rounded-full border-2 border-t-[#939393] ${cssClass}`}
      />
      <div>{children}</div>
    </div>
  )
}
Loader.propTypes = {
  children: PropTypes.element.isRequired,
  cssClass: PropTypes.string
}
export default Loader
