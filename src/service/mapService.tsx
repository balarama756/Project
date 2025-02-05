import axios from "axios";
import { GOOGLE_MAP_API } from "./config";
import { updateUserLocation } from "./authService";



export const reverseGeocode = async (latitude: number,longitude:number, setUser: any) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API}`
    )
    // if(response.data.status=='ok'){
    //     const address=response.data.results[0].formated_address;
    //     updateUserLocation({livelocation:{latitude,longitude},address},setUser)
    // } else{
    //     console.error("Geo Code Failed",)
    // }
    if (response.data.status === 'OK') {
      const address = response.data.results[0].formatted_address;
      console.log("Address from Geocode API:", address);
    
      // Update the user's location in the state
      updateUserLocation({ livelocation: { latitude, longitude }, address }, setUser);
    } else {
      console.error("Geo Code Failed, Status:", response.data.status);
    }
    
  } catch (error) {
    console.log("Geo Code Error", error);
    
  }
};