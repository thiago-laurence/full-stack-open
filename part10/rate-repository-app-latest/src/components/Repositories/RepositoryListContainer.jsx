import { router } from 'expo-router';
import { FlatList, Pressable } from 'react-native';
import RepositoryInfo from './RepositoryInfo';
import ItemSeparator from './ItemSeparator';

const RepositoryListContainer = ({ repositories, onEndReach }) => {
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
  
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({
            pathname: 'repositories/[id]',
            params: { id: item.id }
          })}>
            <RepositoryInfo item={item} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
};

export default RepositoryListContainer;