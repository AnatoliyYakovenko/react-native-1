import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  const title = route.params.title;
  const location = route.params.location;
  const coordinates = route.params.coordinates;

  return coordinates.latitude && coordinates.longitude ? (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...coordinates,
        }}
        showsUserLocation={true}
      >
        <Marker
          title={title ? title : "Pic location"}
          coordinate={coordinates}
          location={location ? location : "Pic was taken here"}
        />
      </MapView>
    </View>
  ) : (
    <MapView
      style={styles.mapStyle}
      region={{
        ...location,
      }}
      showsUserLocation={true}
    >
      {location && (
        <Marker
          title="You are here"
          coordinate={location}
          location="Your current location"
        />
      )}
    </MapView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
