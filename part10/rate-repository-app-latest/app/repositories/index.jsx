import { View, StyleSheet } from 'react-native';
import RepositoryList from '../../src/components/RepositoryList';
import HomePage from '../index';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
    }
});


const Repositories = () => {
    return (
        <HomePage>
            <View style={styles.container}>
                <RepositoryList />
            </View>
        </HomePage>
    );
};

export default Repositories;