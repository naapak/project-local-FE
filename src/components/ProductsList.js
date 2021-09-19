import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { LoginContext } from "../contexts/LoginContext";
import AddRemoveProducts from "./AddRemoveProducts";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextTruncate from "react-text-truncate";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import TwoComponent from "./twoComponent/TwoComponent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  card: {
    display: "flex",
    height: 165,
    position: "relative"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: "40%",
    height: 140,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: "#fafafa"
    },
  },
  delivery: {
    display: "flex"
  },
  delveryText: {
    fontSize: "12px",
    marginBottom: 0
  },
  title: {
    fontWeight: "bold"
  },
  flex: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between"
  },
  absoluteBottom: {
    // position: "absolute",
    // bottom: 0
  },
  flex2: {
    display: "flex",
    alignItems: "flex-start"
  },
  priceText: {
    padding: 3,
    fontSize: "12px",
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: "#fafafa"
    },
  },
  sizeText:{
    fontSize: "12px",

  },
  dialogBoxFlex:{
    display: "flex",
    justifyContent: "space-between"
  },
  dialogBoxPrice:{
    marginBottom: 0
  },
  dialogBoxMedia: {
    height: "250px",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative"
  },
  dialogCloseButton:{
    position: "absolute",
    right: 0,
    // backgroundColor: "white",
    zIndex:200
  },
  dialogBoxContent:{
    margin:20
  },
  marginBottom:{
    marginBottom:10
  }
});

export default function ProductsList(props) {
  const [value, setValue] = useState(props.post.qty);
  const [openDialogBox, setOpenDialogBox] = React.useState(false);
  const loginContext = useContext(LoginContext);

  const addtoCart = (event, sku) => {
    if (event) {
      setValue(value + 1);
      pushtoCart(sku, true, value + 1);
    } else if (value !== 0) {
      setValue(value - 1);
      pushtoCart(sku, false, value - 1);
    }
  };
  const openDialogBoxClick = () =>{
    setOpenDialogBox(true)
  }
  const closeDialogBoxClick =()=>{
    setOpenDialogBox(false)
  }

  const pushtoCart = (productid, addProductToCart, qty) => {
    console.log("I am calling this", qty);
    let orders = {};
    const cart = localStorage.getItem("cart");
    if (cart === null) {
      orders[productid] = qty;
      orders.total = qty;
    } else if (addProductToCart) {
      orders = JSON.parse(cart);
      if (orders[productid]) {
        orders[productid] = qty;
      } else {
        orders[productid] = qty;
      }
      orders.total += 1;
    } else {
      orders = JSON.parse(cart);
      if (qty > 0) {
        orders[productid] = qty;
      } else {
        console.log("I am calling this");
        delete orders[productid];
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

  const classes = useStyles();
  const { post } = props;
  return (
    <Grid item xs={12} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={post.image}
          title={post.imageText}
          onClick={()=>openDialogBoxClick()}
        />
        <div className={classes.cardDetails}>
          <CardContent>
            <CardActionArea onClick={()=>openDialogBoxClick()} className={classes.zIndex200}>
            <Typography component="h6" className={classes.title}>
              <TextTruncate
                  line={1}
                  text={post.title? post.title:"" }
                  truncateText="…"
              />
            </Typography>
            <Typography
              variant="subtitle1"
              paragraph
              className={classes.delveryText}
            >
              <TextTruncate
                  line={2}
                  text={post.description? post.description:"" }
                  truncateText="…"
              />
            </Typography>
              <Typography
                  variant="subtitle1"
                  paragraph
                  className={classes.sizeText}
              >
                Size: {post.size}
              </Typography>
            </CardActionArea>
            <div className={classes.absoluteBottom}>
              <div className={classes.flex}>
                <Typography
                  variant="subtitle1"
                  paragraph
                  className={classes.priceText}
                  onClick={openDialogBoxClick}
                >
                  $ {post.price}
                </Typography>
                <AddRemoveProducts post={post} setOpen={props.setOpen} pushtoCart={pushtoCart} />
              </div>
            </div>
          </CardContent>
        </div>

      </Card>
      {/*<Dialog onClose={closeDialogBoxClick} aria-labelledby="dialogbox" open={openDialogBox}>*/}
      {/*  /!*<DialogTitle id="customized-dialog-title" onClose={closeDialogBoxClick}>*!/*/}
      {/*  /!*  <Box display="flex" alignItems="center">*!/*/}

      {/*  /!*    <Box>*!/*/}
      {/*  /!*      <IconButton onClick={closeDialogBoxClick}>*!/*/}
      {/*  /!*        <CloseIcon />*!/*/}
      {/*  /!*      </IconButton>*!/*/}
      {/*  /!*    </Box>*!/*/}
      {/*  /!*  </Box>*!/*/}
      {/*  /!*</DialogTitle>*!/*/}
      {/*  <CardMedia*/}
      {/*      className={classes.dialogBoxMedia}*/}
      {/*      image={post.image}*/}
      {/*      title={post.imageTitle}*/}
      {/*  />*/}
      {/*  <IconButton onClick={closeDialogBoxClick}>*/}
      {/*    <CloseIcon />*/}
      {/*  </IconButton>*/}

      {/*  <DialogContent >*/}
      {/*    <Typography component="h4" className={classes.title}>*/}
      {/*      {post.title}*/}
      {/*    </Typography>*/}
      {/*    </DialogContent >*/}
      {/*    <DialogContent  divider>*/}

      {/*    <Typography*/}
      {/*        variant="subtitle1"*/}
      {/*        paragraph*/}
      {/*    >*/}
      {/*      {post.description}*/}
      {/*    </Typography>*/}
      {/*    <div>*/}
      {/*      <div className={classes.dialogBoxFlex}>*/}
      {/*        <Typography*/}
      {/*            variant="subtitle1"*/}
      {/*            paragraph*/}
      {/*            onClick={openDialogBoxClick}*/}
      {/*            className={classes.dialogBoxPrice}*/}
      {/*        >*/}
      {/*          Price: $ {post.price}*/}
      {/*        </Typography>*/}
      {/*        <AddRemoveProducts post={post} setOpen={props.setOpen} pushtoCart={pushtoCart} />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}

      {/*</Dialog>*/}

      <Dialog onClose={closeDialogBoxClick} aria-labelledby="dialogbox" open={openDialogBox}>
            <IconButton onClick={closeDialogBoxClick} className={classes.dialogCloseButton} color={"inherit"}>
              <CloseIcon />
            </IconButton>
            <CardMedia
                className={classes.dialogBoxMedia}
                image={post.image}
                title={post.imageText}
            />
              <CardContent className={classes.dialogBoxContent}>
                <Typography component="h3" variant="h5"  className={classes.marginBottom}>
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.description}
                </Typography>
                <div className={classes.absoluteBottom}>
                  <div className={classes.dialogBoxFlex}>
                    <div>
                      <Typography
                          variant="subtitle1"
                          paragraph
                          className={classes.dialogBoxPrice}
                      >
                        Price: $ {post.price}
                      </Typography>
                      <Typography
                          variant="subtitle1"
                          paragraph
                          className={classes.dialogBoxPrice}
                      >
                        Size: {post.size}
                      </Typography>
                    </div>
                    <AddRemoveProducts post={post} setOpen={props.setOpen} pushtoCart={pushtoCart} biggerFont={true}/>
                  </div>
                </div>
              </CardContent>
      </Dialog>
    </Grid>
  );
}

ProductsList.propTypes = {
  post: PropTypes.object
};
