import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../Components/Header';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Divider} from 'react-native-elements';
import {BlurView} from 'expo-blur';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';

const MainScreen = () => {
  const [hourlyData, setHourlyData] = useState([' ', '', '', '', '', '']);
  const route = useRoute();
  const [current, setCurrent] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [tdyWeather, setTdyWeather] = useState(true);
  let item = route?.params?.item || {};
  // console.log(route?.params?.item);

  useEffect(() => {
    _fetchWeather(item?.lat, item?.lon);
  }, []);

  const _fetchWeather = (lat, lon) => {
    const WeatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alert&appid=6ec7b2ca4d992da292242111ffeddc78`;
    fetch(WeatherURL)
      .then(response => response.json())
      .then(json => {
        setCurrent(json.current);
        setHourly(json.hourly);
        setDaily(json.daily);
        // let cIdx = cities.findIndex(
        //   c => c.lat === cDat.lat && c.lon === cDat.lon,
        // );

        // if (cIdx > -1) {
        //   cities[cIdx].temp = json.current.temp;
        // }
        // setCityArray(cities);

        // setLoading(false);
      })
      .catch(error => {
        console.log(error);
        // setLoading(false);
      });
  };

  // console.log('current: ', current);
  // console.log('hourly: ', hourly);
  // console.log('daily: ', daily);flatlist__container
  const renderItem = ({item}) => <HourlyDataItem hData={item} />;
  const renderDailyWeatherCard = ({item}) => (
    <DailWeatherCardItem dData={item} />
  );
  if (!current?.weather?.length) {
    return (
      <View
        style={StyleSheet.flatten([
          styles.container,
          {alignItems: 'center', justifyContent: 'center'},
        ])}>
        <ActivityIndicator size={'large'} color={'#ffffff'} />
      </View>
    );
  }
  let date = moment(new Date(current?.dt * 1000)).format('MMM Do');
  let day = moment(new Date(current?.dt * 1000)).format('ddd');
  let feels_like = parseInt(current?.feels_like - 273.15);
  let sunrise = moment(new Date(current?.sunrise * 1000)).format('h:mm a');
  let sunset = moment(new Date(current?.sunset * 1000)).format('h:mm a');
  let temp = parseInt(current?.temp - 273.15);
  let cweat = current?.weather[0]?.main;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView__container}>
        <Header title={'Weather'}></Header>
        <View
          style={{
            display: 'flex',
            width: '100%',
            // height: '60%',
            // backgroundColor: '#fff',
          }}>
          <View style={styles.tempcontainer}>
            <View style={styles.iconcontainer}>
              <McIcon name={'weather-cloudy'} size={45} color={'#006bb3'} />
              <View style={styles.day__date__container}>
                <Text style={styles.today__text}>Today</Text>
                <Text style={styles.day__date__text}>
                  {day}, {date}
                </Text>
              </View>
            </View>
            <View style={styles.tempContainer}>
              <View style={styles.temp}>
                <Text style={styles.temp__text}>{temp}</Text>
                <Text style={styles.temp__text__cel}>°c</Text>
              </View>
              <View style={styles.humidityContainer}>
                <Text
                  style={{fontSize: 13, fontWeight: '500', color: '#006bb3'}}>
                  Feels like: {feels_like}°c
                </Text>
                <Text
                  style={{fontSize: 13, fontWeight: '500', color: '#006bb3'}}>
                  Humidity: {current?.humidity}%
                </Text>
                <Text
                  style={{fontSize: 13, fontWeight: '500', color: '#006bb3'}}>
                  Wind: {current?.wind_speed} mph
                </Text>
              </View>
            </View>
            <Text style={styles.weather}>{cweat}</Text>
            <View style={styles.locationcontainer}>
              <EvilIcons name={'location'} size={20} color={'#006bb3'} />
              <Text style={styles.location}>
                {item?.cCity}, {item?.cState}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              width: '100%',
              height: '3%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Divider
              color="#006bb3"
              style={{
                width: '93%',
                // marginBottom: 20,
                // marginTop: 5,
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '29%',
              width: '100%',
              marginTop: 5,
              marginBottom: 5,
            }}>
            <BlurView intensity={50} style={styles.blurContainer}>
              <View style={styles.windContainer}>
                <McIcon name="weather-windy" size={45} color={'#006bb3'} />
                <Text style={styles.undericon__text}>
                  {current?.wind_speed} mph
                </Text>
                <Text
                  style={{fontSize: 13, color: '#006bb3', fontWeight: '600'}}>
                  Wind
                </Text>
              </View>
              <View style={styles.windContainer}>
                <McIcon name="weather-sunset-up" size={45} color={'#006bb3'} />
                <Text style={styles.undericon__text}>{sunrise}</Text>
                <Text
                  style={{fontSize: 13, color: '#006bb3', fontWeight: '600'}}>
                  Sunrise
                </Text>
              </View>
              <View style={styles.windContainer}>
                <McIcon
                  name="weather-sunset-down"
                  size={45}
                  color={'#006bb3'}
                />
                <Text style={styles.undericon__text}>{sunset}</Text>
                <Text
                  style={{fontSize: 13, color: '#006bb3', fontWeight: '600'}}>
                  Sunset
                </Text>
              </View>
            </BlurView>
          </View>
          <View
            style={{
              display: 'flex',
              width: '100%',
              height: '3%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Divider
              color="#006bb3"
              style={{
                width: '95%',
                // marginBottom: 15,
                // marginTop: 20,
              }}
            />
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            // height: '40%',
            width: '100%',
            marginTop: 25,
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-evenly',
              marginBottom: 15,
              // height: '10%',
            }}>
            <TouchableOpacity onPress={() => setTdyWeather(true)}>
              <Text style={{width: '100%'}}>Today</Text>
            </TouchableOpacity>
            <Divider color="#006bb3" orientation="vertical" width={1} />
            <TouchableOpacity onPress={() => setTdyWeather(false)}>
              <Text style={{width: '100%'}}>Next 7 days...</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flatlist__container}>
            {tdyWeather ? (
              <FlatList
                data={hourly}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
              />
            ) : (
              // <Text>yuhuu...</Text>
              <FlatList
                data={daily}
                renderItem={renderDailyWeatherCard}
                keyExtractor={(item, idx) => {
                  return item?.id || idx.toString();
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const HourlyDataItem = ({hData}) => {
  let htime = moment(new Date(hData?.dt * 1000)).format('h:mm a');
  let htemp = parseInt(hData?.temp - 273.15);
  return (
    <BlurView intensity={50} style={styles.hourlydata__blurview}>
      <Text style={{fontSize: 14}}>{htime}</Text>
      <McIcon name={'weather-cloudy'} size={40} color={'#006bb3'} />
      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          marginTop: 5,
          marginBottom: 5,
        }}>
        {htemp}°c
      </Text>
      <Text style={{fontSize: 15, fontWeight: '600', color: '#006bb3'}}>
        {hData?.weather[0]?.main}
      </Text>
    </BlurView>
  );
};

const DailWeatherCardItem = ({dData}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 40,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <View>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
          Sunday
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 15, fontWeight: '600', color: '#fff'}}>
          20°c{' '}
        </Text>
        <Text style={{fontSize: 15, fontWeight: '500'}}> 21°c</Text>
      </View>
      <View>
        <McIcon name={'weather-cloudy'} size={26} color={'#006bb3'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView__container: {
    // backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#4db8ff',
    flex: 1,
    // height: '100%',
    alignItems: 'center',
  },
  tempcontainer: {
    display: 'flex',
    alignItems: 'center',
    // height: '65%',
    // backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  day__date__container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  today__text: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  day__date__text: {
    color: '#006bb3',
    fontSize: 13,
    fontWeight: '600',
  },
  tempContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  temp: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 7,
  },
  temp__text: {
    fontSize: 95,
    color: '#ffffff',
    fontWeight: '500',
  },
  temp__text__cel: {
    fontSize: 40,
    color: '#ffffff',
  },
  humidityContainer: {
    display: 'flex',
    marginLeft: 5,
    marginTop: 15,
  },
  weather: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  locationcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 13,
    color: '#006bb3',
    fontWeight: '600',
  },
  blurContainer: {
    display: 'flex',
    width: '90%',
    height: '100%',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#1aa3ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  windContainer: {
    display: 'flex',
    alignItems: 'center',
    // height: '80%',
    justifyContent: 'space-evenly',
  },
  undericon__text: {
    fontSize: 16,
    fontWeight: '600',
  },
  flatlist__container: {
    display: 'flex',
    // height: '90%',
    width: '85%',
    paddingLeft: 2,
  },
  hourlydata__blurview: {
    display: 'flex',
    // height: 145,
    width: 60,
    marginRight: 18,
    borderRadius: 30,
    // height: '50%',
    borderWidth: 0.5,
    borderColor: '#1aa3ff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 10,
  },
  daily__Container: {
    display: 'flex',
  },
  daily__Container__BlurView: {},
});

export default MainScreen;
