//Author: Divyashree Bangalore Subbaraya (B00875916)
import { React } from 'react';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '50px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '1%',
        marginRight: '7%',
        marginBottom: '0',
        marginLeft: 'auto'
    },

    mainContainer: {
        padding: "100px",
        paddingTop: '12%',
        display: 'flex',
        justifyContent: 'center',
        height: '80%',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column'
    },
    typoAbout: {
        textAlign: 'center',
        fontSize: '40px',
        fontWeight: 'bolder',
        fontFamily: '"Times New Roman", Times, serif'
    },
}));

function AboutUs() {

    const classes = useStyles();

    // Render the about us page on the click of About Us button on footer
    return (
        <Container component="main" maxWidth="md" className={classes.mainContainer}>
            <Typography className={classes.typoAbout}>
                About Us
            </Typography>

            <Card className={classes.root}>
                <Typography component="h5" variant="h5" style={{ margin: '2%', fontFamily: '"Times New Roman", Times, serif' }}>
                    ‘Dalffins’ is an online tiffins system that provides its end users
                    to sell and order food in a much easy, healthier, and efficient manner.
                    <br></br>
                    <br></br>
                    ‘Dalffins’ is the only application that has provided the flexibility and opportunity for students
                    to earn from their Culinary skills.
                </Typography>
                <CardMedia
                    image="images/tiffinLogo.png"
                    title="Tiffins image"
                    style={{
                        height: '300px',
                        width: '290px',
                        margin: '0 auto'
                    }}
                />
            </Card>

        </Container>
    );
}
export default AboutUs;