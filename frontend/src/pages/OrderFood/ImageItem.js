import React from 'react'
import {useLocation } from 'react-router-dom';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";

export default function ProfileDetails(props) {

  const history = useHistory(); 
  async function handleVendorClick(id) {
    history.push("/foodSelectionUI/" + id);
  }

    return (
        <div>
             <Card variant="outlined" onClick={() => handleVendorClick(props.vendor._id)} >
             <CardContent style={{padding: 0}}>
             <img style={{width: "100%", height: "25vh"}} src={props.vendor.kitchenImages[0]} alt={props.vendor._id} /> 
             <h1>{props.vendor.kitchenName}</h1>
             </CardContent>
      </Card>
        </div>
    )
}
