import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import {
  AppBar,
  Container,
  Drawer,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';

import {
  Menu,
  ChevronLeft
} from '@material-ui/icons';

import { setDrawerOpened } from './App.actions';
import { routes } from './App.routes';

const drawerWidth = 240;

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuItem: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 24,
        paddingRight: 24
      }
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  };
});

const AppLayout = ({ heading, children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isDrawerOpened = useSelector((state) => state.app.isDrawerOpened);

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={clsx(classes.appBar, isDrawerOpened && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(setDrawerOpened(isDrawerOpened))}
            className={clsx(classes.menuButton, isDrawerOpened && classes.menuButtonHidden)}
          >
            <Menu />
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {heading}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !isDrawerOpened && classes.drawerPaperClose),
        }}
        open={isDrawerOpened}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => dispatch(setDrawerOpened(isDrawerOpened))}>
            <ChevronLeft />
          </IconButton>
        </div>

        {
          routes.map((route) => {
            if (route.includeInDrawer) {
              const Icon = route.drawerIcon;

              return (
                <Link key={route.key} to={route.path} style={{ textDecoration: 'none' }}>
                  <Tooltip title={isDrawerOpened ? '' : route.label}>
                    <ListItem className={classes.menuItem} button>
                      {
                        Icon ? (
                          <ListItemIcon>
                            <Icon />
                          </ListItemIcon>
                        ) : (null)
                      }

                      <ListItemText primary={route.label} />
                    </ListItem>
                  </Tooltip>
                </Link>
              );
            }

            return null;
          })
        }
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer}></div>

        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  )
};

export default AppLayout;
