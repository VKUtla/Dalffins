//Author: Divyashree Bangalore Subbaraya (B00875916)
import { Typography } from '@material-ui/core';
import { React } from 'react';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    paper: {
        paddingTop: '30px',
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
        paddingTop: '12%',
        display: 'flex',
        justifyContent: 'center',
        height: '80%',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column'
    },

    typoContact: {
        textAlign: 'center',
        fontSize: '40px',
        fontWeight: 'bolder',
        fontFamily: '"Times New Roman", Times, serif'
    },
}));

function ContactUs() {

    const classes = useStyles();

    // Render the contact us page on the click of Contact Us button on footer
    return (
        <Container component="main" maxWidth="md" className={classes.mainContainer}>
            <Typography className={classes.typoContact}>
                Contact Us
            </Typography>
            <Paper elevation={5} className={classes.paper}>

                <Typography style={{marginLeft:'2%', fontFamily: '"Times New Roman", Times, serif'}}>
                    Dalffins appreciates your feedback, complaints,
                    and questions about the application.
                    Any questions, complaints or requests about our use of your personal information, please contact us at:
                    <br></br>
                    <br></br>
                    Dalffins.
                    <br></br>
                    1333, South Sark Street,
                    <br></br>
                    Park Victoria Apartments,
                    <br></br>
                    Halifax, Nova Scotia
                    <br></br>
                    B3J 2K9
                    <br></br>
                    Canada
                    <br></br>
                    <br></br>
                    
                    or by email at <a href="mailto:admin@dalffins.com">admin@dalffins.com</a> 
                    <br></br>
                    <br></br>
                    Last Updated: July 27, 2021
                </Typography>
            </Paper>
        </Container>
    );
}

export default ContactUs;