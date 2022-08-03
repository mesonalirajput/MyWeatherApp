import {BlurView} from 'expo-blur';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../Components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const InitialScreen = props => {
  let {locations, loading, currentCity} = props.cdata;
  // console.log('cdata: ', props.cdata);
  const renderLocationCard = ({item}) => <RenderLocationCardItem item={item} />;

  // console.log('init: ', locations);

  return (
    <View style={styles.initialScreen}>
      <Header title={'Weather'} />
      {loading ? (
        <View style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <View style={styles.flatlist__view}>
          <FlatList
            data={locations}
            renderItem={renderLocationCard}
            keyExtractor={(item, idx) => {
              return item?.id || idx.toString();
            }}
          />
        </View>
      )}
    </View>
  );
};

const RenderLocationCardItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MainScreen', {item})}>
      <BlurView intensity={50} style={styles.renderLocationCardItem}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Entypo name={'location-pin'} size={30} color={'#006bb3'} />
          <Text style={{fontSize: 25, fontWeight: '500'}}>{item?.cCity}</Text>
        </View>
        <Text
          style={{
            fontSize: 35,
            marginRight: 15,
            fontWeight: '600',
            color: '#006bb3',
          }}>
          16°c
        </Text>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  initialScreen: {
    backgroundColor: '#4db8ff',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  flatlist__view: {
    display: 'flex',
    paddingTop: 30,
    paddingLeft: 20,
  },
  renderLocationCardItem: {
    display: 'flex',
    width: '95%',
    height: 70,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default InitialScreen;
