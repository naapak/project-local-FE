import React, { useEffect, useState, useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StoreBanner from "../components/StoreBanner";
import { LoginContext } from "../contexts/LoginContext";
import { fetchGet } from "../utils/ApiFetching";

import ProductsList from "../components/ProductsList";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const prodcuts = require("../mockData/products.json");

const useStyles = makeStyles(theme => ({
  fontweight: {
    fontWeight: 500
  },
  padding: {
    paddingTop: "60px",
    paddingBottom: "60px"
  },
  padding20: {
    paddingTop: "20px"
  },
  underline: {
    textDecoration: "underLine"
  },
  paddingBottom: {
    paddingTop: "20px",
    paddingBottom: "20px"
  },
  search: {
    marginTop: 40,
    position: "absolute",
    borderRadius: 5,
    backgroundColor: "white",
    border: "1px solid darkgrey",
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "90%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "50%"
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(1),
      width: "40%"
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(1),
      width: "30%"
    },
    [theme.breakpoints.up("xlg")]: {
      marginLeft: theme.spacing(1),
      width: "20%"
    },
    display: "flex"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  closeIcon: {
    paddingRight: "10px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "&:hover": {
      color: "grey"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0), // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: '12ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
  },
  posts: {
    paddingTop: 100,
    marginBottom: "200px"
  },
  productHeader :{
    padding: "20px 0",
    fontWeight: "bold"
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const storeInformation = {
  title: "Ed's Market",
  description: "Welcome to Ed's store. The products you need at the price you want!",
  Address: "123 Main Street",
  Address2: "Niagara Falls, A1B 2C3",
  image: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F428432%2Fgrocerystore.jpg&w=1200&op=resize",
  imageText: "Ed Market",
  ordering: ["Pickup", "Delivery"]
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function SingleStore() {
  const classes = useStyles();
  const { storeName } = useParams();
  const productid = "";
  const props = useContext(LoginContext);
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);

  let [newProducts, setNewProducts] = useState(prodcuts);
  let cart = localStorage.getItem("cart");

  if (cart !== null) {
     cart = JSON.parse(cart);
    console.log("new cart Value",cart);
  }

  useEffect(() => {
    if (productid !== null) {
      setLoading(true);
      fetchGet(`/shop/items/${productid}`).then((res, err) => {
        if (typeof res === "object") {
          setData([res.item]);
          setLoading(false);
        }
      });
    }
  }, []);

  const handleClick = event => {
    if (currentImage !== event) {
      setCurrentImage(event);
    }
  };
  // const addtoCart = () => {
  //   const cart = localStorage.getItem("cart");
  //   let orders = {};
  //
  //   if (cart === null) {
  //     orders[productid] = 1;
  //     orders.total = 1;
  //   } else {
  //     orders = JSON.parse(cart);
  //     if (orders[productid]) {
  //       orders[productid] = orders[productid] + 1;
  //     } else {
  //       orders[productid] = 1;
  //     }
  //     orders.total += 1;
  //   }
  //
  //   localStorage.setItem("cart", JSON.stringify(orders));
  //   props.setCart(orders);
  //
  //   // history.push("/checkout");
  // };
  const handleSearchData = event => {
    setSearch(event.target.value);
    filterData(event.target.value);
  };
  const clearSearch = () => {
    setSearch("");
    setNewProducts(prodcuts);
  };

  const filterData = (key) =>{
    let data = [];
    prodcuts.forEach((prod) => {
      const keys = Object.keys(prod)[0];
      let newArray = prod[keys].filter(prod => {
        console.log(prod["title"].toLowerCase(),key.toLowerCase() , prod["title"].toLowerCase().indexOf(key.toLowerCase()))
        return prod["title"].toLowerCase().indexOf(key.toLowerCase()) !== -1;
      });
      let obj = {}
      obj[keys]= newArray;
      data.push(obj);
    });
    setNewProducts(data);
    console.log(newProducts);
  };
  const closeSnackBar =() => {
    setOpen(false);
  }

  return (
    <Container maxWidth="lg">
      <StoreBanner post={storeInformation} />
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search"
          fullWidth
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={event => handleSearchData(event)}
          type="string"
          value={search}
        />
        {search.length > 0 && (
          <Link onClick={clearSearch} className={classes.closeIcon}>
            <Icon>close</Icon>
          </Link>
        )}
      </div>
      <div className={classes.posts}>
        {newProducts.map(product => {
          const keys = Object.keys(product)[0];
          return (
              <>
                {product[keys].length > 0 &&
                 <Typography component="h2" variant="h4" className={classes.productHeader}>
                  {keys.toUpperCase()}
                </Typography>
               }
                <Grid container spacing={3}>
                  {product[keys].map(prod => {
                   if (cart && cart.hasOwnProperty(prod.sku)) {
                     prod["qty"]= cart[prod.sku]
                   } else {
                     prod["qty"]= 0;
                   }
                    return <ProductsList key={prod.title} post={prod} setOpen={setOpen}/>;
                  })}
                </Grid>
              </>
          );
        })}
      </div>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={3000}
          onClose={closeSnackBar}
      >
        <Alert onClose={closeSnackBar} severity="success">
          Your product is adeed to the cart!
        </Alert>
      </Snackbar>
    </Container>
  );
}
