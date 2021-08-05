//Author: Vamsi Krishna Utla (B00870632)

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Card,
  FormControl,
  Button,
  InputGroup,
  ListGroup,
  Col,
  Row,
  Form,
} from "react-bootstrap";
import ReviewModal from "../../components/Review/ReviewModal/ReviewModal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function SummaryAndPayment(props) {
  //variables and states required for page functioning
  const [interac, setInterac] = useState(true);
  const [stringEle, setStrg] = useState("      ");
  const [specialInstructions, setInstructions] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [orderId, setOrderId] = useState("");

  // const [vendor, setVendor] = useState("")
  var vendor = "";
  var [transactionID, setTransactionID] = useState("");
  var totalPrice = 0;
  var itemPrice = 0;
  const history = useHistory();
  var orderItems = "";
  const foodItems = Array.from(props.orderedItems).map(([key, value]) => ({
    key,
    value,
  }));

  //required for logging purpose
  console.log(foodItems);
  console.log(props.email);

  //support functions after clicks or on changing of form elements
  const updateUpload = () => {
    setInterac(false);
  };

  //go back to food selection page
  const back = () => {
    history.push("/orderFood/");
  };

  const upload = () => {
    //props.orderedItems.email) - will be replaced below after integration
    window.alert("E-Interac details: "+vendor);
    setInterac(true);
  };

  const payment = () => {
    //interac API
    const reg_urlInterac =
      "https://dalffins.herokuapp.com/summaryAndPayment/saveOrderInterac";

    //cash API
    const reg_urlCash =
      "https://dalffins.herokuapp.com/summaryAndPayment/saveOrderCash";

    //validation for empty list of food items
    if (props.orderedItems.size <= 0) {
      window.alert(
        "No items selected... please select items before placing for the order."
      );
    }
    //validation for incorrect payment details
    else if (transactionID.length == 0 && interac) {
      window.alert("Check payment option and transaction ID details.");
    }
    //valid case
    else {
      //interac API call
      async function storePaymentInterac() {
        console.log("hello");
        await axios
          .post(reg_urlInterac, {
            user: props.email,
            vendor: vendor,
            total: totalPrice,
            orderItems: orderItems,
            paymentOption: "E-Interac",
            transactionID: transactionID,
            instructions: specialInstructions,
          })
          .then((res) => {
            const ids = foodItems.map((item) => {
              if (item.value.hasOwnProperty("_id")) return item.value._id;
              return item.value.id;
            });
            setOrderId(ids);
            setShowReviewModal(true);
          })
          .catch((error) => {
            if (error.response) {
              console.log("Technical Issue: Contact System Administrator");
            }
          });
      }

      //cash API call
      async function storePaymentCash() {
        console.log("Initiating REST API...");
        console.log(vendor);
        await axios
          .post(reg_urlCash, {
            user: props.email,
            vendor: vendor,
            total: totalPrice,
            orderItems: orderItems,
            paymentOption: "Cash",
            instructions: specialInstructions,
          })
          .then((res) => {
            const ids = foodItems.map((item) => {
              if (item.value.hasOwnProperty("_id")) return item.value._id;
              return item.value.id;
            });
            setOrderId(ids);
            setShowReviewModal(true);
          })
          .catch((error) => {
            if (error.response) {
              console.log("Technical Issue: Contact System Administrator");
            }
          });
      }
      if (interac) storePaymentInterac();
      else storePaymentCash();
    }
  };

  //update special instructions
  const instructions = () => {
    setInstructions(document.getElementById("special").value);
  };

  //update transaction ID in case of E-Interac transfer
  const transaction = () => {
    setTransactionID(document.getElementById("transactionID").value);
  };

  const handleReviewModalOnClose = () => {
    setShowSuccessSnackbar(true);
    props.onOrderItemClick({});
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  //page rendering section
  return (
    <div>
      <div style={{ marginTop: "5%", marginLeft: "5%", maxHeight: "50%" }}>
        <Row style={{ marginLeft: "auto", width: "90%", marginRight: "5%" }}>
          <Col xs={6} class="col-md-6 border-right">
            <img src="images/Chef2.jpg" width="93%" height="90%" />
          </Col>
          <Col
            xs={6}
            style={{ paddingLeft: "3%", overflow: "scroll", maxHeight: "70%" }}
          >
            <Row style={{ marginRight: "20%" }}>
              <h1>Order Summary</h1>
            </Row>
            <Row style={{ marginTop: "2%" }}>
              <div>
                <ListGroup
                  style={{
                    overflow: "scroll",
                    maxHeight: "120%",
                    width: "460px",
                  }}
                >
                  {props.orderedItems.size > 0 ? (
                    foodItems.map(
                      (foodItem) => (
                        (itemPrice =
                          foodItem.value.dishcost * foodItem.value.quantity),
                        (vendor = foodItem.value.vendorEmail),
                        (totalPrice = totalPrice + itemPrice),
                        (orderItems = orderItems.concat(
                          foodItem.value.dishname +
                            " x " +
                            foodItem.value.quantity
                        )),
                        console.log(itemPrice),
                        (
                          <ListGroup.Item style={{ maxWidth: "200%" }}>
                            <b>
                              {foodItem.value.dishname} x{" "}
                              {foodItem.value.quantity}{" "}
                            </b>{" "}
                            ... ({foodItem.value.cost} x{" "}
                            {foodItem.value.quantity} = ${itemPrice})
                          </ListGroup.Item>
                        )
                      )
                    )
                  ) : (
                    <h2 style={{ color: "red" }}>No items selected</h2>
                  )}
                </ListGroup>
              </div>
            </Row>
            <Row style={{ marginRight: "20%", marginTop: "3%" }}>
              <InputGroup>
                <FormControl
                  id="special"
                  as="textarea"
                  aria-label="With textarea"
                  placeholder="Add special instructions..."
                  style={{
                    backgroundColor: "lightgrey",
                    fontStyle: "italic",
                    fontSize: "20px",
                    margin: "auto",
                  }}
                  onChange={instructions}
                />
              </InputGroup>
            </Row>
            <Row>
              <Card
                body
                style={{
                  color: "white",
                  fontFamily: "cursive",
                  fontSize: "130%",
                  marginLeft: "19%",
                  marginTop: "3%",
                  backgroundColor: "#3f51b5",
                  color: "white",
                  width: "40%",
                  textAlign: "center",
                }}
              >
                <b>Total = ${totalPrice.toFixed(2)}</b>
              </Card>
            </Row>
            <Row style={{ marginRight: "25%", marginTop: "5%" }}>
              <h1>Payment Option</h1>
            </Row>
            <Row>
              <div>
                <Form.Check
                  onClick={updateUpload}
                  style={{ marginTop: "2%" }}
                  type="radio"
                  label="Pay by Cash"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  onClick={upload}
                  style={{ marginTop: "2%" }}
                  type="radio"
                  label="Pay by E-Interac"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
              </div>
            </Row>
            <Row>
              <div>
                {interac ? (
                  <Form style={{ maxHeight: "120%", width: "460px" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Transacrion ID</Form.Label>
                      <Form.Control
                        id="transactionID"
                        type="transactionID"
                        placeholder="Enter transaction ID..."
                        onChange={transaction}
                      />
                      <Form.Text className="text-muted">
                        <b>
                          Please enter the transaction ID of the E-Interac
                          transfer.
                        </b>
                      </Form.Text>
                    </Form.Group>
                  </Form>
                ) : (
                  <div style={{ marginBottom: "500%" }}>{stringEle}</div>
                )}
              </div>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="danger"
                  onClick={back}
                  style={{ marginTop: "5%", width: "50%", padding: "5% 5%" }}
                >
                  Go Back
                </Button>
              </Col>
              <Col>
                <Button
                  variant="success"
                  onClick={payment}
                  style={{ marginTop: "5%", width: "50%", padding: "5% 5%" }}
                >
                  Pay
                </Button>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <br></br>
          </Col>
        </Row>
      </div>
      <ReviewModal
        show={showReviewModal}
        onClose={handleReviewModalOnClose}
        title="Yay, your order placed successfully"
        subTitle="Please take a moment and review your order."
        orderId={orderId}
        email={props.email}
      />
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSuccessSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setShowSuccessSnackbar(false)}
          severity={"success"}
        >
          "Review placed successfully"
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default SummaryAndPayment;
