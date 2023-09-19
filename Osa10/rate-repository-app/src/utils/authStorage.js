<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }
  async getAccessToken() {
    return await AsyncStorage.getItem(`${this.namespace}:token`);
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);

=======
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async setAccessToken(accessToken) {
    return await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
  }

  async getAccessToken() {
    return await AsyncStorage.getItem(`${this.namespace}:accessToken`);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
>>>>>>> c6e86e71869049c8bafb86261dd303cb28d6c764
  }
}

export default AuthStorage;