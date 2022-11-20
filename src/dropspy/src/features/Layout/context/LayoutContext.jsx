import { createContext, useState } from "react";
import { useLocalStorage } from "../../../services/use-local-storage";

export const LayoutContext = createContext();

export const LayoutProvider = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');

  /* ------------------------------------------------------------------------ */
  const [modalStatus, setModalStatus] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  /* ------------------------------------------------------------------------ */

  const [theme, setTheme] = useLocalStorage('theme', "dark");

  const toogleTheme = (newTheme) => {
    document.body.setAttribute('data-theme', newTheme)
  }

  const handleThemeButton = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    toogleTheme(newTheme)
  }

  /* ------------------------------------------------------------------------ */

  const [showmenu, setShowmenu] = useLocalStorage('showmenu', false);

  const toogleMenu = () => {

    const nav = document.querySelector('#nav-bar')
    nav.classList.toggle('show')

    const headerpd = document.querySelector('#header')
    headerpd.classList.toggle('body-pd')

    const toggle = document.querySelector('#header-toggle')
    toggle.classList.toggle('bx-x')

    const pageContent = document.querySelector('#pageContent')
    pageContent.classList.toggle('show__menu')

  }

  const handleMenuButton = () => {
    toogleMenu()
    const newShowMenu = !showmenu
    setShowmenu(newShowMenu)
  }

  return (
    <LayoutContext.Provider value={{
      isLoading,
      setIsLoading,

      title,
      setTitle,

      modalStatus,
      setModalStatus,

      modalContent,
      setModalContent,

      theme,
      toogleTheme,
      handleThemeButton,

      showmenu,
      toogleMenu,
      handleMenuButton
    }}>
      {props.children}
    </LayoutContext.Provider>
  );
};
