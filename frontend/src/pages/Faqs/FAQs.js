//Author: Divyashree Bangalore Subbaraya (B00875916)
import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    question: {
        fontSize: '20px',
        fontWeight: 'regular',
        fontFamily: '"Times New Roman", Times, serif'
    },

    answer:{
        fontSize: '18px',
        fontWeight: 'regular',
        fontFamily: '"Times New Roman", Times, serif'
    },

    section: {
        paddingTop: '10%'
    },
    typoFAQ: {
        textAlign: 'center',
        fontSize: '40px',
        fontWeight: 'bolder',
        fontFamily: '"Times New Roman", Times, serif'
    },
    accordion: {
        width: '100%'
    },
    detailHeading: {
        fontSize: '22px',
        fontWeight: 'bold',
        paddingBottom: '1%',
        fontFamily: '"Times New Roman", Times, serif'
    },
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
    }
}));

function FAQs() {

    const classes = useStyles();

    // Render the FAQs us page on the click of FAQs button on footer
    return ( 
        <section className={classes.section}>
            <Typography className={classes.typoFAQ}>
                FAQs
            </Typography>
            <Container component="main" maxWidth="md" className={classes.mainContainer}>
                <Paper elevation={5} className={classes.paper}>

                    <div className={classes.root}>
                        <Typography className={classes.detailHeading}>
                            General
                        </Typography>
                        <Accordion className={classes.accordion} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    What is Dalffins?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Typography className={classes.answer}>
                                 ‘Dalffins’ is an online tiffins system that provides its end users 
                                 to sell and order food in a much easy, healthier, and efficient manner.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    What is that one unique aspect of Dalffins?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Typography className={classes.answer}>
                                 ‘Dalffins’ is the only application that has provided the flexibility and opportunity for students 
                                  to earn from their Culinary skills. 
                                 </Typography>
                            </AccordionDetails>   
                        </Accordion>
                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    What is Kitchen ?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    Kitchen is a web page where you can add and manage your dish items
                                    for selling purpose. You can add your kitchen here <Link to="/kitchen"> Add Kitchen </Link>. You need to login first using Dalffins account for using the Kitchen feature.    
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        
                        <br></br>

                        <Typography className={classes.detailHeading}>
                            Managing your account
                        </Typography>
                        <Accordion className={classes.accordion} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>How to reset my forgotten password?</Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Typography>
                                    If you forgot your password, click <Link to="/forgotPassword"> here</Link> to reset it. You will then need to provide your registered email address so that we can send you an email that will allow you to reset your password.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    I got a new phone number. How to update in Dalffins?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    If you want to update your phone number,
                                    click on <Link to="/myAccount"> My Account</Link> option from the drop-down menu of profile logo on the navigational bar,
                                    to update your phone number.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    I want to change my first name. How to update in Dalffins?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    If you want to update your first name,
                                    click on <Link to="/myAccount"> My Account</Link> option from the drop-down menu of profile logo on the navigational bar,
                                    to update your first name.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    I want to change my last name. How to update in Dalffins?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    If you want to update your first name,
                                    click on <Link to="/myAccount"> My Account</Link> option from the drop-down menu of profile logo on the navigational bar,
                                    to update your last name.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    I want to pay for an order by Cash. How to achieve this in Dalffins?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    If you want to pay for an order by cash,
                                    click on <Link to="/summaryAndPayment"> Order Summary and Payment</Link> select Payment Option as Cash and click on Pay. 
                                    Please make sure that the items are added to the cart before proceeding for payment.     
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    I want to pay for an order by E-Interac. How to achieve this in Dalffins?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    If you want to pay for an order by E-Interac,
                                    click on <Link to="/summaryAndPayment"> Order Summary and Payment</Link> select Payment Option as E-Interac and the system displays the E-Interac ID of vendor.
                                    Make the E-Interac from your banking application and enter the transaction ID in the associatd field and click on Pay.
                                    Please make sure that the items are added to the cart before proceeding for payment.     
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    I want to view order summary of the current order. How to achieve this in Dalffins?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    If you want view order summary of the current order,
                                    click on <Link to="/summaryAndPayment"> Order Summary and Payment</Link> to view the list of items added to the cart. 
                                    Please make sure that the items are added to the cart.    
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    How would I know if my order is placed successfully?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    You will get an email confirmation to your registered email ID wuth order summary.    
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    Where can I add special instructions to my order?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    If you want add special instructions to your order,
                                    click on <Link to="/summaryAndPayment"> Order Summary and Payment</Link> link and add special instructions in the provided field.    
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <br></br>
                        <Typography className={classes.detailHeading}>
                            Managing your Kitchen
                        </Typography>
                        
                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    How to add new dish to my kitchen ?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    You can add dish by clicking "Add dish" button on the Kitchen page . You can provide all the details regarding the dish and click on submit .    
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    How to update existing dish item in my kitchen ?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                    You can update dish by clicking "Kebab/Three dot menu" on each individual dish item button on the Kitchen page.Then choose "Update" option . You can update the existing details and click on submit .    
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    How to remove dish item from my kitchen ?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                     You can remove dish by clicking "Kebab/Three dot menu" on each individual dish item on the Kitchen page.Then choose "Remove" option . You can remove the dish item by clicking on "Remove" on the promopt.    
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    How to enable existing dish item in my kitchen ?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                     You can enable dish for selling by clicking "Kebab/Three dot menu" on each individual dish item on the Kitchen page.Then choose "Enable" option . Your dish item will be enabled for selling .    
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    How to disable existing dish item in my kitchen ?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                     You can disable dish for selling by clicking "Kebab/Three dot menu" on each individual dish item on the Kitchen page.Then choose "disable" option . Your dish item will be disabled for selling .    
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        
                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    How to add food item to the cart?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                     You can click on 'Order Food' from the menu and select the vendor. After selecting the vendor, a list of food items are displayed
                                     and you can select the selected item by clicking on '+' icon.   
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.question}>
                                    How to remove food item from the cart?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography >
                                     You can click on 'Order Food' from the menu and select the vendor. After selecting the vendor, a list of food items are displayed
                                     and you can remove the selected item by clicking on '-' icon.   
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Paper>
            </Container>
        </section>
    );
}

export default FAQs;