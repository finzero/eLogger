import React, { useState } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
// import * as DB from '@material-ui/icons/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import { Route, NavLink, HashRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    background: '#000000',
    color: '#ffffff'
  },
  white: {
    color: "#ffffff"
  }
});

const menu = [
  {to:'dashboard', label: 'Dashboard'},
  {to:'expense', label: 'Expense'}
];

export default function LeftMenu(props){
  const classes = useStyles();
  const { changeRoute } = props;

  return (
      <Paper className={classes.root}>
        <MenuList>
          {
            menu.map(m=>{
              const {to , label} = m; 
              return (
                <MenuItem key={to} onClick={()=>{changeRoute(to)}}>
                  <ListItemIcon>
                    <Typography variant="inherit">
                      <Route exact to={to}>{label}</Route>
                    </Typography>
                  </ListItemIcon>
                </MenuItem>
              )
            })
          }
        </MenuList>
      </Paper>
  )
}