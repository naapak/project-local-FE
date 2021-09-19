import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import InputMask from 'react-input-mask'
import {FormControlLabel} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
        width: "110px"
    },
    margin: {
        marginTop: theme.spacing(2)
    },
    header: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(5),
        bottomBorder: "underline"
    }
}));

export default function ShippingForm(props) {
    const classes = useStyles();

    const [checked, setChecked] = useState({
        free: true,
        fast: false
    });

    function handleData(event, type) {
        if (type === 'zip') {
            event = event.toUpperCase();
        }
        props.setShipping(prev => {
            let prevType = prev[type];
            prevType.value = event;
            prevType.error = false;
            return {...prev};
        });
    }

    function updateBillingAddress(event, type) {
        if (type === 'zip') {
            event = event.toUpperCase();
        }
        props.setBillingAddress(prev => {
            let prevType = prev[type];
            prevType.value = event;
            prevType.error = false;
            return {...prev};
        });
    }

    const handleBack = () => {
        props.setActiveStep(props.activeStep - 1);
    };

    const proceedToReview = e => {
        if (
            props.shipping.street.value !== "" &&
            props.shipping.unit.value !== "" &&
            props.shipping.city.value !== "" &&
            props.shipping.zip.value !== "" && postalCode(props.shipping.zip.value) && props.billing
        ) {
            console.log("I am here1")
            sessionStorage.setItem("shipping", JSON.stringify(props.shipping));
            props.setActiveStep(props.activeStep + 1);
        } else if ( !props.billing && props.billingAddress.street.value !== "" &&
            props.billingAddress.unit.value !== "" &&
            props.billingAddress.city.value !== "" &&
            props.billingAddress.zip.value !== "" && postalCode(props.billingAddress.zip.value) &&
            props.shipping.street.value !== "" &&
            props.shipping.unit.value !== "" &&
            props.shipping.city.value !== "" &&
            props.shipping.zip.value !== "" && postalCode(props.shipping.zip.value))
        {
            sessionStorage.setItem("billing", JSON.stringify(props.billingAddress));
            sessionStorage.setItem("shipping", JSON.stringify(props.shipping));
            console.log("I am here2")
            props.setActiveStep(props.activeStep + 1);
        } else {
            console.log("I am here3")
            if (props.shipping.street.value === "") {
                props.setShipping(prev => {
                    prev.street.error = true;
                    return {...prev};
                });
            }
            if (props.shipping.unit.value === "") {
                props.setShipping(prev => {
                    prev.unit.error = true;
                    return {...prev};
                });
            }
            if (props.shipping.city.value === "") {
                props.setShipping(prev => {
                    prev.city.error = true;
                    return {...prev};
                });
            }
            if (props.shipping.zip.value === "" || !postalCode(props.shipping.zip.value)) {
                props.setShipping(prev => {
                    prev.zip.error = true;
                    return {...prev};
                });
            }
            if (props.billingAddress.street.value === "" && !props.billing) {
                props.setBillingAddress(prev => {
                    prev.street.error = true;
                    return {...prev};
                });
            }
            if (props.billingAddress.unit.value === "" && !props.billing) {
                props.setBillingAddress(prev => {
                    prev.unit.error = true;
                    return {...prev};
                });
            }
            if (props.billingAddress.city.value === "" && !props.billing) {
                props.setBillingAddress(prev => {
                    prev.city.error = true;
                    return {...prev};
                });
            }
            if (props.billingAddress.zip.value === "" || !postalCode(props.billingAddress.zip.value) && !props.billing) {
                props.setBillingAddress(prev => {
                    prev.zip.error = true;
                    return {...prev};
                });
            }
        }
    };

    function postalCode(code) {
        const re = /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/;
        return re.test(code);
    }

    const handleChecked = name => event => {
        let cost = 0;
        if (name === "free") {
            setChecked({[name]: event.target.checked, fast: false});
            cost = 0;
        } else {
            setChecked({[name]: event.target.checked, free: false});
            cost = 25;
        }

        props.updateTotal(cost);
    };

    const handleShippingAddressChange = () => {
        props.setBilling(!props.billing);
    }

    return (
        <form >
            <Typography component="h4" variant="h5" className={classes.header}>
                Address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={7} sm={7}>
                    <TextField
                        required
                        id="street"
                        name="street"
                        label="Address"
                        fullWidth
                        autoComplete="billing street"
                        onChange={event => handleData(event.target.value, "street")}
                        error={props.shipping.street.error}
                        helperText={
                            props.shipping.street.error ? props.shipping.street.errorText : ""
                        }
                        value={props.shipping.street.value}
                        color="primary"
                        variant="outlined"
                        style={{backgroundColor: 'white'}}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <TextField
                        required
                        id="unit"
                        name="unit"
                        label="Unit#"
                        type='number'
                        fullWidth
                        autoComplete="billing email"
                        onChange={event => handleData(event.target.value, "unit")}
                        error={props.shipping.unit.error}
                        helperText={
                            props.shipping.unit.error ? props.shipping.unit.errorText : ""
                        }
                        value={props.shipping.unit.value}
                        color="primary"
                        variant="outlined"
                        style={{backgroundColor: 'white'}}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={7} sm={7}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        variant="outlined"
                        fullWidth
                        autoComplete="billing city"
                        onChange={event => handleData(event.target.value, "city")}
                        error={props.shipping.city.error}
                        helperText={
                            props.shipping.city.error
                                ? props.shipping.city.errorText
                                : ""
                        }
                        value={props.shipping.city.value}
                        style={{backgroundColor: 'white'}}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <InputMask mask="a9a 9a9" maskChar=' ' value={props.shipping.zip.value}
                               onChange={event => handleData(event.target.value, "zip")}>
                        {(inputProps) =>
                            <TextField
                                {...inputProps}
                                variant="outlined"
                                required
                                id="postalCode"
                                name="zip"
                                label="zip"
                                fullWidth
                                autoComplete="billing zip"
                                error={props.shipping.zip.error}
                                helperText={
                                    props.shipping.zip.error
                                        ? props.shipping.zip.errorText
                                        : ""
                                }
                                style={{backgroundColor: 'white'}}
                            />}
                    </InputMask>
                </Grid>
            </Grid>
            <Grid container spacing={0} justifyContent="flex-start" style={{marginTop: 20}}>
                <Grid item>
                    <Checkbox
                        checked={props.billing}
                        onChange={handleShippingAddressChange}
                        value="billingChange"
                        color="primary"
                    />
                </Grid>
                <Grid item style={{alignSelf: "center"}}>
                    <Typography component="h6">Billing address is the same as the shipping address</Typography>
                </Grid>
            </Grid>
          { !props.billing && (
              <>
              <Typography component="h4" variant="h5" className={classes.header}>
                  Billing Address
              </Typography>
              <Grid container spacing={3}>
                  <Grid item xs={7} sm={7}>
                  <TextField
                      required
                      id="street"
                      name="street"
                      label="Address"
                      fullWidth
                      autoComplete="billing street"
                      onChange={event => updateBillingAddress(event.target.value, "street")}
                      error={props.billingAddress.street.error}
                      helperText={
                      props.billingAddress.street.error ? props.billingAddress.street.errorText : ""
                      }
                      value={props.billingAddress.street.value}
                      color="primary"
                      variant="outlined"
                      style={{backgroundColor: 'white'}}
                  />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                      <TextField
                          required
                          id="unit"
                          name="unit"
                          label="Unit#"
                          type='number'
                          fullWidth
                          autoComplete="billing email"
                          onChange={event => updateBillingAddress(event.target.value, "unit")}
                          error={props.billingAddress.unit.error}
                          helperText={
                          props.billingAddress.unit.error ? props.billingAddress.unit.errorText : ""
                          }
                          value={props.billingAddress.unit.value}
                          color="primary"
                          variant="outlined"
                          style={{backgroundColor: 'white'}}
                      />
                  </Grid>
              </Grid>
                  <Grid container spacing={3}>
                      <Grid item xs={7} sm={7}>
                          <TextField
                          required
                          id="city"
                          name="city"
                          label="City"
                          variant="outlined"
                          fullWidth
                          autoComplete="billing city"
                          onChange={event => updateBillingAddress(event.target.value, "city")}
                          error={props.billingAddress.city.error}
                          helperText={
                          props.billingAddress.city.error
                          ? props.billingAddress.city.errorText
                          : ""
                      }
                          value={props.billingAddress.city.value}
                          style={{backgroundColor: 'white'}}
                          />
                      </Grid>
                      <Grid item xs={4} sm={4}>
                      <InputMask mask="a9a 9a9" maskChar=' ' value={props.billingAddress.zip.value}
                              onChange={event => updateBillingAddress(event.target.value, "zip")}>
                          {(inputProps) =>
                              <TextField
                          {...inputProps}
                              variant="outlined"
                              required
                              id="postalCode"
                              name="zip"
                              label="zip"
                              fullWidth
                              autoComplete="billing zip"
                              error={props.billingAddress.zip.error}
                              helperText={
                              props.billingAddress.zip.error
                              ? props.billingAddress.zip.errorText
                              : ""
                          }
                              style={{backgroundColor: 'white'}}
                              />}
                      </InputMask>
                  </Grid>
              </Grid>
              </>
          )}
            <div className={classes.buttons}>
                <Button
                    variant="outlined"
                    onClick={handleBack}
                    className={classes.button}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={proceedToReview}
                >
                    Continue
                </Button>
            </div>
        </form>
    );
}

/*      <Typography component="h6" className={classes.header}>
        Shipping Method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={2} sm={2}>
          <Checkbox
            checked={checked.fast}
            onChange={handleChecked("fast")}
            value="Fast"
            color="primary"
          />
        </Grid>
        <Grid item xs={7} sm={7}>
          <Typography component="h6">Fast Shipping</Typography>
        </Grid>
        <Grid item xs={2} sm={2}>
          <Typography component="h6">$25.00</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2} sm={2}>
          <Checkbox
            checked={checked.free}
            onChange={handleChecked("free")}
            value="Free"
            color="primary"
          />
        </Grid>
        <Grid item xs={7} sm={7}>
          <Typography component="h6">Standard Shipping</Typography>
        </Grid>
        <Grid item xs={2} sm={2}>
          <Typography component="h6">Free</Typography>
        </Grid>
      </Grid>

 */