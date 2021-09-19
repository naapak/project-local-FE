import IconButton from "@material-ui/core/IconButton";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React, {useContext, useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  flex2: {
    display: "flex",
    alignItems: "flex-start"
  },
  priceText: {
    padding: 3,
    fontSize: "12px"
  },
    biggerText:{
        paddingTop: 7,
        fontSize: "18px"
    }
});

export default function AddRemoveProducts(props) {
  const classes = useStyles();
  const addtoCart = (event, sku) => {
    if (props.post.qty !== 0) {
      props.pushtoCart(sku, false, props.post.qty - 1);
    }
      // props.setOpen(true);
  };

  return (
    <div className={classes.flex2}>
      <IconButton
        color="primary"
        aria-label="negative"
        size={props.biggerFont? "medium" :"small"}
        onClick={() => addtoCart(false, props.post && props.post.sku)}
      >
        <RemoveCircleOutlineIcon fontSize={props.biggerFont? "default" :"small"} />
      </IconButton>
      <Typography variant="subtitle1" paragraph className={props.biggerFont? classes.biggerText : classes.priceText}>
        {props.post.qty}
      </Typography>
      <IconButton
        color="primary"
        aria-label="positive"
        size={props.biggerFont? "medium" :"small"}
        onClick={() => {props.pushtoCart(props.post && props.post.sku, true, props.post.qty + 1);
            if(props.setOpen) {
                props.setOpen(true)
            }

        }}
      >
        <AddCircleOutlineIcon fontSize={props.biggerFont? "default" :"small"}  />
      </IconButton>
    </div>
  );
}
