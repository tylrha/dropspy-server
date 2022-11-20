import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { useState, SyntheticEvent, useRef } from 'react';
import { TabContainerStyled, HeadTabsStyled, BodyTabsStyled } from './tabs.styles';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Typography
          component={'span'}
          variant={'body2'}>
          {children}
        </Typography>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Tabs = (props: any) => {

  const { tabs, tabsContent } = props.value
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const tabsHeaderRef = useRef(null)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };


  return (
    <TabContainerStyled>

      <HeadTabsStyled>
        <AppBar position="static">
          <MuiTabs
            ref={tabsHeaderRef}
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            // variant="fullWidth"
            // variant="scrollable"
            scrollButtons={true}
            allowScrollButtonsMobile
            aria-label="full width tabs example"
          >
            {tabs.map((item: any, index: number) => (
              <MuiTab key={`id-${index}`} label={item} {...a11yProps(index)} />
            ))}
          </MuiTabs>
        </AppBar>
      </HeadTabsStyled>

      <BodyTabsStyled>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {tabsContent.map((item: any, index: number) => (
            <TabPanel key={`bd-${index}`} value={value} index={index} dir={theme.direction}>
              {item}
            </TabPanel>
          ))}
        </SwipeableViews>
      </BodyTabsStyled>

    </TabContainerStyled>
  );
}

export {Tabs}

/*

  const getMaxHeight = () => Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)

  const getRect = (element: any): any => {
    if (!element){return null};
    return element.getBoundingClientRect();
  };

  const scrollToElement = (element: any): any => {
    if (!element){return null};
    console.log("SCROLL")
    var scrollDiv = element.offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
    // element.scrollIntoView();
  };

  const [scrollTo, setScrollTo] = useState(0)
  const [parentEl, setParentEl] = useState(null)

  console.log("RENDERIZOU!")

  useLayoutEffect(() => {
    console.log(`LAYOUT! -> ${scrollTo}`)
    console.log(parentEl)
    scrollToElement(tabsHeaderRef.current)
    // window.scrollTo(0, scrollTo)
  }, [scrollTo])

  const getScrollToPosition = () => {
    const bodyPosition = getRect(document.body).top
    const parentTopPosition = getRect(tabsHeaderRef.current).top
    const curParentScrollPosition = parentTopPosition - bodyPosition
    const screenMaxHeight = getMaxHeight()
    console.log('\n\n')
    console.log(tabsHeaderRef.current)
    setParentEl(tabsHeaderRef.current)
    console.log(`bodyPosition = ${bodyPosition}`)
    console.log(`parentTopPosition = ${parentTopPosition}`)
    console.log(`curParentScrollPosition = ${curParentScrollPosition}`)
    console.log(`screenMaxHeight = ${screenMaxHeight}`)
    return curParentScrollPosition
  }

  // const showInfo = () => {

  //   console.log('--------')

  //   const pageYOffset = window.pageYOffset
  //   const diffPos = pageYOffset - curParentScrollPosition
  //   console.log(`pageYOffset = ${pageYOffset}`)
  //   console.log(`diffPos = ${diffPos}`)
  //   console.log('\n\n')
  // }
    setScrollTo(getScrollToPosition())

  // useLayoutEffect(() => {
  //   window.scroll({ top: window.pageYOffset });
  // }, [value])

*/
