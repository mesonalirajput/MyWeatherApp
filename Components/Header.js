import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: '#0099ff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  text: {
    color: '#ffffff',
    fontSize: 27,
    fontWeight: 'bold',
  },
});
export default Header;
