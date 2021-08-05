/* Author - Akshay Garg */

import React, { Component, useState } from "react";
import "./food_item.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { StyledRating } from "../Review/ReviewModal/ReviewModal";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Food_Item = (props) => {
  // Defining the quantity state
  const [quantity, setQuantity] = useState(0);

  // Adding the quantity by 1
  const addItem = () => {
    setQuantity(quantity + 1);
    props.foodItem.quantity = quantity + 1;
    props.onOrderItemClick(props.foodItem);
  };

  // Removing the quantity by 1
  const removeItem = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      props.foodItem.quantity = quantity - 1;
      props.onOrderItemClick(props.foodItem);
    } else {
      <Alert>This is a alert—check it out!</Alert>;
    }
  };

  // Returns the card which contains the food item details
  return (
    <Card style={{ height: "350px", marginBottom: "50px" }}>
      <Card.Body>
        <Card.Img src={props.foodItem.Image} style={{ height: "150px" }} />
        <Card.Title style={{ marginTop: "4%", fontSize: "16px" }}>
          {props.foodItem.dishname}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: "12px" }}>
          Meal Type: {props.foodItem.mealtype}
        </Card.Subtitle>
        <Card.Subtitle
          className="mb-2 mt-1 text-muted d-flex align-items-center"
          style={{ fontSize: "12px" }}
        >
          Rating:{" "}
          <StyledRating
            name="customized-color"
            className=" ml-2"
            value={props.foodItem.dishRating}
            readOnly
            icon={<FavoriteIcon fontSize="inherit" />}
          />
        </Card.Subtitle>
        <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
          ${props.foodItem.dishcost}
        </Card.Text>
        <div style={{ marginTop: "10%" }}>
          <Button onClick={removeItem}>-</Button>
          <label style={{ marginLeft: "5%", marginRight: "5%" }}>
            {quantity}
          </label>
          <Button onClick={addItem}>+</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Food_Item;
