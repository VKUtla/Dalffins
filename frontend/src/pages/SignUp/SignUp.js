//Author: Divyashree Bangalore Subbaraya (B00875916)
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MuiPhoneNumber from 'material-ui-phone-number';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import 'react-phone-input-2/lib/bootstrap.css';
import { IconButton, Paper } from '@material-ui/core';
import { TextField, InputAdornment } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { saveUser } from "../../utils/Api";

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingRight: '13px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '0',
        marginRight: 'auto',
        marginBottom: '0',
        marginLeft: 'auto'
    },

    mainContainer: {
        padding: "40px",
        display: 'flex',
        justifyContent: 'center',
        height: '80%',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column',
        marginBottom: '5%'
    },

    card: {
        margin: '3%',
        height: '100%'
    },

    cardMedia: {
        height: '649px',
        width: '1020px'
    },

    section: {
        paddingTop: '5%'
    },

    personPin: {
        height: '30%',
        width: '30%',
        marginLeft: '30%'
    },

    typoText: {
        textAlign: 'center',
        marginBottom: '3%'
    },

    typoTextAccount: {
        fontSize: '15px',
        textAlign: 'center',
        marginLeft: '2%',
        paddingBottom: '3%'
    },

    typoCaption: {
        fontSize: '14px'
    },

    registerButton: {
        textTransform: 'none',
        float: 'right',
        width: '200px',
        margin: '2%'
    }

}));

