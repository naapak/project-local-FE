import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles(theme => ({
  description: {
    paddingBottom: 10
  },
  cardMedia: {
    height: "250px"
  },
  icon: {
    alignSelf: "center"
  },
  displayFlex: {
    display: "flex"
  },
  checkIcon: {
    alignSelf: "center",
    paddingRight: "2px",
    color: "green"
  },
  delveryText: {
    margin: "0px !important",
    fontSize: "small"
  },
  orders: {
    marginLeft: 100
  },
  [theme.breakpoints.down("sm")]: {
    orders: {
      marginLeft: 20
    }
  }
}));

export default function StoreBanner(props) {
  const classes = useStyles();
  const { post } = props;
  return (
    <Grid item>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={post.image}
          title={post.imageTitle}
        />
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" paragraph className={classes.description}>
              {post.description}
            </Typography>
            <div className={classes.displayFlex}>
              <div className={classes.address}>
                <Typography
                  variant="subtitle1"
                  paragraph
                  className={classes.delveryText}
                >
                  {post.Address}
                </Typography>
                <Typography
                  variant="subtitle1"
                  paragraph
                  className={classes.delveryText}
                >
                  {post.Address2}
                </Typography>
              </div>
              <div className={classes.orders}>
                {post.ordering.map((item, i) => (
                  <div className={classes.displayFlex} key={i}>
                    <CheckCircleIcon
                      className={classes.checkIcon}
                      fontSize="small"
                    />
                    <Typography
                      variant="subtitle1"
                      paragraph
                      className={classes.delveryText}
                    >
                      {item}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

StoreBanner.propTypes = {
  post: PropTypes.object
};
