import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from "../components/RepositoryItem";
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  console.log(repositories);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={e => <RepositoryItem {...e.item} />}
    />
  );
};

export default RepositoryList;