/* Author: Tanuj Sobti (B00864990) */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Rating from "@material-ui/lab/Rating";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Axios from "axios";
import UpdateItemDialog from "./UpdateItemDialog";
import { useKitchen } from "../../context/kitchen-context";

const FoodItem = styled(Card)`
  min-height: 300px;
`;

/* Renders the individual dish component of the Kitchen Feature */
function DishItem({ foodItem}) {
  const {kitchenId,foodItems, setFoodItems} = useKitchen();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const {_id:foodItemId} = foodItem;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  /* API call for removing the dish from Kitchen */
  const handleConfirmRemove = () => {
    Axios.delete(`https://dalffins.herokuapp.com/kitchen/removedish?kitchenId=${kitchenId}&foodItemId=${foodItemId}`).then((response) => {
      setOpen(false);
      setFoodItems(foodItems.filter((item) => item._id !== foodItemId));
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    setUpdateDialogOpen(true);
    setAnchorEl(null);
  };

  /* API call for Enabling/Disabling the dish in the Kitchen */
  const changeDishStatus = (dishStatus) => {
    Axios.put("https://dalffins.herokuapp.com/kitchen/updatedishstatus?kitchenId="+ kitchenId, {
      _id : foodItemId, 
      dishstatus: dishStatus }).then(
      (response) => {
        setFoodItems(response.data)
        handleClose();
      }
    );
  };
 
  const handleUpdateClose = (formData) => {
    setUpdateDialogOpen(false);
  };
  return (
    <>
      <FoodItem
        style={{ opacity: foodItem.dishstatus === "True" ? "1" : "0.5" }}
      >
        <CardHeader
          action={
            <>
              <IconButton
                aria-label="settings"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={"menu" + foodItem.dishID}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleUpdate}>Update</MenuItem>
                <MenuItem onClick={() => changeDishStatus("True")}>Enable</MenuItem>
                <MenuItem onClick={() => changeDishStatus("False")}>Disable</MenuItem>
                <MenuItem onClick={handleRemove}>Remove</MenuItem>
              </Menu>
            </>
          }
          title={foodItem.dishname}
          subheader={
            <Rating
              name="read-only"
              value={Number(foodItem.dishRating)}
              readOnly
            />
          }
          titleTypographyProps={{
            variant: "body1",
            color: "textPrimary",
          }}
        />
        <CardMedia
          style={{ height: 0, padding: "25%" }}
          image={foodItem.Image}
          title="mydish"
        />
        <CardContent>
          <Typography variant="body2" color="textPrimary">
            Cost: <span style={{ float: "right" }}>${foodItem.dishcost}</span>
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Meal Type:{" "}
            <span style={{ float: "right" }}>{foodItem.mealtype}</span>
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Delivery:{" "}
            <span style={{ float: "right" }}>{foodItem.delivery}</span>
          </Typography>
        </CardContent>
      </FoodItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible. If you are planning to add this item
            again in the future, you can choose to disable the item instead of
            removal.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemove} color="primary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      {updateDialogOpen ? (
        <React.Suspense fallback={<p>loading</p>}>
          <UpdateItemDialog
            open={updateDialogOpen}
            handleClose={handleUpdateClose}
            foodItem={foodItem}
          />
        </React.Suspense>
      ) : null}
    </>
  );
}

export default DishItem;
