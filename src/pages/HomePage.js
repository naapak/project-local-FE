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
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
    ordering: ["Pickup", "Delivery"],
    store: 123451,
    storeName: "EdMarket"
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
    ordering: ["Pickup"],
    store: 123452,
    storeName: "EdMarket"
  },
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
    ordering: ["Delivery"],
    store: 123453,
    storeName: "EdMarket"
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
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
