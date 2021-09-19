/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "./footerStyle.js";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

const useStyles = makeStyles(styles);


export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });

  return (
    <footer className={footerClasses}>
      <Container maxWidth="xl">
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                  href="/"
                  className={classes.block}
                  target="_blank"
              >
                <FacebookIcon />
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                  href="/"
                  className={classes.block}
                  target="_blank"
              >
                < InstagramIcon/>
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
                target="_blank"
              >
                <EmailIcon />  
              </a>
            </ListItem>
          </List>
          </div>
          <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
                target="_blank"
              >
                Terms of Service
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
                target="_blank"
              >
                Privacy policy
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
                target="_blank"
              >
                Contact
              </a>
            </ListItem>
          </List>
          </div>
        <div className={classes.right}>
          Copyright &copy; {1900 + new Date().getYear()}  {"Project Local "}
        <InsertEmoticonIcon className={classes.icon} />
        </div>
        </Container>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
