//Author: Divyashree Bangalore Subbaraya (B00875916)
import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({

    inside: {
        paddingRight: "10px",
        paddingLeft: "17px",
        paddingBottom: '10px',
        paddingTop: '5px',
        width: "50%",
        display: "flex",
        flexDirection: "row",
        marginTop: "0",
        marginRight: "auto",
        marginBottom: "0",
        marginLeft: "auto"
    },

    mainContainer: {
        padding: "4%",
        display: "flex",
        justifyContent: "center",
        height: "60%",
        alignItems: "center",
        position: "relative",
        flexDirection: "column"
    },
    media: {
        height: 140,
    },

    card: {
        margin: '3%',
        height: '100%'
    },

    cardMedia: {
        width: "100%", height: "100%"
    },

    section: {
        paddingTop: '5%',
    },
    image: {
        position: 'relative',
        width: '100%',
        height: '100%',
        opacity: '0.3',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
    },

    h2: {
        position: 'absolute',
        top: '200px',
        left: '0',
        width: '50%',
        color: 'white',
        display: 'block',
        textAlign: 'center',
        marginLeft: "23%",
        marginTop: '10%',
        fontSize: '40px',
        fontFamily: '"Times New Roman", Times, serif',

    },

    dividedbox: {
        backgroundColor: "white",
        display: 'flex',
        position: 'absolute',
        marginTop: '5%',
        width: '100%',
        height: '100%'
    },

    firstQuadrant: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        top: '0',
        left: '0'
    },

    secondQuadrant: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        left: '50%',
        background: 'lightblue'
    },

    fourthQuadrant: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '0',
        background: 'transparent'
    },

    thirdQuadrant: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        opacity: '0.8'
    },

    testimonials: {
        backgroundImage: "images/tiffinsImage.jpg",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        color: 'black'
    },

    blockQuote: {
        padding: '2%',
        fontStyle: 'italic',
        lineHeight: '145%',
        display: 'block',
        fontSize: '18px',
        fontFamily: '"Times New Roman", Times, serif'
    },

    cite: {
        fontSize: '90%',
        marginTop: '25px',
        display: 'block'
    },

    citeImg: {
        height: '50px',
        borderRadius: '70%',
        marginRight: '13px',
        verticalAlign: 'middle'
    }

}));

