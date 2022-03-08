import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  CurrentRenderContext,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './Screens/MainScreen';
import InitialScreen from './Screens/InitialScreen';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import Geocoder from 'react-native-geocoding';

const Stack = createNativeStackNavigator();

const App = () => {
  const [currentlongitude, setCurrentLongitude] = useState();
  const [currentlatitue, setCurrentLatitude] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [currentCity, setCurrentCity] = useState();
  const [currentState, setCurrentState] = useState();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _fetchCurrentLocation();
  }, []);

  const _fetchCurrentLocation = () => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!',
        );
        return;
      }
      try {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let {latitude, longitude} = location.coords;
        setCurrentLongitude(longitude);
        setCurrentLatitude(latitude);
        _fetchReverseGeocoding(latitude, longitude);
        // console.log('currentLatitude: ', currentlatitue);
      } catch (error) {
        console.log('initialScreen.js > try catch > ', error);
      }
    })();
  };

  const _fetchReverseGeocoding = (lat, lon) => {
    var requestOptions = {
      method: 'GET',
    };
    // console.log('lat: ', lat);
    // console.log('lon: ', lon);
    const geoCodingAPI = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=d24b7f791b8246dca81c6b85513ecd43`;

    fetch(geoCodingAPI, requestOptions)
      .then(response => response.json())
      .then(result => {
        let cState = result.features[0].properties.state;
        let cCity = result.features[0].properties.city;
        setCurrentCity(cCity);
        setCurrentState(cState);
        let nLocations = [
          ...locations,
          {cCity: cCity, lat, lon, cState: cState},
        ];
        setLocations(nLocations);
        setLoading(false);
      })
      .catch(error => console.log('error', error));
  };

  let data = {
    locations,
    currentCity,
    loading,
  };

  // console.log('currentCity: ', currentCity);
  // console.log('locations: ', locations);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen name="location" options={{headerShown: false}}>
          {props => <InitialScreen {...props} cdata={data} />}
        </Stack.Screen>
        <Stack.Screen name="MainScreen" options={{headerShown: false}}>
          {props => <MainScreen />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
