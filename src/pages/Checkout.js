import React, {useContext, useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ContactInfoForm from "../components/checkout/ContactInfoForm";
import PaymentForm from "../components/checkout/PaymentForm";
import ShippingForm from "../components/checkout/ShippingForm";
import {Grid} from "@material-ui/core";
import {fetchGet, fetchPost} from "../utils/ApiFetching";
import {useHistory} from "react-router-dom";
import {LoginContext} from "../contexts/LoginContext";
// import { Elements } from "react-stripe-elements";

import CartTable from "../components/checkout/CartTable";
import TwoComponent from "../components/twoComponent/TwoComponent";
import AvailableTime from "../components/checkout/AvailableTime";
import ReviewOrder from "../components/checkout/ReviewOrder";
import Container from "@material-ui/core/Container";
const productsData = require("../mockData/products.json");

const useStyles = makeStyles(theme => ({
  store: {
    margin: "30px 0"
  },
  marginBottom: {
    marginBottom: 100
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    width: 110
  },
  serviceButton: {
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    width: 110
  },
  card: {
    display: "flex",
    marginBottom: 10,
    marginTop: 10
  },
  cardMedia: {
    width: 100,
    paddingTop: "100%"
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  cardDetails: {
    display: "flex",
    flexDirection: "column"
  },
  cButton: {
    display: "flex",
    margin: "auto"
  },
  cardContent: {
    flexGrow: 2,
    padding: "5px 0 0 5px"
  },
  cardDelete: {
    padding: "0 0 0 0"
  },
  stepper: {
    marginBottom: 30
  },
  item1: {
    order: 1,
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
  item2: {
    order: 2,
    [theme.breakpoints.down('sm')]: {
      order:1,
    },
  },
}));

const steps = ["CONTACT", "ADDRESS", "REVIEW", "PAYMENT"];
const post =  {
  title: "Featured post",
  date: "Nov 12",
  description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
  image: "https://source.unsplash.com/random",
  imageText: "Image Text",
  ordering: ["pickup", "Delivery"],
  store: 123451,
  storeName: "EdMarket"
};

export default function Checkout(props) {
  const classes = useStyles();
  const history = useHistory();
  const loginContext = useContext(LoginContext);
  const [activeStep, setActiveStep] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postDisable, setPostDisable] = useState(false)
  const [total, setTotal] = useState(0);
  const [deleteProduct, setDeleteProduct] = useState("");
  const [servicePickUp, setServicePickUP] = useState(true);

  const [orderDetails, setOrderDetails] = useState({
    firstName: { value: "", error: false, errorText: "Please enter Name" },
    lastName: { value: "", error: false, errorText: "Please enter Last Name" },
    phone: { value: "", error: false, errorText: "Please enter a phone number" },
    email: {
      value: "",
      error: false,
      errorText: "Please enter a valid contact email",
      change: "Change"
    }
  });
  const [validationError, setValidationError] = useState(false);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [shipping, setShipping] = useState({
    street: { value: "", error: false, errorText: "Please enter street" },
    unit: { value: "", error: false, errorText: "Please enter street" },
    city: { value: "", error: false, errorText: "Please enter Province" },
    zip: { value: "", error: false, errorText: "Please enter Postal Code" }
  });
  const [billingAddress, setBillingAddress] = useState({
    street: { value: "", error: false, errorText: "Please enter street" },
    unit: { value: "", error: false, errorText: "Please enter street" },
    city: { value: "", error: false, errorText: "Please enter Province" },
    zip: { value: "", error: false, errorText: "Please enter Postal Code" }
  });
  const [billing, setBilling] = useState(true)
  const allKeys = Object.keys(orderDetails);
  const myRef = useRef();
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("details"));
    const storeShipping = JSON.parse(sessionStorage.getItem("shipping"));
    if (user !== null) {
      user.firstName.reload = true;
      setOrderDetails(user);
      setValidationError(false);
    } else if (loginContext.userDetails) {
      let logginUser = loginContext.userDetails;

      let name = logginUser.name.split(" ");

      setOrderDetails(prev => {
        if ((name.length = 2)) {
          prev.lastName.value = name.pop();
          prev.firstName.value = name.pop();
        } else {
          prev.firstName.value = name.pop();
        }
        // how do i split the address? from the token address????
        return { ...prev };
      });
      // setShipping(prev => {
      //   prev.email.value = logginUser.email;
      //   return { ...prev };
      // });
    }
    if (storeShipping) {
      setShipping(storeShipping);
    }

    if (cart !== null) {
      let products = Object.keys(cart);
      let index = products.indexOf("total");
      if (index !== -1) {
        products.splice(index, 1);
      }
      setLoading(true);

      let cartProducts = []
      productsData.filter(item => {
        const categoryProds = item[Object.keys(item)[0]]
        categoryProds.filter(prod => {
          if(products.includes(prod.sku.toString())) {
            prod.qty = cart[Number(prod.sku)]
            prod.unit = Number(prod.price)
            cartProducts.push(prod);
          }
        });
      });
      console.log('cartProducts',cartProducts )
      setOrders(cartProducts);

      // TODO
      // products.forEach((product, i) => {
      //   fetchGet(`/shop/items/${product}`).then((res, err) => {
      //     if (typeof res === "object") {
      //       let subtotal = Number(cart[res.item._id]) * Number(res.item.price);
      //       res.item.qty = cart[res.item._id];
      //       res.item.subTotal = subtotal;
      //       setOrders(prevState => {
      //         return [...prevState, res.item];
      //       });
      //       setTotal(prevState => {
      //         return Number(prevState) + Number(subtotal);
      //       });
      //       if (i === products.length - 1) {
      //         setLoading(false);
      //       }
      //     }
      //   });
      // });
    }
  }, []);

  useEffect(() => {
    if (deleteProduct !== "") {
      let deleteOrder = {};
      const newOrders = orders.filter((ele, i) => {
        if (ele.sku === deleteProduct) {
          deleteOrder.subTotal = ele.subTotal;
          deleteOrder.qty = ele.qty;
          return false;
        }
        return true;
      });
      setOrders(newOrders);
      console.log("deleteOrders is:", deleteOrder);
      setTotal(total - deleteOrder.subTotal);

      if (newOrders.length > 0) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        delete cart[deleteProduct];
        cart.total = cart.total - deleteOrder.qty;
        localStorage.setItem("cart", JSON.stringify(cart));
        loginContext.setCart(cart);
      } else {
        localStorage.removeItem("cart");
        loginContext.setCart(null);
        setCart(null);
      }
    }
  }, [deleteProduct]);

  useEffect(() => {
    if (orderDetails.firstName.reload === true) {
      handleNext();
    }
  }, [orderDetails.firstName.reload]);

  useEffect(()=>{

  }, [servicePickUp])

  const handleNext = e => {
    allKeys.forEach((ele, i) => {
      if (orderDetails[ele].value === "" || (ele === 'email' && !validateEmail(orderDetails[ele].value)) || (ele === 'phone' && !validatePhone(orderDetails[ele].value))) {
        setValidationError(true);
        setOrderDetails(prev => {
          let prevType = prev[ele];
          prevType.error = true;
          return { ...prev };
        });
      } else if (allKeys.length - 1 === i) {
        if (orderDetails[ele].value !== "" && validationError === false && e) {
          sessionStorage.setItem("details", JSON.stringify(orderDetails));
          if (servicePickUp) {
            setActiveStep(2);
          } else {
            setActiveStep(activeStep + 1);
          }
        }
      }
    });
  };

  const formValidations = (type, value) => {
    setValidationError(false);
    setOrderDetails(prev => {
      let prevType = prev[type];
      prevType["value"] = value;
      prevType.error = false;
      return { ...prev };
    });
    if (value === "" || (type === 'email' && !validateEmail(value)) || (type === 'phone' && !validatePhone(value))) {
      setValidationError(true);
    }
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
  }


  const continueShopping = () => {
    if (
      orderDetails.firstName.value !== "" &&
      orderDetails.lastName.value !== ""
    ) {
      sessionStorage.setItem("details", JSON.stringify(orderDetails));
    }
    history.push("/");
  };

  function ContinueButton() {
    return (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={continueShopping}
        disabled={false}
        className={classes.cButton}
      >
        Back to Store
      </Button>
    );
  }

  const updateTotal = cost => {
      setOrderDetails(prev => {
        return { ...prev, shippingCost: cost };
      });
    };

  const postData = token => {
    const details = {};
    allKeys.forEach((ele, i) => {
      details[ele] = orderDetails[ele].value;
    });
    details['shippingCost'] = orderDetails['shippingCost'] // shippingCost had no value

    Object.keys(shipping).forEach((ele, i) => {
      details[ele] = shipping[ele].value;
    });

    const data = {
      orders: loginContext.cart,
      details,
      token: token.id,
      total,
      user: loginContext.userDetails
    }

    console.log('this is the data', data);
      fetchPost("/checkout/charge",data).then((res, err) => {
        setPostDisable(false)
        if (res['success']) {
          setActiveStep(activeStep + 1);
          localStorage.removeItem('cart');
          loginContext.setCart(null);
        }
        if(res['error']){
          console.log('there is a error',res['error'])
          // need to handle the error;
        }
      });
  };

  function getStepContent(step) {
    console.log(activeStep)
    switch (step) {
      case 0:
        return (
            <>
              <Typography component="h4" variant="h5" style={{marginBottom:20}}>
                Contact Information
              </Typography>
              <ContactInfoForm formData={formValidations} details={orderDetails} />
              <div className={classes.buttons}>
                {/*{(activeStep === 0 && !servicePickUp) &&  (*/}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={event => handleNext(event)}
                        className={classes.button}
                    >
                      {activeStep === 0 && !servicePickUp ? "Continue" : "Review"}
                    </Button>
                {/*)}*/}
              </div>
            </>
        );
      case 1:
        return (
          <ShippingForm
            details={orderDetails}
            setActiveStep={setActiveStep}
            activeStep={activeStep}
            updateTotal={updateTotal}
            shipping={shipping}
            setShipping={setShipping}
            billingAddress={billingAddress}
            setBillingAddress={setBillingAddress}
            billing={billing}
            setBilling={setBilling}
          />
        );
      case 2:
        return (
            <ReviewOrder  setting={{setActiveStep, activeStep, servicePickUp, orderDetails, shipping, billingAddress, billing }}  scrollToPayment={scrollToMyRef} />
        );
      case 3: return (
          <PaymentForm
              setting={{setActiveStep, activeStep, servicePickUp}}
              disable={{postDisable, setPostDisable}}
              post={postData}
              details={orderDetails}
              shipping={shipping}
          />
      );
      case 4:
        return (
            <>
              <React.Fragment>
                <Typography
                    variant="h3"
                    className={classes.paper}
                    align="center"
                >
                  Success! Your order has been processed!
                </Typography>
                <Typography
                    variant="h3"
                    className={classes.paper}
                    align="center"
                >
                  (Order #: 100005)
                </Typography>
                <Typography
                    variant="subtitle1"
                    className={classes.paper}
                    align="center"
                >
                  Estimated Delivery: July 12 by 1 pm
                </Typography>
                <div style={{ display: "flex" }}>
                  <ContinueButton />
                </div>
              </React.Fragment>
            </>
        );
      default:
        throw new Error("Unknown step");
    }
  }
  const handleDelete = id => {
    setDeleteProduct(id);
  };
  const serviceType = (type)=>{
   if (type !== servicePickUp) {
     setActiveStep(0);
     setServicePickUP(type);
   }
  }

  const scrollToMyRef = () => {
    setTimeout(()=> {
      myRef.current.scrollIntoView()
    })
  }
  return (
        <Container maxWidth="lg" className={classes.marginBottom}>
          <Typography component="h2" variant="h4">
            Checkout
          </Typography>
          <div className={classes.store}>
            <TwoComponent post={post}/>
          </div>
          {cart === null ? (
              <>
                <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    className={classes.paper}
                >
                  There are currently no items in your cart.
                </Typography>
                <ContinueButton/>
              </>
          ) :
           (activeStep === 4) ? (
                 <>
                     {getStepContent(4)}
                 </>
               ):
              ( <Grid container spacing={10} justifyContent="space-around" direction="row">
                <Grid item xs={12} lg={6} md={4} className={classes.item1}>
                  <div ref={myRef}>
                  </div>
                  <Typography component="h2" variant="h4">
                    SERVICE METHOD
                  </Typography>
                  <div style={{marginBottom: "30px"}}>
                    <Button variant={(servicePickUp) ? "contained" : "outlined"}
                            color={(servicePickUp) ? "primary" : "default"} className={classes.serviceButton}
                            onClick={() => {
                              serviceType(true)
                            }}>
                      Pickup
                    </Button>
                    <Button variant={(!servicePickUp) ? "contained" : "outlined"}
                            color={(!servicePickUp) ? "primary" : "default"} className={classes.serviceButton}
                            onClick={() => {
                              serviceType(false)
                            }}>
                      Delivery
                    </Button>
                  </div>
                  {servicePickUp ? (
                      <>
                        {(activeStep === 0 || activeStep === 1) ? (
                            <>
                              <AvailableTime props={props}/>
                              {getStepContent(0)}
                            </>
                        ) : (
                            <>
                              {getStepContent(activeStep)}
                            </>
                        )}
                      </>
                  ) : (
                      <>
                        <Stepper
                            activeStep={activeStep}
                            className={classes.stepper}
                        >
                          {steps.map(label => (
                              <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                              </Step>
                          ))}
                        </Stepper>
                        {getStepContent(activeStep)}
                      </>
                  )}

                </Grid>
                <Grid item xs={12} lg={6} md={8} className={classes.item2}>
                  <Typography component="h3" variant="h4">
                    YOUR CART
                  </Typography>
                  <Paper className={classes.paper}>
                    <CartTable
                        total={total}
                        orders={orders}
                        setOrders={setOrders}
                        deleteOrder={setDeleteProduct}
                        shipping={orderDetails.shippingCost}
                        setActiveStep={setActiveStep}
                        activeStep={activeStep}
                        cart={cart}
                        setCart={setCart}
                    />
                  </Paper>
                  <>
                    {(activeStep === 3) && (
                        <div >
                          {getStepContent(2)}
                        </div>
                    )}
                  </>
                </Grid>
              </Grid>
          )}
        </Container>
  );
}

// Total:${card.subTotal}

// <Skeleton
//     variant="rect"
//     width="100%"
//     height={300}
// />
