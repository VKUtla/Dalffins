//Author: Divyashree Bangalore Subbaraya (B00875916)
import { React, useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { IconButton, Paper } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { makeStyles } from '@material-ui/core/styles';
import { validateLogin } from "../../utils/Api";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '1%',
        marginRight: '7%',
        marginBottom: '0',
        marginLeft: 'auto'
    },

    mainContainer: {
        padding: "40px",
        paddingBottom: '12%',
        display: 'flex',
        justifyContent: 'center',
        height: '80%',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column'
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
    },

    personPin: {
        height: '40%',
        width: '40%',
        marginLeft: '30%'
    },

    typo: {
        textAlign: 'center',
        marginBottom: '20%'
    },

    button: {
        textTransform: 'none',
        float: 'center',
        padding: "2%",
        width: '100px',
        marginLeft: '30%'
    },

    typoText: {
        fontSize: '14px',
        textAlign: 'center',
        marginLeft: '25%',
        padding: '4%'
    },

    registerText: {
        fontSize: '15px',
        textAlign: 'center',
        marginLeft: '12%',
        padding: '2%'
    }

}));

function Login(props) {

    const classes = useStyles();

    const location = useLocation();

    // Defining variables and states for Login functioning
    const [logoutSnackBar, setLogoutSnackBar] = useState(false)

    const handleLogoutSnackBar = () => {
        setLogoutSnackBar(false)
    }

    useEffect(() => {
        const home = () => {
            if (location.state) {
                setLogoutSnackBar(location.state.logout ? true : false);
                history.replace('/login', {})
            }
        }
        home();
    }, []);

    const [error, setError] = useState({
        email: false,
        password: false
    });

    const [details, setDetails] = useState({
        email: '',
        password: ''
    });

    const [errorSnakebar, setErrorSnakeBar] = useState(false);

    const history = useHistory();

    const [displayPassword, setDisplayPassword] = useState(false)

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        if (value.match(/^\S+@\S+\.\S{2,}$/)) {
            setError(pre => ({ ...pre, [name]: false }))
            setDetails(pre => ({ ...pre, [name]: value }))
        }
        else {
            setError(pre => ({ ...pre, [name]: true }))
        }
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setDetails(pre => ({ ...pre, [name]: value }))
    }

    const handleClickOnSubmit = (e) => {
        e.preventDefault()
        for (const [, value] of Object.entries(error)) {
            if (value) {
                return
            }
        }

        //POST API call to validate user's login credentials.
        validateLogin({
            email: details.email,
            password: details.password,

        }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.status === 200) {

                    // On successful login
                    props.setUserId(response.data.id)
                    localStorage.setItem('token', response.data.token);
                    props.setUserToken(response.data.token);
                    props.setFirstName(response.data.firstName)
                    props.setEmail(response.data.email)
                    history.push("/home", { login: true })
                }
            }, (error) => {
                // In case of invalid credentails error, return error snack bar
                setErrorSnakeBar(true)
            });
    }

    const handleCheckedSnackBar = () => {
        setErrorSnakeBar(false)
    }

    const handlePasswordClickChange = () => {
        setDisplayPassword(!displayPassword)
    }

    //Render the login page
    return (
        <section className={classes.section}>
            <Container component="main" maxWidth="sm" className={classes.mainContainer}>
                <Paper elevation={5} className={classes.paper}>
                    <form onSubmit={handleClickOnSubmit}>
                        <Grid item xs={12} sm={12}>
                            <PersonPinIcon color="primary" className={classes.personPin} />
                            <Typography variant="h5" className={classes.typo}>
                                Login
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
                                        )
                                    }}
                                    onChange={handleEmailChange}
                                    error={error.email}
                                    helperText={error.email ? 'Incorrect email id!' : ''}
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
                                    helperText={error.password ? 'Incorrect password!' : ''}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit"
                                    color="primary"
                                    variant="contained"
                                    className={classes.button}
                                >
                                    Login
                                </Button>
                            </Grid>

                            <Typography variant="h6" className={classes.typoText} >
                                <Grid item xs={12}>
                                    <Link to="/forgotPassword"> Forgot Password?</Link>
                                </Grid>
                            </Typography>

                            <Typography variant="h6" className={classes.registerText}>
                                <Grid item xs={12}>
                                    New to Dalffins?<Link to="/signUp"> Register here</Link>
                                </Grid>
                            </Typography>

                        </Grid>
                    </form>
                    <Card className={classes.card} md={2}>
                        <CardMedia
                            image="images/tiffinsImage.jpg"
                            title="Tiffins image"
                            className={classes.cardMedia}
                        />
                    </Card>
                    <Snackbar open={errorSnakebar} autoHideDuration={6000} onClose={handleCheckedSnackBar}>
                        <MuiAlert elevation={6} variant="filled" onClose={handleCheckedSnackBar} severity="error">
                            Invalid Login Credentials!
                        </MuiAlert>
                    </Snackbar>

                    <Snackbar open={logoutSnackBar} autoHideDuration={6000} onClose={handleLogoutSnackBar}>
                        <MuiAlert elevation={6} variant="filled" onClose={handleLogoutSnackBar} severity="success">
                            Logged out Successfully!
                        </MuiAlert>
                    </Snackbar>

                </Paper>
            </Container>
        </section>
    );
}

export default Login;

