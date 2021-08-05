/* Author: Tanuj Sobti (B00864990) */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DishItem from "./DishItem";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import AddItemDialog from "./AddItemDialog";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useKitchen } from "../../context/kitchen-context";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1201 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1200, min: 1025 },
    items: 4,
  },
  laptop: {
    breakpoint: { max: 1024, min: 769 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 481 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
};

/* Renders all the dish mapped to the logged in user's unique UserID */
function DishList(props) {
  const {foodItems} = useKitchen();
  const [open, setOpen] = React.useState(false);
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const addItem = () => {
    setOpen(false);
    setShowSnackBar(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackBarClose = () => {
    setShowSnackBar(false);
  };
  
  /* Iterates over foodItem array for fetching all the dish details . */
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add dish
        </Button>
      </div>
      <Carousel responsive={responsive}>
        {foodItems.map((foodItem) => (
          <DishItem
            foodItem={foodItem}
            key={foodItem._id}
          />
        ))}
      </Carousel>
      {open ? (
        <React.Suspense fallback={<p>loading</p>}>
          <AddItemDialog
            open={open}
            addItem={addItem}
            handleClose={handleClose}
            nextId={foodItems[foodItems.length - 1]}
            Email={props.email}
          />
        </React.Suspense>
      ) : null}
      <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity="success">
          New dish added successfully !!
        </Alert>
      </Snackbar>
    </>
  );
}
export default DishList;
