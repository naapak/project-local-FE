import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TwoComponent from "../components/twoComponent/TwoComponent";

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  marginBottom:{
    marginBottom: 100
  }
}));

const featuredPosts = [
  {
    title: "Ed's Market",
    date: "Nov 12",
    description:
      "Welcome to Ed's store. The products you need at the price you want!",
    image: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F428432%2Fgrocerystore.jpg&w=1200&op=resize",
    imageText: "Image Text",
    ordering: ["Pickup", "Delivery"],
    store: 123451,
    storeName: "EdMarket"
  },
  {
    title: "Farmers Market",
    date: "Nov 11",
    description:
      "Farmers Market is one place to get all your local produce.",
    image: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F428432%2Fgrocerystore.jpg&w=1200&op=resize",
    imageText: "Image Text",
    ordering: ["Pickup"],
    store: 123452,
    storeName: "FarmMarket"
  },
  {
    title: "John's Market",
    date: "Nov 12",
    description:
      "Welcome to John's Market. Your Favourite Market in Toronto.",
    image: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F428432%2Fgrocerystore.jpg&w=1200&op=resize",
    imageText: "Image Text",
    ordering: ["Delivery"],
    store: 123453,
    storeName: "EdMarket"
  },
  {
    title: "Ted Market",
    date: "Nov 11",
    description:
      "Welcome enjoy all the local produce we have to offer.",
    image: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F428432%2Fgrocerystore.jpg&w=1200&op=resize",
    imageText: "Image Text",
    ordering: ["Pickup", "Delivery"],
    store: 123454,
    storeName: "EdMarket"
  }
];

export default function HomePage() {
  const classes = useStyles();
  return (
    <>

      <Container maxWidth="lg">
        <h3>FEATURED STORES</h3>
        <Grid container spacing={4} className={classes.marginBottom}>
          {featuredPosts.map(post => (
            <TwoComponent key={post.title} post={post} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
