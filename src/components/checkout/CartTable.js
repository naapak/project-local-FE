import React, {useContext, useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddRemoveProducts from "../AddRemoveProducts";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {LoginContext} from "../../contexts/LoginContext";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  bold: {
    fontWeight: "bold",
    fontSize: 16
  },
  borderBottom: {
    borderBottom: "1px solid black !important",
    padding: "0 16px 10px !important"
  },
  borderTop: {
    borderTop: "1px solid black !important",
    padding: "10px 16px 0 !important"
  },
  padding: {
    padding: "0 16px !important"
  }
});

function ccyFormat(num) {
  return `$ ${num.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ qty, unit }) => qty * unit).reduce((sum, i) => sum + i, 0);
}

export default function CartTable(props) {
  const classes = useStyles();
  const [rows, setRows] = useState(props.orders);
  const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
  const [invoiceTaxes, setinvoiceTaxes] = useState(0);
  const [invoiceTotal, setinvoiceTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [serviceFees, setServiceFees] = useState(2.99);
  const loginContext = useContext(LoginContext);

  const pushtoCart = (productId, addProductToCart, newQty) => {
    console.log(productId, addProductToCart, newQty);
    const elementsIndex = rows.findIndex(element => element.sku === productId);
    const prod = rows;
    if(newQty === 0) {
      removeProduct(productId);
    } else {
      prod[elementsIndex].qty = newQty;
      setRows(prod);
      setInvoiceSubtotal(subtotal(rows));
    }
  // same logic is in ProductList.js line 74 to 104
    let orders = {};
    const cart = localStorage.getItem("cart");
    if (cart === null) {
      orders[productId] = newQty;
      orders.total = newQty;
    } else if (addProductToCart) {
      orders = JSON.parse(cart);
      if (orders[productId]) {
        orders[productId] = newQty;
      } else {
        orders[productId] = newQty;
      }
      orders.total += 1;
    } else {
      orders = JSON.parse(cart);
      if (newQty > 0) {
        orders[productId] = newQty;
      } else {
        console.log("I am calling this");
        delete orders[productId];
      }
      orders.total -= 1;
    }
    if (orders.total === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(orders));
    }
    loginContext.setCart(orders);
  };

  const removeProduct = (productId) =>{
    const newRows = rows.filter(element => element.sku !== productId);
    if(newRows.length === 0) props.setCart(null);
    setRows(newRows);
    props.deleteOrder(productId)
  };

  useEffect(()=>{
    setRows(props.orders)
    console.log("products", props.orders)
  }, [props.orders])

  useEffect(()=>{
    console.log("I am running")
    const SubTotal = subtotal(rows)
    setInvoiceSubtotal(SubTotal);
    setinvoiceTaxes(TAX_RATE * SubTotal);
    setinvoiceTotal( SubTotal + (TAX_RATE * SubTotal) + serviceFees - discount);
  },[rows, invoiceSubtotal, serviceFees, discount])

  return (
    <Table aria-label="Cart Details">
      <TableHead>
        <TableRow>
          <TableCell align="left">Quantity</TableCell>
          <TableCell align="left">Item</TableCell>
          <TableCell align="left">Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={row.desc}>
            <TableCell
              align="left"
              className={
                i === rows.length - 1 ? classes.borderBottom : classes.padding
              }
            >
              <Grid container>
                <Grid item>
                  <AddRemoveProducts post={row} pushtoCart={pushtoCart} />
                </Grid>
                <Grid item>
                  <Button onClick={()=>{removeProduct(row.sku)}}  size="small">
                    (Remove)
                  </Button>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell
              align="left"
              className={
                i === rows.length - 1 ? classes.borderBottom : classes.padding
              }
            >
              {row.title}
            </TableCell>
            <TableCell
              align="left"
              className={
                i === rows.length - 1 ? classes.borderBottom : classes.padding
              }
            >
              {ccyFormat(row.qty * row.unit)}
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className={classes.borderTop}>Subtotal</TableCell>
          <TableCell className={classes.borderTop} />
          <TableCell align="left" className={classes.borderTop}>
            {ccyFormat(invoiceSubtotal)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.padding}>Service Fee</TableCell>
          <TableCell className={classes.padding} />
          <TableCell align="left" className={classes.padding}>
            {ccyFormat(serviceFees)}
          </TableCell>
        </TableRow>
        { discount !== 0 &&
        <TableRow >
          <TableCell className={classes.padding}>Discount</TableCell>
          <TableCell className={classes.padding} />
          <TableCell align="left" className={classes.padding}>
            {ccyFormat(discount)}
          </TableCell>
        </TableRow>
        }
        <TableRow>
          <TableCell colSpan={1} className={classes.borderBottom}>
            {`Tax ${(TAX_RATE * 100).toFixed(0)} %`}
          </TableCell>
          <TableCell className={classes.borderBottom} />
          <TableCell align="left" className={classes.borderBottom}>
            {ccyFormat(invoiceTaxes)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} align="right" className={classes.bold}>
            Total
          </TableCell>
          <TableCell align="left" style={{ fontSize: "16px" }}>
            {ccyFormat(invoiceTotal)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
