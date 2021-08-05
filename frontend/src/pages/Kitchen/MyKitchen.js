/* Author: Tanuj Sobti (B00864990) */
import React from "react";
import styled from "@emotion/styled";
import DishList from "./DishList";
import Carousel from "react-bootstrap/Carousel";
import { useKitchen } from "../../context/kitchen-context";
import CreateKitchen from "./CreateKitchen";

const KitchenImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;


/* Main function which loads the Kitchen and DishList component for rendering the Kitchen of the user. */
function MyKitchen({userId, email}) {

  const {kitchenName, kitchenImages, hasKitchen} = useKitchen();
  console.log(userId)
  if(!hasKitchen) return <CreateKitchen userId={userId}/>
  /* Carousel for displaying the Kitchen images on the main page of feature */
  return (
    <>
      <br/>
      <br/>
      <h2>{kitchenName}</h2>
       <Carousel style={{ height: "50vh" }}>
        {kitchenImages.map((image, index) => (
          <Carousel.Item key={index}>
            <KitchenImage
              className="d-block w-100"
              src={image}
              style={{ height: "50vh" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <br />
      <DishList Id={userId} email={email}/>
      <br />
      <br />
    </>
  );
}

export default MyKitchen;
