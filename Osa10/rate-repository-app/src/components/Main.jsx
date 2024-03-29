import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignOut from './SignOut';
import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8"
  },
});

const Main = () => {
  const { repositories, loading } = useRepositories();

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList repositories={repositories} loading={loading} />} exact />
        <Route path="/logout" element={<SignOut />} exact />
        <Route path="/sign" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;