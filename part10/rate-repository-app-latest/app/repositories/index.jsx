import { View, StyleSheet } from 'react-native';
import HomePage from '../index';
import RepositoryList from '../../src/components/Repositories/RepositoryList';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
    }
});


const Page = () => {
    return (
        <HomePage>
            <View style={styles.container}>
                <RepositoryList />
            </View>
        </HomePage>
    );
};

export default Page;