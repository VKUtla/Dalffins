//Author: Divyashree Bangalore Subbaraya (B00875916)
import { React, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import { TextField, InputAdornment } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory, useLocation } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

    inside: {
        paddingRight: "10px",
        paddingLeft: "17px",
        width: "70%",
        display: "flex",
        flexDirection: "row",
        marginTop: "0",
        marginRight: "auto",
        marginBottom: "0",
        marginLeft: "auto"
    },

    mainContainer: {
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        height: "80%",
        alignItems: "center",
        position: "relative",
        flexDirection: "column"
    },
    personPin: {
        height: '40%',
        width: '40%',
        marginLeft: '30%'
    },
    typoText: {
        textAlign: 'center',
        marginBottom: '7%'
    },
    typo: {
        fontSize: "15px",
        textAlign: 'center',
        marginBottom: '7%'
    },
    continueButton: {
        textTransform: 'none',
        float: 'center',
        padding: "2%",
        width: '100px',
        marginLeft: '30%'
    },
    card: {
        margin: '3%',
        height: '100%'
    },
    cardMedia: {
        height: '449px',
        width: '590px'
    },
    section: {
        paddingTop: '5%'
    }
}))

function ForgotPasswordEnterCode() {

    const classes = useStyles()

    const history = useHistory()

    const location = useLocation()

    // Defining variables and states for forgot password enter code page functioning
    const [enteredOtp, setEnteredOTP] = useState(0)

    const [actualOtp, setActualOTP] = useState(0)

    const [email, setEmail] = useState('')

    const [errorSnackbar, setErrorSnackBar] = useState(false)

    const [snackBar, setSnackBar] = useState(false)

    const handleSuccessSnackBar = () => {
        setSnackBar(false)
    }

    useEffect(() => {
        const enterCode = () => {
            if (location.state) {
                if (location.state.Email === "") {
                    history.push('/forgotPassword', {})
                }
                setActualOTP(location.state.ActualOTP)
                setEmail(location.state.Email)
                setSnackBar(location.state.passwordEntry)
                history.replace('/forgotPasswordEnterCode', {})
            }
            else {
                history.push('/forgotPassword', {})
            }
        }
        enterCode()
    }, [])

    const handleOTPChange = (e) => {
        setEnteredOTP(e.target.value)
    }

    const handleSnackBar = () => {
        setErrorSnackBar(false)
    }

    const handleClickOnCheckOTP = (e) => {
        e.preventDefault()
        // Check if the entered otp matches with the actual otp
        if (actualOtp === parseInt(enteredOtp)) {
            history.push("/resetPassword", { 'Email': email })
        }
        else {
            setErrorSnackBar(true)
        }
    }

    // Render the forgot password enter code page
    return (
        <section className={classes.section}>
            <Container component="main" maxWidth="md" className={classes.mainContainer}>
                <Paper elevation={5} className={classes.inside}>

                    <form onSubmit={handleClickOnCheckOTP}>
                        <Grid item xs={12} sm={12}>
                            <PersonPinIcon color="primary" className={classes.personPin} />
                            <Typography variant="h5" className={classes.typoText} >
                                Forgot Password?
                            </Typography>
                            <Typography variant="h6" className={classes.typo}>
                                Enter the authentication code received on your registered email ID to reset your password.
                            </Typography>
                        </Grid>

                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    name="OTP"
                                    id="otp"
                                    label="OTP"
                                    fullWidth
                                    size="small"
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleOTPChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit"
                                    color="primary"
                                    variant="contained"
                                    className={classes.continueButton}
                                >
                                    Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Card className={classes.card} md={2}>
                        <CardMedia
                            image="images/tiffinsImage.jpg"
                            title="Tiffins image"
                            className={classes.cardMedia}
                        />
                    </Card>
                    <Snackbar open={snackBar} autoHideDuration={6000} onClose={handleSuccessSnackBar}>
                        <MuiAlert elevation={6} variant="filled" onClose={handleSuccessSnackBar} severity="success">
                            An OTP has been sent to your registered email ID!
                        </MuiAlert>
                    </Snackbar>
                    <Snackbar open={errorSnackbar} autoHideDuration={6000} onClose={handleSnackBar}>
                        <MuiAlert elevation={6} variant="filled" onClose={handleSnackBar} severity="error">
                            Invalid OTP Code!
                        </MuiAlert>
                    </Snackbar>
                </Paper>
            </Container>
        </section>
    )
}

export default ForgotPasswordEnterCode;