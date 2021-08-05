//Author: Divyashree Bangalore Subbaraya (B00875916)
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Paper } from '@material-ui/core';
import { TextField, InputAdornment } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import Checkbox from '@material-ui/core/Checkbox';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import MuiPhoneNumber from 'material-ui-phone-number';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { fetchUserProfile, updateUserProfile, deleteUserProfile } from "../../utils/Api";

const useStyles = makeStyles((theme) => ({

    inside: {
        paddingRight: "26px",
        paddingLeft: "17px",
        paddingBottom: "25px",
        display: "flex",
        flexDirection: "row",
        marginTop: "11px",
        marginRight: "auto",
        marginBottom: "11px",
        marginLeft: "auto"
    },

    mainContainer: {
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        height: "80%",
        alignItems: "center",
        position: "relative",
        flexDirection: "column",
        marginBottom: "50px"
    },

    cardStyle: {
        margin: '3%'
    },

    cardMedia: {
        height: '100%',
        width: '350px'
    },

    section: {
        paddingTop: '5%'
    },

    personPin: {
        height: '20%',
        width: '40%',
        marginLeft: '30%'
    },

    typo: {
        textAlign: 'center'
    },

    EmailNameGrid: {
        marginLeft: '10%'
    },

    done: {
        textTransform: 'none',
        float: 'center',
        padding: "2%",
        width: '100px',
        marginLeft: '60%'
    },

    deleteTypoText: {
        justifyContent: 'flex-start',
        marginLeft: '2%',
        fontSize: '20px'
    },

    deleteIcon: {
        marginLeft: '1%',
        color: "black"
    },

    typoCaption: {
        fontSize: '14px'
    },

    deleteButton: {
        width: '40%',
        marginLeft: '30%'
    },

    style: {
        alignItems: "center",
        justifyContent: "flex-start"
    }

}));

