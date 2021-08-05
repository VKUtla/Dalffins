//Author: Divyashree Bangalore Subbaraya (B00875916)
import { React, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import { TextField, InputAdornment } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import emailJSDetails from '../../utils/email';
import * as emailjs from 'emailjs-com';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { emailCheck } from "../../utils/Api";

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
        height: "100%",
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
    getCode: {
        textTransform: 'none',
        float: 'center',
        padding: "2%",
        width: '100px',
        marginLeft: '35%',
        alignItems: "center",
        justifyContent: "center"
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

}));

function ForgotPasswordGetCode(props) {

    const history = useHistory();

    const classes = useStyles();

    // Defining variables and states for Password get Code page functioning
    const [email, setEmail] = useState('')

    const [error, setError] = useState({
        errorSnackbar: false
    });

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleClickOnGetCode = (e) => {
        e.preventDefault();

        //POST API call to check if the email entered is registered one or not.
        emailCheck({
            email: email
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.status === 200) {
                    // If the user is a registered user
                    props.setUserId(response.data.id)
                    const randomNumber = Math.floor(1000 + Math.random() * 9000);

                    //email js send function to send email with otp to registered user
                    emailjs.send(emailJSDetails.serviceId, emailJSDetails.templateID, {
                        to_name: response.data.firstName,
                        otp: randomNumber,
                        to_email: response.data.email,
                        reply_to: "otpdalffins@gmail.com",
                    }, emailJSDetails.userId).then((result) => {
                        history.push("/forgotPasswordEnterCode", { 'ActualOTP': randomNumber, passwordEntry: true, 'Email': response.data.email })
                    },
                        (error) => {
                            alert("An error occurred, Please try again", error.text);
                            history.push('/forgotPassword')
                        });
                }
            }).catch(function (error) {
                // In case of error, return error snack bars
                setError(pre => ({ ...pre, errorSnackbar: true }))
            })
    }

    const handleErrorSnackBar = () => {
        setError(pre => ({ ...pre, snackbar: false }))
    }

    // Render the forgot password get page
    return (
        <section className={classes.section}>

            <Container component="main" maxWidth="lg" className={classes.mainContainer}>

                <Paper elevation={6} className={classes.inside}>
                    <form onSubmit={handleClickOnGetCode}>
                        <Grid item xs={12} sm={12}>
                            <PersonPinIcon color="primary" className={classes.personPin} />
                            <Typography variant="h5" className={classes.typoText}>
                                Forgot Password?
                            </Typography>
                            <Typography variant="h6" className={classes.typo}>
                                Enter the email ID associated with Dalffins account and we will send an email notification to reset your password.
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
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
                                        )
                                    }}
                                    onChange={handleEmailChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button type="submit"
                                    color="primary"
                                    variant="contained"
                                    className={classes.getCode}
                                >
                                    Get Code
                                </Button>
                                <Snackbar open={error.errorSnackbar} autoHideDuration={6000} onClose={handleErrorSnackBar}>
                                    <MuiAlert elevation={6} variant="filled" onClose={handleErrorSnackBar} severity="error">
                                        Email ID not registered! You can register <Link to="/signUp" style={{ color: "white" }}> here </Link>
                                    </MuiAlert>
                                </Snackbar>
                            </Grid>
                        </Grid>
                    </form>

                    <Card className={classes.card} md={6}>
                        <CardMedia
                            image="images/tiffinsImage.jpg"
                            title="Tiffins image"
                            className={classes.cardMedia}
                        />
                    </Card>
                </Paper>
            </Container>
        </section>
    );
}

export default ForgotPasswordGetCode;