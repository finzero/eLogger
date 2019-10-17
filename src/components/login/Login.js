import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  card: {
    background: "#ececec",
    height: "100%"
  },
  or: {
    textAlign: 'center',
    verticalAlign: 'middle',
    marginTop: '120px'
  }
}));

export default function Login() {
  const classes = useStyles();
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <LoginForm classes={classes} />
      </Grid>
      {/* <Grid item xs={1} className={classes.or}>OR</Grid> */}
      <Grid item xs={3}>
        <RegisterForm classes={classes} />
      </Grid>
    </Grid>    
  );
}