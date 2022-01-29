import React from 'react';
import { Text, View, StyleSheet, Image } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
    minHeight: "15%",
    backgroundColor: "#fff",
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
  flexBoxItem: {
    padding: "4%"
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  subtitleText: {
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  languageText: {
    backgroundColor: "#3399ff",
    padding: 3,
    margin: 10,
    marginLeft: "30%",
    marginRight: "30%",
    color: "#fff",
    borderRadius: 8,
    textAlign: "center"
  },
  avatarImage: {
    width: 60,
    height: 60,
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
    <View style={styles.container}>
      <Image style={styles.avatarImage} source=
        {{ uri: ownerAvatarUrl }}
      />
      <Text style={styles.headerText}>{fullName}</Text>
      <Text style={styles.subtitleText}>{description}</Text>
      <Text style={styles.languageText}>{language}</Text>
      <View style={styles.flexBox}>
        <View style={styles.flexBoxItem}>
          <Text>Stars</Text>
          <Text style={styles.boldText} > {thousandRounder(stargazersCount)}</Text>
        </View>
        <View style={styles.flexBoxItem}>
          <Text>Forks</Text>
          <Text style={styles.boldText} >{thousandRounder(forksCount)}</Text>
        </View>
        <View style={styles.flexBoxItem}>
          <Text>Reviews</Text>
          <Text style={styles.boldText} >{thousandRounder(reviewCount)}</Text>
        </View>
        <View style={styles.flexBoxItem}>
          <Text>Rating</Text>
          <Text style={styles.boldText} >{ratingAverage}</Text>
        </View>
      </View>
    </View >
  )
}

export default RepositoryItem;