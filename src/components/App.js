import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, HashRouter, NavLink, Redirect } from "react-router-dom";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import MyIcon from './MyIcons';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';

// import {Typography, Breadcrumbs, ListItemIcon, MenuList, MenuItem, Paper, Link} from "@material-ui/core";
import Dashboard from "./dashboard/dashboard";
import Expense from "./expense/expense";
import Login from "./login/Login";
import Logout from "./login/Logout";

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  control: { padding: theme.spacing(0) },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    color: '#fff',
    backgroundColor: "#000000"
  }
}));

const menu = [
  {to:'login', label: 'Login', component: Login, icon: 'lock', protectedComp: false},
  {to:'dashboard', label: 'Dashboard', component: Dashboard, icon: 'dashboard', protectedComp: true},
  {to:'expense', label: 'Pengeluaran', component: Expense, icon: 'money', protectedComp: true},
  {to:'setting', label: 'Setting', icon: 'setting', protectedComp: true},
  {to:'logout', label: 'Logout', icon: 'lock', protectedComp: true}
];

const section = {
  height: '100%',
  width: '100%',
  position: "absolute"
};

function App() {
  const classes = useStyles();
  const [leftMenu, setLeftMenu] = useState(true);
  const [contentWidth, setContentWidth] = useState(10);
  const { height } = useWindowSize();
  
  const isAuth = useSelector(state => state.authReducer.isAuth);
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuth === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  const RedirectRoute = () => { 
    if(isAuth){
      return <Redirect to='/dashboard' /> 
    } else {
      return <Redirect to='/login' /> 
    }
  }

  function toggleLeftBar(){
    setLeftMenu(!leftMenu);
    setContentWidth(leftMenu ? 12 : 10);
  }

  return (
    <HashRouter>
      <div style={section}>
        <Grid style={section} container>
        {
          leftMenu ? 
          <Grid className="Left-Menu" item xs={2}>
            <div className="leftTitle">My Application</div>
            <MenuList className="noPadding">
              {
                menu.map(m=>{
                  const {to, icon, label, protectedComp} = m; 
                  {
                    return isAuth === protectedComp ? (
                    <NavLink key={to} exact to={to}>
                      <MenuItem className="mItem" key={to}>
                        <MyIcon type={icon} />
                        <ListItemIcon>
                          <Typography variant="inherit">{label}</Typography>
                        </ListItemIcon>
                      </MenuItem>
                    </NavLink>
                    ) : null
                  }
                })
              }
            </MenuList>
          </Grid> : null
        }
          
          <Grid item xs={contentWidth}>
            <div className={classes.root}>
              <AppBar position="static" className={classes.appBar}>
                <Toolbar variant="dense">
                  <IconButton edge="start" className={classes.menuButton} onClick={toggleLeftBar} color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" color="inherit">
                    Auooo
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
            
            <div id="mainContent" style={{height: height-70 }} className="fixedContent p-10">
              <Switch>
                <Route path='/login' component={Login} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/expense' component={Expense} />
                <PrivateRoute path='/setting'> This Page is for setting </PrivateRoute>
                <PrivateRoute path='/logout' component={Logout}></PrivateRoute>
                <Route component={RedirectRoute} />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </div>
    </HashRouter>
  );
}

function useWindowSize() {
  
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }
  
  const [windowSize, setWindowSize] = useState(getSize);
  
  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  return windowSize;
}

export default App;
