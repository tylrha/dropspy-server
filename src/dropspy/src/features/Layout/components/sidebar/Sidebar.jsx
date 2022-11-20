import { Link } from 'react-router-dom'

import { AuthContext } from "../../../Authentication"
import { useContext } from "react"

import { SidebarStyled } from './sidebar.styles'
import { SIDEBAR_ICONS } from "../../../../utils/box-icons"
import { LayoutContext } from '../../context/LayoutContext'

const {
  appIcon,
  dashboardIcon,
  datesIcon,
  storesIcon,
  productsIcon,
  labelsIcon,
  categoriesIcon,
  userIcon,
  logoutIcon,
} = SIDEBAR_ICONS

const Sidebar = () => {

  const curRoute = window.location.pathname
  const { signOut, isUserAdmin } = useContext(AuthContext)
  const { showmenu } = useContext(LayoutContext)

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut();
  };

  const isActive = (link) => ((link === "/" && curRoute === '/dropspy/') || (link !== "/" && curRoute.search(link) > -1)) ? 'active' : ''

  const generateLinkDiv = (text, link, icon) => {
    return (
      <Link to={link} className={`nav__link nav__item ${isActive(link)}`}>
        <i className={`nav__icon ${icon}`} ></i>
        <span className="nav__name">{text}</span>
      </Link>
    )
  }

  return (
    <SidebarStyled id="nav-bar" className={`l-navbar ${showmenu === true ? 'show' : ''}`} >
      <nav className="nav">
        <div className="nav__things">
          <Link to="/" className="nav__logo nav__item">
            <i className={`${appIcon} nav__logo-icon`}></i>
            <span className="nav__logo-name">Dropspy</span>
          </Link>

          <div className="nav__list">
            {generateLinkDiv('Dashboard', '/', dashboardIcon)}
            {generateLinkDiv('Datas', '/dates', datesIcon)}
            {generateLinkDiv('Lojas', '/stores', storesIcon)}
            {generateLinkDiv('Categorias', '/categories', categoriesIcon)}
            {generateLinkDiv('Produtos', '/products', productsIcon)}
            {generateLinkDiv('Etiquetas', '/labels', labelsIcon)}
          </div>
        </div>

        <div className="nav__things">
          {isUserAdmin && (
            <Link to="/admin" className={`nav__preferences nav__link nav__item ${isActive("/admin")}`}>
              <i className={`${"bx bxs-wrench"} nav__icon`}></i>
              <span className="nav__name">Admin</span>
            </Link>
          )}

          <Link to="/user" className={`nav__preferences nav__link nav__item ${isActive("/user")}`}>
            <i className={`${userIcon} nav__icon`}></i>
            <span className="nav__name">Preferências</span>
          </Link>

          <div onClick={handleLogout} className="nav__logout nav__link nav__item">
            <i className={`${logoutIcon} nav__icon`}></i>
            <span className="nav__name">Sair</span>
          </div>
        </div>

      </nav>

    </SidebarStyled>
  )
}

export { Sidebar }
