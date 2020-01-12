import React, { useRef } from "react";
import { Image, View, } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Animatable from "react-native-animatable";

// Import theme
import { Theme } from "../../constants/Theme";
import { mapStyle } from "../../../StylesMap";

// Import components
import Button from "../../components/button/Button";

// Import marker
import markerUserImage from "../../../assets/images/img-marker-user.png";

export const Map = props => {
  const { children, location, mapView } = props;
  const markerUser = useRef(null);

  const centerToLocation = () => {
    mapView.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: location.latitudeDelta,
      longitudeDelta: location.longitudeDelta
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        ref={mapView}
        customMapStyle={mapStyle}
        loadingBackgroundColor={Theme.COLORS.colorMainDark}
        loadingIndicatorColor={Theme.COLORS.colorSecondary}
        loadingEnabled
        initialRegion={location}
        showsCompass={false}
        showsMyLocationButton={false}
        onRegionChangeComplete={props.onLocationChange}
      >
        {props.centerLocation && (
          <Marker.Animated ref={markerUser} coordinate={location}>
            <Image
              style={{
                width: 35,
                height: 35,
                resizeMode: "contain"
              }}
              source={markerUserImage}
            />
          </Marker.Animated>
        )}
        {children}
      </MapView>
      {props.centerLocation && (
         <Animatable.View
          style={{
            position: "absolute",
            bottom: 40,
            right: 15,
            backgroundColor: Theme.COLORS.colorMainAlt,
            borderRadius: 200,
            padding: 10
          }}
          animation="zoomIn"
          iterationCount={1}
        >
          <Button
            iconName="my-location"
            iconSize={35}
            iconColor={Theme.COLORS.colorSecondary}
            onPress={centerToLocation}
          />
       </Animatable.View>
      )}
    </View>
  );
};

export default Map;
