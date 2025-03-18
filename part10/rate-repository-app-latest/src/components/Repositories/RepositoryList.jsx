import { router } from 'expo-router';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  const repositoryNodes = loading ? [] : repositories.edges.map(edge => edge.node)

  return (
    <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({
            pathname: 'repositories/[id]',
            params: { id: item.id }
          })}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;