//Author: Divyashree Bangalore Subbaraya (B00875916)
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import 'react-phone-input-2/lib/bootstrap.css'
import { IconButton, Paper } from '@material-ui/core';
import { TextField, InputAdornment } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { resetPassword } from "../../utils/Api";

const useStyles = makeStyles((theme) => ({

    inside: {
        paddingRight: "15px",
        paddingLeft: "17px",
        display: "flex",
        flexDirection: "row",
        marginTop: "0",
        marginRight: "auto",
        marginBottom: "0",
        marginLeft: "auto",
        width: "100%"
    },

    mainContainer: {
        padding: "45px",
        display: "flex",
        justifyContent: "center",
        height: "60%",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: '5%'
    },

    personPin: {
        height: '60%',
        width: '60%',
        marginLeft: '20%'
    },

    typoText: {
        textAlign: 'center',
        marginBottom: '20%'
    },

    button: {
        textTransform: 'none',
        marginLeft: '27%',
        marginBottom: '17%'
    },

    card: {
        margin: '3%',
        height: '100%'
    },

    cardMedia: {
        height: '449px',
        width: '550px'
    },

    section: {
        paddingTop: '5%'
    }

}));

function ResetPassword(props) {

    const classes = useStyles();

    // Defining variables and states for Reset password functioning
    const [password, setPassword] = useState("")

    const [displayPassword, setDisplayPassword] = useState(false)

    const [email, setEmail] = useState("")

    const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false)

    const history = useHistory();

    const location = useLocation();

    useEffect(() => {
        const reset = () => {
            if (location.state) {
                if (location.state.Email === "") {
                    history.push('/forgotPassword', {})
                }
                setEmail(location.state.Email);
                history.replace('/resetPassword', {})
            }
            else {
                history.push('/forgotPassword', {})
            }
        }
        reset();
    }, []);

    const [error, setError] = useState({
        password: false,
        confirmPassword: false,
    });

    const handleClickOnSubmit = (e) => {
        e.preventDefault()
        for (const [, value] of Object.entries(error)) {
            if (value) {
                return
            }
        }

        //PUT API call to update the user's password
        resetPassword({
            email: email,
            password: password
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.status === 200) {
                    // Password reset success
                    props.setUserId(response.data.id)
                    history.push("/home", { reset: true })
                }
            });
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        if (password.match('^[a-zA-Z0-9!@#$&()\\-`.+,/"]*$')) {
            if (password.length + 1 > 7) {
                setError(pre => ({ ...pre, [name]: false }))
            }
            else {
                setError(pre => ({ ...pre, [name]: true }))
            }
        }
        setPassword(value)
    }

    const handleConfirmPasswordChange = (e) => {
        const { name, value } = e.target;
        if (password === value) {
            setError(pre => ({ ...pre, [name]: false }))
        }
        else {
            setError(pre => ({ ...pre, [name]: true }))
        }
    }

    const handlePasswordClickChange = () => {
        setDisplayPassword(!displayPassword)
    }

    const handleConfirmPasswordClickChange = () => {
        setDisplayConfirmPassword(!displayConfirmPassword)
    }

    // Render the Reset password page
    return (
        <section className={classes.section}>

            <Container component="main" maxWidth="sm" className={classes.mainContainer}>
                <Paper elevation={6} className={classes.inside}>
                    <Card className={classes.card}>
                        <CardMedia
                            image="images/tiffinsImage.jpg"
                            title="Tiffins image"
                            className={classes.cardMedia}
                        />
                    </Card>
                    <form onSubmit={handleClickOnSubmit}>

                        <Grid item xs={12} md={12}>
                            <PersonPinIcon color="primary" className={classes.personPin} />
                            <Typography variant="h6" className={classes.typoText}>
                                Reset Password
                            </Typography>
                        </Grid>

                        <Grid container spacing={6}>

                            <Grid item xs={12} md={12}>
                                <TextField
                                    name="password"
                                    variant="outlined"
                                    id="password"
                                    label="Password"
                                    type={displayPassword ? "text" : "password"}
                                    fullWidth
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    label="visibility of passwords"
                                                    onClick={handlePasswordClickChange}
                                                >
                                                    {displayPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    onPaste={(e) => { e.preventDefault() }}
                                    onChange={handlePasswordChange}
                                    error={error.password}
                                    helperText={error.password ? 'Minimum of 8 characters!' : ''}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <TextField
                                    variant="outlined"
                                    name="confirmPassword"
                                    id="confirm-password"
                                    label="Confirm Password"
                                    type={displayConfirmPassword ? "text" : "password"}
                                    fullWidth
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    label="visibility of passwords"
                                                    onClick={handleConfirmPasswordClickChange}
                                                >
                                                    {displayConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleConfirmPasswordChange}
                                    error={error.confirmPassword}
                                    helperText={error.confirmPassword ? 'Passwords do not match' : ''}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Button type="submit"
                                    color="primary"
                                    variant="contained"
                                    className={classes.button}
                                    onClick={handleClickOnSubmit}>
                                    Reset Password
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </section>
    )
}

export default ResetPassword;