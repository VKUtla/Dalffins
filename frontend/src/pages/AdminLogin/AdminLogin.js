//Author: Jay Patel (B00881906)
import React, { Component } from "react";
import "./AdminLogin.scss";
import Button from "@material-ui/core/Button";
import { Redirect, withRouter } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { IconButton, Paper } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import EmailIcon from "@material-ui/icons/Email";
import PersonPinIcon from "@material-ui/icons/PersonPin";

class AdminLogin extends Component {
  state = {
    isLoading: true,
    displayPassword: false,
    errorSnackbar: false,
    error: {
      email: false,
      password: false,
    },
    details: {
      email: "",
      password: "",
    },
  };

  handleEmailChange = (e) => {
    // validate email address
    const { name, value } = e.target;
    if (value.match(/^\S+@\S+\.\S{2,}$/)) {
      this.setState((pre) => ({ error: { ...pre.error, [name]: false } }));
      this.setState((pre) => ({ details: { ...pre.details, [name]: value } }));
    } else {
      this.setState((pre) => ({ error: { ...pre.error, [name]: true } }));
    }
  };

  handlePasswordChange = (e) => {
    // set password change
    e.preventDefault();
    const { name, value } = e.target;
    this.setState((pre) => ({ details: { ...pre.details, [name]: value } }));
  };

  handleClickOnSubmit = (e) => {
    // handle submit on click event
    e.preventDefault();
    const { error, details } = this.state;
    for (const [, value] of Object.entries(error)) {
      if (value) {
        return;
      }
    }

    if (
      details.email === "admin@dalffins.com" &&
      details.password === "admin@dalffins"
    ) {
      localStorage.setItem("isAdmin", true);
      this.props.setFirstName("Admin");
      this.props.setEmail("admin@dalffins.com");
      this.props.history.push("/admin/help");
    } else {
      this.setState({ errorSnackbar: true });
    }
  };

  handleCheckedSnackBar = () => {
    this.setState({ errorSnackbar: false });
  };

  render() {
    const { error, details, displayPassword, errorSnackbar } = this.state;

    return (
      <div className="admin-support-login-container container">
        <Container component="main" maxWidth="sm" className="mainContainer">
          <Paper elevation={5} className="paper">
            <form onSubmit={this.handleClickOnSubmit}>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant="h5"
                  style={{ textAlign: "center", marginBottom: "10%" }}
                >
                  Admin Login
                </Typography>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    name="email"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    size="small"
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={this.handleEmailChange}
                    error={error.email}
                    helperText={error.email ? "Incorrect email id!" : ""}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="password"
                    variant="outlined"
                    id="password"
                    label="Password"
                    type={displayPassword ? "text" : "password"}
                    fullWidth
                    required
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            label="visibility of passwords"
                            onClick={() => {
                              this.setState({
                                displayPassword: !displayPassword,
                              });
                            }}
                          >
                            {displayPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                    }}
                    onChange={this.handlePasswordChange}
                    error={error.password}
                    helperText={error.password ? "Incorrect password!" : ""}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={{
                      textTransform: "none",
                      float: "center",
                      padding: "2%",
                      width: "100px",
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Snackbar
              open={errorSnackbar}
              autoHideDuration={6000}
              onClose={this.handleCheckedSnackBar}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={this.handleCheckedSnackBar}
                severity="error"
              >
                Invalid Login Credentials!
              </MuiAlert>
            </Snackbar>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default withRouter(AdminLogin);
