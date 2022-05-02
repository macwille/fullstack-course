import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import useAuthStorage from "../hooks/useAuthStorage";
import { useEffect, useState } from 'react';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    minHeight: "12%",
  },
  link: {
    alignItems: "center",
    padding: 10,
  },
  linkText: {
    color: "#fff",
    fontSize: 22,
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const [token, setToken] = useState(null);


  useEffect(async () => {
    const storageToken = await authStorage.getAccessToken();
    console.log('Storage token', storageToken);
    console.log('token', token);
    setToken(storageToken);
  }, []);


  const conditionalRender = () => {
    if (token === null) {
      return (
        <Link
          to={`/sign`}
          style={styles.link}
        >
          <Text style={styles.linkText}>Sign in</Text>
        </Link>
      )
    }
    return (
      <Link
        to={`/logout`}
        style={styles.link}
      >
        <Text style={styles.linkText}>Sign out</Text>
      </Link>
    )
  };


  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link
          to={`/`}
          style={styles.link}
        >
          <Text style={styles.linkText}>Repositories</Text>
        </Link>
        {conditionalRender()}
      </ScrollView>
    </View>
  );
};

export default AppBar;