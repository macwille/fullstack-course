import React from 'react';
import { View, StyleSheet, Image } from "react-native";
import Text from './Text'
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
    minHeight: "10%",
    backgroundColor: "#fff",
    alignItems: "center"
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  flexBoxItem: {
    padding: 10,
    alignItems: "center"
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  language: {
    backgroundColor: "#3399ff",
    padding: 8,
    margin: 5,
    color: "#fff",
    borderRadius: 8,
  },
  avatarImage: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
  }
});

// Rounds a number larger than 999 to the closest 100 mark and adds the suffix "k".
const thousandRounder = (number) => {
  return Math.abs(number) > 999 ? Math.sign(number) * ((Math.abs(number) / 1000).toFixed(1)) + 'k' : Math.sign(number) * Math.abs(number)
}

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl

}) => {

  return (
    <View testID="repoItem" style={styles.container}>
      <Image style={styles.avatarImage} source=
        {{ uri: ownerAvatarUrl }}
      />
      <Text fontSize="subheading" fontWeight="bold">{fullName}</Text>
      <Text>{description}</Text>
      <View style={styles.language}>
        <Text style={{ textAlign: "center", color: "#fff" }}>{language}</Text>
      </View>
      <View style={styles.flexBox}>
        <View style={styles.flexBoxItem}>
          <Text>Stars</Text>
          <Text fontWeight="bold"> {thousandRounder(stargazersCount)}</Text>
        </View>
        <View style={styles.flexBoxItem}>
          <Text>Forks</Text>
          <Text fontWeight="bold">{thousandRounder(forksCount)}</Text>
        </View>
        <View style={styles.flexBoxItem}>
          <Text>Reviews</Text>
          <Text fontWeight="bold">{thousandRounder(reviewCount)}</Text>
        </View>
        <View style={styles.flexBoxItem}>
          <Text>Rating</Text>
          <Text fontWeight="bold">{ratingAverage}</Text>
        </View>
      </View>
    </View >
  )
}

export default RepositoryItem;