import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from "../components/RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ repositories, loading }) => {

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];


  if (loading !== false) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={e => <RepositoryItem {...e.item} />}
    />
  );
};

export default RepositoryList;