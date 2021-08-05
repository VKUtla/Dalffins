/* Author - Akshay Garg */

import React, { Component, useState, useEffect } from "react";
import "./food_selection.css";
import Food_Item from "../../components/food_item/food_item";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import axios from "axios";
import noimage from "../../images/noimage.png";

const Food_Selection = (props) => {
  //Defining the state of the component.
  const [kitchenName, setKitchenName] = useState("");
  const [kitchenImages, setKitchenImages] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const param = useParams();

  //api_url stores the url to fetch the collection data from MongoDB
  const api_url = "https://dalffins.herokuapp.com/foodSelection/" + param.id;

  useEffect(() => {
    async function fetchFooditems() {
      // Making API call and storing the data in the state variables kitchenName, kitchenImages and foodItems
      await axios
        .get(api_url)
        .then((res) => {
          console.log("res    " + JSON.stringify(res));

          setKitchenName(res.data.data.kitchenName);
          setKitchenImages(res.data.data.kitchenImages);
          setFoodItems(res.data.data.foodItems);
        })
        .catch((error) => {
          if (error.response) {
            console.log("Invalid Id");
          }
        });
    }
    fetchFooditems();
  }, []);

  console.log("kitchenImages    " + kitchenImages);
  console.log("kitchenName    " + kitchenName);
  console.log("foodItems    " + foodItems);

  // orderedItemsMap stores the details of the ordered items with the quantity
  const [orderedItemsMap, setOrderedItemsMap] = useState(new Map());

  //orderItemHandler adds the orderedItem to map if the quantity is greater than zero,
  //otherwise delete it from orderedItemsMap if the quantity is reduced to zero.
  const orderItemHandler = (orderedItem) => {
    let orderItemDishName = orderedItem.dishname;
    let quantity = orderedItem.quantity;

    if (orderedItemsMap.get(orderItemDishName) === undefined && quantity > 0) {
      orderedItemsMap.set(orderedItem.dishname, orderedItem);
    } else {
      if (quantity == 0) {
        orderedItemsMap.delete(orderItemDishName);
      }
    }

    props.onOrderItemClick(orderedItemsMap);
  };

  return (
    <div className="div-dimensions center-align">
      <br />
      <br />
      <br />
      <br />
      <h1>{kitchenName}</h1>
      <br />

      {/* Using crousel to show the kitchen images. */}
      <Carousel style={{ height: "50vh" }}>
        {kitchenImages.length > 0 ? (
          kitchenImages.map((image) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image}
                style={{ height: "50vh" }}
              />
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={noimage}
              style={{ height: "50vh" }}
            />
          </Carousel.Item>
        )}
      </Carousel>
      <br />
      <br />
      <h4> Menu Items </h4>
      <br />

      {/* Iterating the food items array and calling the food item component to render it. */}
      <Container>
        <Row>
          {foodItems.length > 0 ? (
            foodItems
              .filter((foodItem) => foodItem.dishstatus == "True")
              .map((foodItem) => (
                <Col sm={4}>
                  <Food_Item
                    foodItem={foodItem}
                    onOrderItemClick={orderItemHandler}
                  />
                </Col>
              ))
          ) : (
            <b> No food items available for this Kitchen.</b>
          )}
        </Row>
      </Container>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Food_Selection;
