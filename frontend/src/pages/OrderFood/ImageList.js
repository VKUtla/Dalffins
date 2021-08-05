import ImageItem from './ImageItem';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridContainer : {
    paddingLeft: 20,
    paddingRight: 20
  },
});

function ImageList(props) {
  
  const classes = useStyles();
  return (
      <Grid container spacing={4} className = {classes.gridContainer} >
      {props.vendors.map(vendor => 
      <Grid item xs={4} sm={4} md={4} >
         <ImageItem vendor={vendor}/>
        </Grid> )}
      </Grid>
  );
}

export default ImageList;