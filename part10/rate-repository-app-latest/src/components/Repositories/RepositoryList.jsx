import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useDebouncedCallback } from 'use-debounce';
import { FlatList, Pressable, TextInput, StyleSheet } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryInfo from './RepositoryInfo';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  inputSearch: {
    margin: 10,
    padding: 10,
    border: '1px solid black',
    borderRadius: 5,
    backjgroundColor: 'white',
  }
});

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("LATEST");
  const [searchKeyword, setSearchKeyword] = useState("");
  const debounced = useDebouncedCallback((value) => {
      setSearchKeyword(value);
    },
    1000
  );
  const orderOptions = {
    LATEST: { orderBy: "CREATED_AT", orderDirection: "ASC" },
    HIGHEST: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    LOWEST: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  };
  const query = {
    searchKeyword,
    ...orderOptions[selectedOrder],
  }
  const { repositories, loading } = useRepositories(query);
  const repositoryNodes = loading ? [] : repositories.edges.map(edge => edge.node)

  return (
    <>
      <TextInput
        placeholder="Search..."
        style={styles.inputSearch}
        onChangeText={(text) => debounced(text)}
      />
      <Picker
          selectedValue={selectedOrder}
          onValueChange={(itemValue) => 
            setSelectedOrder(itemValue)
          }>
          <Picker.Item label="Select an item..." value="" enabled={false} />
          <Picker.Item label="Latest repositories" value="LATEST" />
          <Picker.Item label="Highest rated repositories" value="HIGHEST" />
          <Picker.Item label="Lowest rated repositories" value="LOWEST" />
      </Picker>
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
      />
    </>
  );
};

export default RepositoryList;