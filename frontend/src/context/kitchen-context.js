import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const KitchenContext = React.createContext()

function useKitchen() {
  return useContext(KitchenContext);
}

function KitchenProvider(props) {
  const [kitchenName, setKitchenName] = useState("");
  const [kitchenImages, setKitchenImages] = useState([]);
  const [kitchenId, setKitchenId] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasKitchen, setHasKitchen] = useState(true);
  const {userId} = props
  const history = useHistory();

  const fetchKitchen = async (userId) => {
    if(userId)
    {
    const res = await axios.get(
    `https://dalffins.herokuapp.com/kitchen/getKitchen?userId=${userId}`
  );
  if(res.data.length > 0) {
    const kitchen = res.data[0];
    console.log(res);
    setHasKitchen(true);
    setKitchenName(kitchen.kitchenName);
    setKitchenId(kitchen._id);
    setKitchenImages(kitchen.kitchenImages);
    setFoodItems(kitchen.foodItems);
  } else {
    setHasKitchen(false)
  }
  setIsLoading(false);
} else {
    window.alert("Please login in to dalffins. Thank you  !!!");
    history.push("/login");
  }
};

  useEffect(() => {
    setIsLoading(true) 
    fetchKitchen(userId);
  }, [userId, hasKitchen]);
  const value = React.useMemo(() => ({kitchenName, setKitchenName, kitchenImages, setKitchenImages, foodItems, setFoodItems, kitchenId, hasKitchen, setHasKitchen}), [kitchenName, kitchenImages, foodItems, kitchenId, hasKitchen])

  if(isLoading) return null;
  return <KitchenContext.Provider value={value} {...props}/>
}

export {KitchenProvider, useKitchen}