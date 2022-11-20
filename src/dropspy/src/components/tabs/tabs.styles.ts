import styled from 'styled-components'

const TabContainerStyled = styled.div`
  width: '100%';

  .MuiPaper-root {
    width: fit-content;
    margin: 0 auto;
    background-color: var(--background-color-alt);
    color: var(--text-color);
  }
`

/* -------------------------------------------------------------------------- */

const HeadTabsStyled = styled.div`

  position: 'fixed';

  .Mui-selected{
    color: var(--first-color) !important;
  }

  .MuiTabs-indicator {
    background-color: var(--first-color) !important;
  }

  button.MuiButtonBase-root {
    /* white-space: nowrap; */
  }
`

const BodyTabsStyled = styled.div`
  padding: 0;
  margin: 0;

  .MuiBox-root{
    padding: 0;
    margin: 0;
  }

`
/* -------------------------------------------------------------------------- */

const TabStyled = styled.div`
  /* border-bottom: 3px solid var(--first-color); */
`
/* -------------------------------------------------------------------------- */

export {
  TabContainerStyled,
  HeadTabsStyled,
  BodyTabsStyled,
  TabStyled
}