function SignUp(props) {

    const classes = useStyles();

    // Defining variables and states for SignUp functioning
    const [password, setPassword] = useState("");

    const [displayPassword, setDisplayPassword] = useState(false)

    const [errorSnackMessage, setErrorSnackMessage] = useState('Invalid !! Try again');

    const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false)

    const history = useHistory();

    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
        checkedBox: false,
        phoneNumber: false,
        errorSnackbar: false
    });

    const [detail, setDetail] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        snackbar: false,
        checkbox: false,
        password: ''
    });

    const handleClickOnSubmit = (e) => {
        e.preventDefault()
        for (const [, value] of Object.entries(error)) {
            if (value) {
                return
            }
        }
        if (!detail.checkbox) {
            setError(pre => ({ ...pre, checkedBox: true }))
            return
        }

        //POST API call to register a new user to Dalffins. 
        saveUser({
            email: detail.email,
            password: detail.password,
            firstName: detail.firstName,
            lastName: detail.lastName,
            phoneNumber: detail.phoneNumber
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.status === 200) {

                    // On Successful user registration
                    localStorage.setItem('token', response.data.token);
                    props.setUserId(response.data._id)
                    props.setFirstName(response.data.firstName)
                    props.setEmail(response.data.email)
                    props.setUserToken(localStorage.getItem('token'))
                    setDetail(pre => ({ ...pre, snackbar: true }))
                    history.push("/home", { register: true })
                }
            }).catch(function (error) {
                console.log(error)
                //Since email ID is a primary key, if duplicate email ID found, error is thrown.
                setErrorSnackMessage(error.response.data.message)
                setError(pre => ({ ...pre, errorSnackbar: true }))
            })
    }

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        if (!value.match(/^[a-zA-Z0-9]+(?:[\s.]+[a-zA-Z0-9]+)*$/)) {
            setError(pre => ({ ...pre, [name]: true }))
        }
        else {
            setError(pre => ({ ...pre, [name]: false }))
        }
        setDetail(pre => ({ ...pre, [name]: value }))
    }

    const handlePhoneNumberChange = (e) => {
        const { name, value } = e.target;
        if (!value.match(/^\s*(?:\+?([1]))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)) {
            setError(pre => ({ ...pre, [name]: true }))
        }
        else {
            setError(pre => ({ ...pre, [name]: false }))
        }
        setDetail(pre => ({ ...pre, [name]: value }))
    }

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        if (value.match(/^\S+@\S+\.\S+$/)) {
            setError(pre => ({ ...pre, [name]: false }))
        }
        else {
            setError(pre => ({ ...pre, [name]: true }))
        }
        setDetail(pre => ({ ...pre, [name]: value }))
    }

    const handleEmailBlur = (e) => {
        const { name, value } = e.target;

        if (!value.match(/^\S+@\S+\.\S+$/)) {
            setError(pre => ({ ...pre, [name]: true }))
        }
        else {
            setError(pre => ({ ...pre, [name]: false }))
        }
        setDetail(pre => ({ ...pre, [name]: value }))
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
        setDetail(pre => ({ ...pre, [name]: value }))
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

    const handleCheckedSnackBar = () => {
        setError(pre => ({ ...pre, checkedBox: false }))
    }

    const handleErrorSnackBar = () => {
        setError(pre => ({ ...pre, errorSnackbar: false }))
    }

    const handleCheckedBoxChange = (e) => {
        setDetail(pre => ({ ...pre, checkbox: !detail.checkbox }))
    }

    // Render the Sign Up page
    return (
        <section className={classes.section}>

            <Container component="main" maxWidth="md" className={classes.mainContainer}>
                <Paper elevation={2} className={classes.paper}>
                    <Card className={classes.card} md={6}>
                        <CardMedia
                            image="images/tiffinsImage.jpg"
                            title="Tiffins image"
                            className={classes.cardMedia}
                        />
                    </Card>

                    <form onSubmit={handleClickOnSubmit}>
                        <Grid item xs={12} sm={12}>
                            <PersonAddIcon color="primary" className={classes.personPin} />
                            <Typography variant="h5" className={classes.typoText} >
                                Dalffins Registration form!
                            </Typography>

                            <Typography variant="h6" className={classes.typoTextAccount}>
                                <Grid item xs={12}>
                                    Already have an account?<Link to="/login"> Login</Link>
                                </Grid>
                            </Typography>

                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="firstName"
                                    variant="outlined"
                                    id="firstName"
                                    label="First Name"
                                    fullWidth
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleNameChange}
                                    error={error.firstName}
                                    helperText={error.firstName ? 'Enter only alphanumeric characters!' : ''}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="lastName"
                                    variant="outlined"
                                    id="lastName"
                                    fullWidth
                                    required
                                    label="Last Name"
                                    placeholder="Last Name"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleNameChange}
                                    error={error.lastName}
                                    helperText={error.lastName ? 'Enter only alphanumeric characters!' : ''}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    variant="outlined"
                                    name="email"
                                    id="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleEmailChange}
                                    onBlur={handleEmailBlur}
                                    error={error.email}
                                    helperText={error.email ? 'Example: abc@gmail.com' : ''}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MuiPhoneNumber
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={detail.phoneNumber}
                                    defaultCountry={"ca"}
                                    disableAreaCodes={true}
                                    variant="outlined"
                                    onlyCountries={["ca"]}
                                    label="Phone Number"
                                    fullWidth
                                    required
                                    onChange={phone => handlePhoneNumberChange({ target: { value: phone, name: 'phoneNumber' } })}
                                    error={error.phoneNumber}
                                    helperText={error.phoneNumber ? 'Example: +1 (902) 333-4444' : ''}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
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

                            <Grid item xs={12} md={6}>
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

                            <Grid item xs={12}>
                                <Checkbox
                                    name="checkbox"
                                    checked={detail.checkbox}
                                    size="small"
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    onChange={handleCheckedBoxChange}
                                />
                                <Typography variant='caption' className={classes.typoCaption}>
                                    Yes, I agree to the terms and conditions of Dalffins!
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit"
                                    color="primary"
                                    variant="contained"
                                    className={classes.registerButton}
                                    onClick={handleClickOnSubmit}>
                                    Register
                                </Button>
                                <Snackbar open={error.checkedBox} autoHideDuration={6000} onClose={handleCheckedSnackBar}>
                                    <MuiAlert elevation={6} variant="filled" onClose={handleCheckedSnackBar} severity="error">
                                        Please Agree to terms and conditions!
                                    </MuiAlert>
                                </Snackbar>
                                <Snackbar open={error.errorSnackbar} autoHideDuration={6000} onClose={handleErrorSnackBar}>
                                    <MuiAlert elevation={6} variant="filled" onClose={handleErrorSnackBar} severity="error">
                                        {errorSnackMessage}
                                    </MuiAlert>
                                </Snackbar>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>

        </section>
    );
}

export default SignUp;