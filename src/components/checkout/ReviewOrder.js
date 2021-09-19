import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    header: {
        paddingTop: 40,
        paddingBottom: 10
    },
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
        paddingBottom: theme.spacing(1),
    },
    button: {
        color: "blue",
        height: 30,
        alignSelf: "center"
    },
    mainButton: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    inputField: {
        backgroundColor: 'white'
    },
    paper: {
        padding: theme.spacing(3),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
}));

export default function ReviewOrder(props) {
    const classes = useStyles();
    const [promoCode, setPromoCode] = useState("");
    const [updateFrom, setUpdateForm] = useState(false);

    const handleNext = e => {
        props.setting.setActiveStep(e);
    };
    console.log('props', props);

    const updatePromo = () => {
        setUpdateForm(true)
    }
    const updatePromoCode = () => {
        setUpdateForm(false);
    }

    return (
        <Grid>
            <div style={{display: "flex", justifyContent: "space-between", alignSelf:"baseline"}}>
                <Typography component="h4" variant="h5" className={classes.header}>
                   Contact Information
                </Typography>
                <Button
                    variant="text"
                    onClick={event => handleNext(0)}
                    className={classes.button}
                >
                    CHANGE
                </Button>
            </div>
            <Paper className={classes.paper}>
                <Typography component="h5" variant="h6" className={classes.padding}>
                    Name:
                </Typography>
                <Typography component="p" className={classes.padding}>
                    {`${props.setting.orderDetails.firstName.value} ${props.setting.orderDetails.lastName.value}`}
                </Typography>
                <Typography component="h5" variant="h6" className={classes.padding}>
                    Phone Number:
                </Typography>
                <Typography component="p" className={classes.padding}>
                    {`${props.setting.orderDetails.phone.value}`}
                </Typography>
                <Typography component="h5" variant="h6" className={classes.padding}>
                    Email:
                </Typography>
                <Typography component="p" className={classes.padding}>
                    {`${props.setting.orderDetails.email.value}`}
                </Typography>
            </Paper>
            {!props.setting.servicePickUp && (
                <>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography component="h4" variant="h5" className={classes.header}>
                            Address
                        </Typography>
                        <Button
                            variant="text"
                            onClick={event => handleNext(1)}
                            className={classes.button}
                        >
                            CHANGE
                        </Button>
                    </div>
                    <Paper className={classes.paper}>
                        <Typography component="h5" variant="h6" className={classes.padding}>
                            Shipping Address:
                        </Typography>
                        <Typography component="p" className={classes.padding}>
                            {`${props.setting.shipping.street.value}  ${props.setting.shipping.unit.value}`}
                           <br/>
                            <span>
                            {`${props.setting.shipping.city.value}  ${props.setting.shipping.zip.value}`}
                            </span>
                        </Typography>
                        { props.setting.billing ? (
                            <Typography component="p" className={classes.padding}>
                                Same as billing address
                            </Typography>
                        ) : (
                            <>
                                <Typography component="h5" variant="h6" className={classes.padding}>
                                    Billing Address
                                </Typography>
                                <Typography component="p" className={classes.padding}>
                                    {`${props.setting.billingAddress.street.value}  ${props.setting.billingAddress.unit.value}`}
                                <br/>
                                <span>
                                    {`${props.setting.billingAddress.city.value}  ${props.setting.billingAddress.zip.value}`}
                                </span>
                                </Typography>
                            </>
                         )}
                    </Paper>
                </>
            )}

            {props.setting.activeStep === 2 && (
                <Grid item  className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={()=>{props.setting.setActiveStep(3); props.scrollToPayment();}}
                        className={classes.mainButton}
                    >
                        Continue to Payment
                    </Button>
                </Grid>
            )}
        </Grid>
    );
}

/*
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Typography component="h4" variant="h5" className={classes.header}>
                   Promotion Code
                </Typography>
                <Button
                    variant="text"
                    onClick={updatePromo}
                    className={classes.button}
                >
                    CHANGE
                </Button>
            </div>

            <Paper className={classes.paper}>
                <Typography component="h5" variant="h6" className={classes.padding}>
                    Code:
                </Typography>
                {!updateFrom ? (
                    <Typography component="p">
                       {promoCode? promoCode: "NONE"}
                    </Typography>) : (
                    <>
                        <TextField
                            id="promoCode"
                            name="Promo Code"
                            type="text"
                            label="Promo Code"
                            fullWidth
                            value={promoCode}
                            color="primary"
                            variant="outlined"
                            className={classes.inputField}
                            onChange={event => setPromoCode(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={updatePromoCode}
                            className={classes.mainButton}
                        >
                            Update Promo
                        </Button>
                    </>
                )}
            </Paper>
 */