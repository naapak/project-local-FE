import React, {useContext, useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import StripeInput from "./StripeInputs";
import {TextField} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import {LoginContext} from "../../contexts/LoginContext";

const useStyles = makeStyles(theme => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    width: "150px"
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  header: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(5),
    bottomBorder: "underline"
  },
  margin: {
    marginTop: theme.spacing(2)
  }
}));

const  options={
  style: {
    base: {
      fontSize: '25px',
      letterSpacing: "0.025em",
      backgroundColor: "white",
      padding: "20px",
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

function PaymentForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [StatusMessage, setStatusMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const loginContext = useContext(LoginContext);

  const handlePaymentSubmit = async e => {
    e.preventDefault();
    props.disable.setPostDisable(true);
    stripe
      .createToken({
        type: "card",
        name: `${props.details.firstName.value} ${props.details.lastName.value}`,
        address_line1: props.details.address.value,
        address_city: props.details.city.value,
        address_zip: props.details.zip.value,
        address_country: props.details.country.value,
        currency: "CAD"
      })
      .then(token => {
        if (token.error) {
          setOpen(true);
          setStatusMessage(token.error.message);
          // props.setting.setActiveStep(4);
        } else {
          setOpen(false);
          props.post(token.token);
        }
      });
  };


  const handleNext = e => {
    e.preventDefault();
    localStorage.removeItem('cart');
    loginContext.setCart(null)
    props.setting.setActiveStep(4);
  };

  const handleBack = e => {
    e.preventDefault();
    props.setting.setActiveStep(props.setting.activeStep - 1);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const cardBrandToPfClass = {
    'visa': 'pf-visa',
    'mastercard': 'pf-mastercard',
    'amex': 'pf-american-express',
    'discover': 'pf-discover',
    'diners': 'pf-diners',
    'jcb': 'pf-jcb',
    'unknown': 'pf-credit-card',
  }

  function setBrandIcon(brand) {
    const brandIconElement = document.getElementById('brand-icon');
    let pfClass = 'pf-credit-card';
    if (brand in cardBrandToPfClass) {
      pfClass = cardBrandToPfClass[brand];
    }
    for (let i = brandIconElement.classList.length - 1; i >= 0; i--) {
      brandIconElement.classList.remove(brandIconElement.classList[i]);
    }
    brandIconElement.classList.add('pf');
    brandIconElement.classList.add(pfClass);
  }

  const handleElementChange = change => {
    console.log("change",change)
    // if(change.brand) {
    //   setBrandIcon(change.brand)
    // }
  }

const logEvent = (event) =>{
   console.log(event);
}

  return (
    <>
      <Typography variant="h2" variant="h4" className={classes.header}>
        PAYMENT METHOD
      </Typography>
      <form>
        <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <TextField
              label="Credit Card Number"
              name="ccnumber"
              variant="outlined"
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleElementChange}
              style={{backgroundColor: 'white'}}
              InputProps={{
                inputComponent: StripeInput,
                inputProps: {
                  component: CardNumberElement,
                }
              }}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
              label="Expiration Date"
              name="ccexp"
              variant="outlined"
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{backgroundColor: 'white'}}
              InputProps={{
                inputComponent: StripeInput,
                inputProps: {
                  component: CardExpiryElement
                },
              }}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
              label="CVC"
              name="cvc"
              variant="outlined"
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              // error={props.shipping.unit.error}
              style={{backgroundColor: 'white'}}
              InputProps={{
                inputComponent: StripeInput,
                inputProps: {
                  component: CardCvcElement
                },
              }}
          />
        </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={($event)=>handleNext($event)}
          >
            Place Order
          </Button>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          className={clsx(classes.error)}
          aria-describedby="client-snackbar"
          message={(
            <span id="client-icon" className={classes.message}>
              <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
              {StatusMessage}
            </span>
          )}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    </>
  );
}

export default PaymentForm;

/*

          <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '30px',
                    backgroundColor: "white",
                    padding: "20px",
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
          />



        <label>
          Card details
          <label>
            Card number
            <CardNumberElement
                options={options}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
            />
          </label>
          <label>
            Expiration date
            <CardExpiryElement
                options={options}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
            />
          </label>
          <label>
            CVC
            <CardCvcElement
                options={options}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
            />
          </label>
        </label>

*/