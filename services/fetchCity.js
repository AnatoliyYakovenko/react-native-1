import Geocode from 'react-geocode';
import { REACT_APP_MAP_API_KEY } from "react-native-dotenv";

export const getCity = async (latitude, longitude) => {

  Geocode.setApiKey(REACT_APP_MAP_API_KEY);

  let city = {
    cityName: '',
    country: '',
  };
  try {
    const response = await Geocode.fromLatLng(`${latitude}`, `${longitude}`);

    for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (
        let j = 0;
        j < response.results[0].address_components[i].types.length;
        j++
      ) {
        switch (response.results[0].address_components[i].types[j]) {
          case 'locality':
            city.cityName = response.results[0].address_components[i].long_name;
            break;
          case 'country':
            city.country = response.results[0].address_components[i].long_name;
            break;
          default:
        }
      }
    }
    return city;
  } catch (error) {
    console.log(error);
  }
  return city;
};
