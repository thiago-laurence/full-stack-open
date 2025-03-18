import { View, StyleSheet } from 'react-native';
import RepositoryList from '../../src/components/Repositories/RepositoryList';
import HomePage from '../index';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
    }
});


const RepositoriesPage = () => {
    return (
        <HomePage>
            <View style={styles.container}>
                <RepositoryList />
            </View>
        </HomePage>
    );
};

export default RepositoriesPage;