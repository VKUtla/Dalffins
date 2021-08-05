import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import Axios from "axios";
import { useKitchen } from '../../context/kitchen-context';
import { set } from 'react-hook-form';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 4),
  },
}));

export default function CreateKitchen({userId}) {
    const {setHasKitchen} = useKitchen();
  const classes = useStyles();
  const [images, setImages] = React.useState([]);

  const handleFileUpload = (files) => {
      setImages([]);
    [].forEach.call(files, readFileAsDataUrl)
  };

  function readFileAsDataUrl(file) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        setImages((images) => [...images, reader.result]);
      },
      false
    );
    reader.readAsDataURL(file)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
        userId,
        kitchenName: form.kitchenName.value,
        kitchenImages: images,
    };
    /* API call adding the Kitchen into the backend system */
  
    Axios.post("https://dalffins.herokuapp.com/kitchen/createKitchen", formData).then(
      (response) => {
        setHasKitchen(true)
      }
    );
  };

  return (
<Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Kitchen
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="kitchenName"
                variant="outlined"
                required
                fullWidth
                id="kitchenName"
                label="Kitchen Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
            <DropzoneArea
              filesLimit={2}
              dropzoneClass={classes.dropZoneArea}
              dropzoneText={"Drag and drop kitchen images here or click"}
              acceptedFiles={["image/*"]}
              onChange={handleFileUpload}
            />
          </FormControl>
            </Grid>
            </Grid>            
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      </Container>
  );
}