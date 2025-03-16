import { View, StyleSheet } from 'react-native';
import RepositoryList from '../../src/components/RepositoryList';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
    }
});


const Repositories = () => {
    return (
        <View style={styles.container}>
            <RepositoryList />
        </View>
    );
};

export default Repositories;