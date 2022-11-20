import DarkModeToggle from "react-dark-mode-toggle"
import { useContext } from 'react'
import { SpanLoader } from '../../../../components/loader/Loader'
import { LayoutContext } from '../../context/LayoutContext'

import {HeaderStyled} from './header.styles'

const Header = (props) => {

  const { handleMenuButton, showmenu } = useContext(LayoutContext)
  const { handleThemeButton, theme } = useContext(LayoutContext)
  const isDarkMode = theme === 'dark' ? true : false

  return (
    <HeaderStyled id="header" className={`header ${showmenu === true ? 'body-pd' : ''}`}>
      <div className="header__toggle" onClick={handleMenuButton}>
        <i className={`bx bx-menu ${showmenu === true ? 'bx-x' : ''}`} id="header-toggle"></i>
      </div>

      <div className="header__title">{props.title}
        {props.isLoading === true && (<SpanLoader />)}
      </div>

      <div className="header__options">
        <DarkModeToggle size={40} onChange={handleThemeButton} checked={isDarkMode} />
      </div>
    </HeaderStyled>
  )
}

export { Header }
