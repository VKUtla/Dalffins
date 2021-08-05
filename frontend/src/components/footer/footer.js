//Author: Divyashree Bangalore Subbaraya (B00875916)
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typoText: {
    flexGrow: 1,
    fontSize: "14px",
    color: "white",
  },
  footerBar: {
    top: "auto",
    bottom: 0,
  },
}));

export default function Footer({ userEmail }) {

  const classes = useStyles();

  const history = useHistory();

  const onHelpClickHandler = () => {
    history.push("/help");
  };

  // Navigation to FAQ page
  const handleFaq = () => {
    history.push('/faq')
  }

  // Navigation to About page
  const handleAbout = () => {
    history.push('/about')
  }

  // Navigation to Contact page
  const handleContact = () => {
    history.push('/contact')
  }

  // Render Buttons on the footer bar
  return (
    <div className={classes.root}>
      <AppBar className={classes.footerBar}>
        <Toolbar>
          <Typography variant="caption" className={classes.typoText}>
            Copyright © 2021 Dalffins. All rights reserved.
          </Typography>

          <Button color="inherit" onClick={handleFaq}>FAQs</Button>
          <Button color="inherit" onClick={handleAbout}>About Us</Button>
          <Button color="inherit" onClick={handleContact}>Contact Us</Button>
          {userEmail && userEmail.length > 0 && !localStorage.getItem('isAdmin') ? (
            <Button color="inherit" onClick={onHelpClickHandler}>
              Help
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
