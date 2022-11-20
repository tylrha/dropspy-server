import { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { LayoutContext } from "../context/LayoutContext";
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./header/Header";

import { PageContentStyled } from './layout.styles'
import { ModalContainer } from "../../../components/modal/Modal";

const Layout = (props) => {

  const {
    showmenu,

    theme,
    toogleTheme,

    isLoading,
    title,
    setTitle,

    modalStatus,
    setModalStatus,
    modalContent,
    setModalContent,
  } = useContext(LayoutContext)

  useEffect(() => {

    if (theme === 'dark') { toogleTheme('dark') }
    document.body.setAttribute('style', 'background-color: var(--background-color);')

    if (props.title !== undefined){
      setTitle(props.title)
      document.title = `DROPMAX - ${props.title}`;
    }

  }, []) // eslint-disable-line

  return (
    <>
      <Header title={title} isLoading={isLoading} />
      <Sidebar />
      <PageContentStyled id="pageContent" className={showmenu === true ? 'show__menu' : ''}>
        {props.children}
        <ModalContainer value={{ modalContent, setModalContent, modalStatus, setModalStatus }} />
      </PageContentStyled>

      {/* SCREEN TOOGLED ELEMENTS */}
      <ToastContainer />

    </>
  )
}

export { Layout }
