import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import useForm from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const initialState = {username: '',password: ''};

export default function RegisterForm(props) {

  const { classes } = props;
  const [values, setValues] = React.useState(initialState);
  const { register, handleSubmit, watch, errors } = useForm()

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function onRegister(){
    console.log(values);
  }

  return (
    <Card className={classes.card}>
      <CardHeader title="Register" />
      <CardContent>
        <div className={classes.root}>
          <form component="fieldset" onSubmit={handleSubmit(onRegister)} className={classes.formControl}>
            <FormGroup>
            <TextField
              id="username"
              label="Username"
              name="username"
              value={values.username}
              className={classes.textField}
              onChange={handleChange('username')}
              margin="normal"
              inputRef={register({ required: true })}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.username}
            />
            <TextField
              id="password"
              label="Password"
              name="password"
              value={values.expense}
              className={classes.textField}
              onChange={handleChange('password')}
              margin="normal"
              type="password"
              autoComplete="current-password"
              inputRef={register({ required: true })}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.password}
            />
            <TextField
              id="confirmPassword"
              label="confirmPassword"
              name="confirmPassword"
              value={values.expense}
              className={classes.textField}
              onChange={handleChange('confirmPassword')}
              margin="normal"
              type="password"
              autoComplete="current-password"
              inputRef={register({
                validate: (value) => value === watch('password')
              })}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.confirmPassword}
            />
            <Button type="submit" variant="contained" className={classes.button}>
              Register
            </Button>
            </FormGroup>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}