function HomePage() {

    // Defining variables and states for Home page functioning
    const [registerSnackBar, setRegisterSnackBar] = useState(false)

    const [loginSnackBar, setLoginSnackBar] = useState(false)

    const [resetSnackBar, setResetSnackBar] = useState(false)

    const [deleteSnackBar, setDeleteSnackBar] = useState(false);

    const location = useLocation();

    const history = useHistory();

    const classes = useStyles();

    // Navigation to Kitchen page on click of Order Now button
    const handleSubmit = () => {
        history.push('/kitchen')
    }

    const handleRegisterSnackBar = () => {
        setRegisterSnackBar(false)
    }

    const handleLoginSnackBar = () => {
        setLoginSnackBar(false)
    }

    const handleResetSnackBar = () => {
        setResetSnackBar(false)
    }

    const handleDeleteSnackBar = () => {
        setDeleteSnackBar(false)
    }

    // Set the status of snack bars
    useEffect(() => {
        const home = () => {
            if (location.state) {
                setRegisterSnackBar(location.state.register ? true : false);
                setLoginSnackBar(location.state.login ? true : false);
                setResetSnackBar(location.state.reset ? true : false);
                setDeleteSnackBar(location.state.delete ? true : false);
                history.replace('/home', {})
            }
        }
        home();
    }, []);

    //Render the homepage
    return (
        <Container component="main">

            {/* Parallax scrolling effect used for homepage */}
            <Parallax pages={1} style={{ top: '0', left: '0', bottom: '0', right: '0' }}>
                <ParallaxLayer
                    offset={0}
                    speed={0}
                    style={{ height: '1%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <div style={{
                        backgroundColor: "rgba(0, 0, 0)", display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <img src="images/tiffinsImage.jpg" alt="Tiffins Image" className={classes.image} />
                        <h2 className={classes.h2}>Dalffins<br />"Healthy home-made food in one click"</h2>
                    </div>
                </ParallaxLayer>
            </Parallax>



            <Parallax pages={4} style={{ top: '0', left: '0', bottom: '0', right: '0' }}>
                <ParallaxLayer offset={1.0}
                    speed={0}
                    style={{
                        backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '21%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'
                    }}>

                    <text style={{ fontWeight: 'bold', fontSize: '30px', fontFamily: '"Times New Roman", Times, serif' }}> Our customers can't live without us!</text>

                    <blockquote className={classes.blockQuote} style={{ marginRight: '18%' }}>
                        <q>Dalffins is just a life-saver.
                            I just randomly came across this website and now I can't live without it.
                            Now that I got used to the application, I don't have a reason to skip my meal.</q>
                        <cite className={classes.cite}>
                            <img className={classes.citeImg} src="images/christian-buehner-DItYlc26zVI-unsplash.jpg" />
                            - Christian Buehner
                        </cite>
                    </blockquote>

                    <blockquote className={classes.blockQuote} style={{ marginRight: '12%' }}>
                        <q>Inexpensive and healthy meals available in one place.
                            All the dishes taste like home-made ones, more like prepared by mothers.
                            Me and my family are so in love with the Dalffins application.</q>
                        <cite className={classes.cite}>
                            <img className={classes.citeImg} src="images/dahiana-waszaj-Xbe20Z_DlDs-unsplash.jpg" />
                            - Dahiana Waszaj
                        </cite>
                    </blockquote>

                    <blockquote className={classes.blockQuote} style={{ marginRight: '12%' }}>
                        <q>Since I travel a lot for my client meetings, I hardly get time to cook or eat.
                            And, Dalffins came to the rescue and trust me, I can't get over this application.
                            Any place I travel to, first thing I do is to install the Dalffins application and order my home-made like food.</q>
                        <cite className={classes.cite}>
                            <img className={classes.citeImg} src="images/warren-wong-VVEwJJRRHgk-unsplash.jpg" />
                            - Warren Wong
                        </cite>
                    </blockquote>

                </ParallaxLayer>

                <ParallaxLayer offset={1.5} />

                <ParallaxLayer offset={2.5} />

                <ParallaxLayer offset={2.5}>
                    <div className={classes.dividedbox}>
                        <section className={classes.firstQuadrant} style={{ marginLeft: '12%' }}>
                            <h1 style={{ fontSize: '50px', fontFamily: '"Times New Roman", Times, serif', marginLeft: '7%' }}>
                                Dalffins's 3H's
                            </h1>
                            <text style={{ fontSize: '27px', fontFamily: '"Times New Roman", Times, serif' }}>
                                Healthy, Hygienic, Home-made food.
                                <img src="images/tiffinLogo.png" alt="south Indian tiffins" style={{ width: '60%', height: '70%' }} />

                            </text>
                        </section>

                        <section className={classes.secondQuadrant}>
                            <img src="images/Rice.png" alt="tiffinImage" style={{ width: '100%', height: '100%' }} />
                        </section>

                        <section className={classes.thirdQuadrant}>
                            <p style={{ fontSize: '25px', textAlign: 'center', fontFamily: '"Times New Roman", Times, serif' }}>
                                It's all about food right?!
                                Then, what are you waiting for?!
                                <br></br>
                                Dalffins is here just for you!!!
                                <br></br>
                                To begin, all you need is to create a Dalffins account.
                                You can order your most favorite dishes from our chef's Kitchen.
                                <br></br>
                                <Button variant="contained" color='primary' style={{ marginTop: '2%', marginLeft: '43%', display: 'inherit', position: 'relative' }} type="submit" onClick={handleSubmit}>
                                    Order Now
                                </Button>
                            </p>
                        </section>
                        <section className={classes.fourthQuadrant}>
                            <img src="images/southIndianTiffins.png" alt="south Indian tiffins" style={{ width: '100%', height: '100%' }} />
                        </section>
                    </div>


                </ParallaxLayer>
            </Parallax>


            <Snackbar open={registerSnackBar} autoHideDuration={6000} onClose={handleRegisterSnackBar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleRegisterSnackBar} severity="success">
                    Registered Successfully!
                </MuiAlert>
            </Snackbar>

            <Snackbar open={loginSnackBar} autoHideDuration={6000} onClose={handleLoginSnackBar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleLoginSnackBar} severity="success">
                    Logged In Successfully!
                </MuiAlert>
            </Snackbar>

            <Snackbar open={resetSnackBar} autoHideDuration={6000} onClose={handleResetSnackBar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleResetSnackBar} severity="success">
                    Updated password Successfully!
                </MuiAlert>
            </Snackbar>
            <Snackbar open={deleteSnackBar} autoHideDuration={6000} onClose={handleDeleteSnackBar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleDeleteSnackBar} severity="success">
                    Deleted Successfully!
                </MuiAlert>
            </Snackbar>
        </Container>
    )
}

export default HomePage;