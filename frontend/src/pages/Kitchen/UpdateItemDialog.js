/* Author: Tanuj Sobti (B00864990) */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { DropzoneArea } from "material-ui-dropzone";
import { Button, FormControl, makeStyles } from "@material-ui/core";
import Axios from "axios";
import { useKitchen } from "../../context/kitchen-context";

const mealTypes = ["Breakfast", "Snack", "Lunch", "Dinner"];

const useStyles = makeStyles((theme) => ({
  dropZoneArea: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    minHeight: 200,
  },
}));

 /* Renders the dailog box for updating the item */

function UpdateItemDialog({ foodItem, open, handleClose }) {
  const {kitchenId, setFoodItems} = useKitchen();
  const classes = useStyles();
  const [mealType, setMealType] = React.useState(foodItem.mealtype);
  const [image, setImage] = React.useState("");
  const handleFileUpload = (files) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        setImage(reader.result);
      },
      false
    );

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      _id: foodItem._id,
      dishname: form.title.value,
      dishRating: foodItem.dishRating,
      Image: image,
      dishcost: `${form.cost.value}`,
      mealtype: mealType,
      dishstatus: "True",
      delivery: form.delivery.value,
    };
    
    /* API call for updating the details of the dish in the Kitchen */
    Axios.put("https://dalffins.herokuapp.com/kitchen/updatedish?kitchenId="+ kitchenId, formData).then(
      (response) => {
        setFoodItems(response.data);
        handleClose(formData);
      }
    );
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Update Dish</DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            label="Dish Name"
            type="text"
            fullWidth
            defaultValue={foodItem.dishname}
          />
          <TextField
            margin="dense"
            id="cost"
            label="Cost"
            type="text"
            fullWidth
            defaultValue={foodItem.dishcost}
          />
          <TextField
            margin="dense"
            id="mealType"
            select
            label="Select"
            value={mealType}
            onChange={(event) => setMealType(event.target.value)}
            helperText="Please select meal type"
            defaultValue={foodItem.mealtype}
          >
            {mealTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="delivery"
            label="Delivery"
            type="text"
            fullWidth
            defaultValue={foodItem.delivery}
          />
          <FormControl fullWidth>
            <DropzoneArea
              initialFiles={[foodItem.Image]}
              filesLimit={1}
              dropzoneClass={classes.dropZoneArea}
              dropzoneText={"Drag and drop a dish image here or click"}
              acceptedFiles={["image/*"]}
              onChange={handleFileUpload}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UpdateItemDialog;
