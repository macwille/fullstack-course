import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link
          to={`/`}
          style={styles.link}
        >
          <Text style={styles.linkText}>Repositories</Text>
        </Link>
        <Link
          to={`/sign`}
          style={styles.link}
        >
          <Text style={styles.linkText}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;