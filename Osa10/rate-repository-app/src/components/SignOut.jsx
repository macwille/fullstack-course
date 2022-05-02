import { View, Button, StyleSheet } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  fieldTitle: {
    marginLeft: 12,
    fontSize: 14,
  },
  submit: {
    fontSize: 14,
    marginLeft: 90,
    marginRight: 90,
    padding: 10,
  },
  errorMessage: {
    marginLeft: 12,
    paddingBottom: 12,
    fontSize: 14,
    color: '#d73a4a'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});


const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    try {
      const storageToken = await authStorage.removeAccessToken();
      apolloClient.resetStore();
      console.log('log out', storageToken);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.submit}>
        <Button onPress={() => handleLogout()} title="Sign out" />
      </View>
    </View>
  )

};

export default SignOut;