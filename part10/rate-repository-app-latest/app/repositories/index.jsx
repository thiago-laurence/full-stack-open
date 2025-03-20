import { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDebouncedCallback } from 'use-debounce';
import HomePage from '../index';
import RepositoryList from '../../src/components/Repositories/RepositoryList';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
    }
});


const Page = () => {
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
      first: 4,
    }

    return (
        <HomePage>
            <View style={styles.container}>
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
                <RepositoryList query={query} />
            </View>
        </HomePage>
    );
};

export default Page;