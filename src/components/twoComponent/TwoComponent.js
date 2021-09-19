import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles({
  card: {
    display: "flex",
    height: "250px"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    flex: 1
  },
  icon: {
    alignSelf: "center"
  },
  delivery: {
    display: "flex"
  },
  checkIcon: {
    alignSelf: "center",
    paddingRight: "2px",
    color: "green"
  },
  delveryText: {
    margin: "2px !important",
    fontSize: "small"
  }
});

export default function TwoComponent(props) {
  const classes = useStyles();
  const { post } = props;
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={`/store/${post.storeName}`}>
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
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              {post.ordering && post.ordering.map((item, i) => (
                <div className={classes.delivery}>
                  <CheckCircleIcon
                    className={classes.checkIcon}
                    fontSize="small"
                  />
                  <p key={i} className={classes.delveryText}>
                    {item}
                  </p>
                </div>
              ))}
            </CardContent>
          </div>
          <ChevronRightIcon className={classes.icon} />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

TwoComponent.propTypes = {
  post: PropTypes.object
};
