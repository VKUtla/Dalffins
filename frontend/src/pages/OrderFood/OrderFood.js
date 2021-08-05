import { useEffect, useState } from 'react';
import Axios from 'axios';
import ImageList from './ImageList';
import { TextField } from '@material-ui/core';


function OrderFood() {

  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  useEffect(() => {
    async function fetchData() {
     const res = await Axios.get("https://dalffins.herokuapp.com/foodSelection/vendors/all") 
     setVendors(res.data.data);
     setFilteredVendors(res.data.data)
    }
fetchData();
  },[]);

  if(!vendors) return null;
  return (
    <div className="App">
       <TextField id="filled-search" label="" type="search" variant="outlined" placeholder="Enter name" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
       <div style={{paddingTop:40}} >
       <ImageList vendors={filteredVendors}/>
       </div>
    </div>
  );
}

export default OrderFood;