function MyAccount(props) {

    const classes = useStyles();

    // Defining variables and states for My Account page functioning

    const history = useHistory();

    const [error, setError] = useState(false);

    const [errorSnackMessage, setErrorSnackMessage] = useState('Invalid !! Try again');

    const [disabled, setDisabled] = useState(true);

    const [saveSnackBar, setSaveSnackBar] = useState(false)

    const [detail, setDetail] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        snackbar: false,
        checkbox: false
    });

    const [editDetail, setEditDetail] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    const [open, setOpen] = React.useState(false);

    const [editPopUpName, setEditPopUpName] = React.useState('First Name');

    const [editPopUpLabelName, setEditPopUpLabelName] = React.useState('firstName');

    const [errorSnakebar, setErrorSnakeBar] = useState(false);

    const handleSaveSnackBar = () => {
        setSaveSnackBar(false)
    }

    useEffect(() => {
        if (props.userId === "") {
            history.push('/login', {})
        }
        async function userData() {

            //GET API call to display user's details on My Account page.
            await fetchUserProfile((props.userId),
                {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                })
                .then((res) => {
                    setDetail({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        email: res.data.email,
                        phoneNumber: res.data.phoneNumber
                    })
                    setEditDetail({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        email: res.data.email,
                        phoneNumber: res.data.phoneNumber
                    })
                })
        };
        userData();

    }, []);

    const handleClose = () => {
        setOpen(false);
    };
    const handleCheckedSnackBar = () => {
        setErrorSnakeBar(false)
    }

    const handleSave = () => {
        if (!error) {
            setOpen(false);
            updateUserProfile((props.userId), {
                email: editDetail.email,
                firstName: editDetail.firstName,
                lastName: editDetail.lastName,
                phoneNumber: editDetail.phoneNumber
            }, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then((response) => {
                    if (response.status === 200) {

                        // On successful updation of profile details
                        setDetail(pre => ({ ...pre, [editPopUpLabelName]: editDetail[editPopUpLabelName] }))
                        setSaveSnackBar(true)

                    }
                }).catch(function (error) {
                    if (error.response.status === 400) {

                        // In case of error, returning error snack bars
                        setErrorSnakeBar(true);
                        setErrorSnackMessage(error.response.data.message)
                        setEditDetail(detail)
                    }
                })
        };
    };

    const handleDeleteClick = () => {
        deleteUserProfile(props.userId).then((res) => {
            if (res.status === 200) {
                localStorage.removeItem('token')
                props.setUserToken('')
                history.push("/home", { delete: true })
            }
        })
    }
    const handleCheckedBoxChange = () => {
        setDetail(pre => ({ ...pre, checkbox: !detail.checkbox }))
        setDisabled(detail.checkbox)
    }

    const handlePhoneNumberChange = (e) => {
        const { value } = e.target;
        setDetail(pre => ({ ...pre, phoneNumber: value }))
    }

    const handleClickOnFnameEdit = () => {
        setEditPopUpName('First Name');
        setEditPopUpLabelName('firstName');
        setOpen(true);
    }

    const handleClickOnLnameEdit = () => {
        setEditPopUpName('Last Name')
        setEditPopUpLabelName('lastName')
        setOpen(true);
    }

    const handleClickOnEmailEdit = () => {
        setEditPopUpName('Email')
        setEditPopUpLabelName('email')
        setOpen(true);
    }

    const handleClickOnPhoneEdit = () => {
        setEditPopUpName('Phone Number')
        setEditPopUpLabelName('phoneNumber')
        setOpen(true);
    }

    const handleDone = () => {
        history.push("/home")
    }

    const handlePopUpChange = (e) => {

        const { name, value } = e.target;

        if ((value.match(/^[ 0-9a-zA-Z]+$/) && name.includes('Name')) ||
            (value.match(/^\S+@\S+\.\S{2,}$/) && name === "email") || (name === 'phoneNumber')) {
            setError(false)
            setEditDetail(pre => ({ ...pre, [name]: value }))
        }
        else {
            setError(true)
        }
    }

    const editTextFieldChange = (textField) => {
        if (textField === 'phoneNumber') {
            return (
                <MuiPhoneNumber
                    name="phoneNumber"
                    id="phoneNumber1"
                    defaultCountry={"ca"}
                    disableAreaCodes={true}
                    variant="outlined"
                    onlyCountries={["ca"]}
                    label="Phone Number"
                    fullWidth
                    required
                    onChange={phone => handlePopUpChange({ target: { value: phone, name: 'phoneNumber' } })}
                />
            )
        }
        else {
            return (
                <TextField
                    autoFocus
                    error={error}
                    defaultValue={detail[textField]}
                    margin="dense"
                    id={editPopUpName}
                    name={textField}
                    label={`New ${editPopUpName}`}
                    helperText={error ? 'Incorrect Entry' : ''}
                    fullWidth
                    onChange={handlePopUpChange} />
            )
        }
    }

    // Edit details pop up action
    const editPopUp = () => (<div>

        <Dialog fullWidth={true}
            maxWidth="xs" open={open} onClose={handleClose}>
            <DialogTitle> Edit Account details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can edit your {editPopUpName} below. Be sure to click on "Save" to save your changes.
                </DialogContentText>

                {editTextFieldChange(editPopUpLabelName)}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </div>)


    // Render the My Account Profile page
    return (
        <section className={classes.section}>
            <Container component="main" maxWidth="md" className={classes.mainContainer}>

                {editPopUp()}
                <Paper elevation={2} className={classes.inside}>
                    <Card className={classes.cardStyle}>
                        <CardMedia
                            image="images/tiffinsImage.jpg"
                            title="Tiffins image"
                            className={classes.cardMedia}
                        />
                    </Card>
                    <Grid container spacing={3}
                        mx="auto"
                        className={classes.style}
                    >
                        <Grid item xs={12} md={12}>
                            <PersonPinIcon color="primary" className={classes.personPin} />
                            <Typography variant="h5" className={classes.typo}>
                                My Account
                            </Typography>
                        </Grid>

                        <Grid item md={8} xs={8} className={classes.EmailNameGrid}>
                            <TextField
                                name="firstName"
                                variant="outlined"
                                id="firstName"
                                label="First Name"
                                value={detail.firstName}
                                fullWidth
                                required
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />

                        </Grid>
                        <Grid item md={2} xs={2}>

                            <Button
                                color="primary"
                                variant="contained" onClick={handleClickOnFnameEdit}>
                                Edit
                            </Button>

                        </Grid>


                        <Grid item md={8} xs={8} className={classes.EmailNameGrid}>
                            <TextField
                                name="lastName"
                                variant="outlined"
                                id="lastName"
                                fullWidth
                                required
                                label="Last Name"
                                placeholder="Last Name"
                                value={detail.lastName}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item md={2} xs={2}>

                            <Button
                                color="primary"
                                variant="contained" onClick={handleClickOnLnameEdit}>
                                Edit
                            </Button>

                        </Grid>


                        <Grid item md={8} xs={8} className={classes.EmailNameGrid}>
                            <TextField
                                variant="outlined"
                                name="email"
                                id="email"
                                label="Email"
                                type="email"
                                value={detail.email}
                                placeholder="Email"
                                fullWidth
                                required
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item md={2} xs={2}>

                            <Button
                                color="primary"
                                variant="contained" onClick={handleClickOnEmailEdit}>
                                Edit
                            </Button>

                        </Grid>

                        <Grid item xs={8} md={8} className={classes.EmailNameGrid}>
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
                            />
                        </Grid>
                        <Grid item md={2} xs={2}>

                            <Button
                                color="primary"
                                variant="contained" onClick={handleClickOnPhoneEdit}>
                                Edit
                            </Button>

                        </Grid>

                        <Grid item xs={8}>
                            <Button type="submit"
                                color="primary"
                                variant="contained"
                                onClick={handleDone}
                                className={classes.done}
                            >
                                Done
                            </Button>
                        </Grid>


                        <Grid item md={12} xs={12}>
                            <Typography variant="h6" className={classes.deleteTypoText}>
                                Delete Account
                                <DeleteIcon className={classes.deleteIcon} />
                            </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Checkbox
                                name="checkbox"
                                checked={detail.checkbox}
                                size="small"
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                onChange={handleCheckedBoxChange}
                            />
                            <Typography variant='caption' className={classes.typoCaption}>
                                Yes, I agree to delete my Dalffins account and its associated data
                            </Typography>
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <Button type="submit"
                                color="primary"
                                variant="contained"
                                disabled={disabled}
                                onClick={handleDeleteClick}
                                className={classes.deleteButton}
                            >
                                Delete Account
                            </Button>
                        </Grid>
                    </Grid>
                    <Snackbar open={errorSnakebar} autoHideDuration={6000} onClose={handleCheckedSnackBar}>
                        <MuiAlert elevation={6} variant="filled" onClose={handleCheckedSnackBar} severity="error">
                            {errorSnackMessage}
                        </MuiAlert>
                    </Snackbar>

                    <Snackbar open={saveSnackBar} autoHideDuration={6000} onClose={handleSaveSnackBar}>
                        <MuiAlert elevation={6} variant="filled" onClose={handleSaveSnackBar} severity="success">
                            Updated profile details Successfully!
                        </MuiAlert>
                    </Snackbar>

                </Paper>
            </Container>
        </section>
    )
}

export default MyAccount;
