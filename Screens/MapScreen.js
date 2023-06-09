import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen({ route }) {
  const coordinates = route.params.coordinates;
  const title = route.params.title;
  const location = route.params.location;
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={
          coordinates.latitude && coordinates.longitude
            ? coordinates
            : currentLocation
        }
        showsUserLocation={true}
      >
        {coordinates.latitude && coordinates.longitude ? (
          <Marker
            title={title ? title : "Pic location"}
            coordinate={coordinates}
            description={location ? location : "Pic was taken here"}
          />
        ) : (
          currentLocation && (
            <Marker
              title="You are here"
              coordinate={currentLocation}
              description="Your current location"
            />
          )
        )}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
