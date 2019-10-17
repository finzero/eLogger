import 'date-fns';
import React, {useState, useEffect} from "react";
import DateFnsUtils from '@date-io/date-fns';
import {  MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import uuid from "uuid";
import useForm from "react-hook-form";
import ExpenseList from "./list";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const initialState  = {
  id: null,
  date: new Date().toLocaleDateString(),
  expense: '',
  amount: '',
  description: ''
}

export default function Expense(){
  const { register, handleSubmit, watch, errors } = useForm()
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [list, setList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleChange = name => event => {
    let value = name !== 'date' ? event.target.value : event.toLocaleDateString();
    setValues({ ...values, [name]: value });
  };

  useEffect(()=>{
    if(list.length) countTotalAmount();
  });

  function handleAddItem(){
    let newObj = Object.assign({}, values, {
      id: uuid.v4(),
      amount: toCurrency(values.amount)
    });
    let newValues = [...list, newObj];
    setList(newValues);
    //keep date from changing
    const newInitialState = Object.assign({}, initialState, {date: values.date});
    setValues(newInitialState);
  }

  function handleDeleteItem(index){
    let newValue = list.filter((val, i)=>i!==index);
    setList(newValue);
  }

  function countTotalAmount(){
    const total = list.reduce((a, b) => { 
      return a + (parseFloat(b['amount'].replace(/[,.]+/g, "").trim()) || 0) 
    }, 0);
    setTotalAmount(toCurrency(total));
  }

  function toCurrency(number) {
    const formatter = new Intl.NumberFormat('id-ID', { style: 'decimal', currency: 'IDR' });
    return formatter.format(parseFloat(number));
  }

  return (
    <div>
      <form noValidate className={classes.container} onSubmit={handleSubmit(handleAddItem)} autoComplete="off">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Tanggal Transaksi"
              name="tanggalTransaksi"
              inputRef={register({ required: true })}
              format="MM/dd/yyyy"
              value={values.date}
              onChange={handleChange('date')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              error={errors.tanggalTransaksi}
            />
        </MuiPickersUtilsProvider>
        <TextField
          id="standard-name"
          label="Nama Pengeluaran"
          name="expense"
          value={values.expense}
          className={classes.textField}
          onChange={handleChange('expense')}
          margin="normal"
          inputRef={register({ required: true })}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.expense}
        />
        <TextField
          id="standard-number"
          label="Harga"
          name="amount"
          value={values.amount}
          inputRef={register({ required: true })}
          onChange={handleChange('amount')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          error={!!errors.amount}
        />
        <TextField
          id="standard-desc"
          label="Keterangan"
          name="description"
          value={values.description}
          className={classes.textField}
          onChange={handleChange('description')}
          margin="normal"
          inputRef={register}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.description}
        />
        <Button type="submit" variant="contained" className={classes.button}>Tambahkan</Button>
      </form>

      <ExpenseList list={list} handleDeleteItem={handleDeleteItem} totalAmount={totalAmount}/>
      
    </div>
  )
}