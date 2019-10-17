import React from "react";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#efefef',
    },
  },
}))(TableRow);

const tableStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
}));

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

export default function ExpenseList(props){

  const { list, handleDeleteItem, totalAmount } = props;
  const classes = useStyles();
  const tclasses = tableStyles();

  return (
    <Grid item xs={12}>
        <Paper>
          <p>Daftar Transaksi</p>
            <Paper className={tclasses.root}>
              <Table className={tclasses.table} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">No</StyledTableCell>
                    <StyledTableCell align="left">Nama Barang</StyledTableCell>
                    <StyledTableCell align="right">Nominal</StyledTableCell>
                    <StyledTableCell align="center">Tindakan</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    list.length ? list.map((l,i)=>{
                      const {id, expense, amount} = l; 
                      return (
                      <StyledTableRow key={id}>
                        <StyledTableCell align="left">{i+1}</StyledTableCell>
                        <StyledTableCell align="left">{expense}</StyledTableCell>
                        <StyledTableCell align="right">{amount}</StyledTableCell>
                        <StyledTableCell align="center">
                          <Button variant="contained" color="primary" onClick={()=>handleDeleteItem(i)} className={classes.button}>Hapus</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                      )
                    }) : 
                    <tr><td colSpan="4" align="center">Tidak Ada Barang</td></tr>
                  }
                </TableBody>
                {
                  list.length ? (
                    <TableFooter>
                      <tr>
                        <StyledTableCell colSpan="3" align="right">{totalAmount}</StyledTableCell>
                      </tr>
                    </TableFooter>
                  ) : null
                }
                
              </Table>
            </Paper>
        </Paper>
      </Grid>
  )
}