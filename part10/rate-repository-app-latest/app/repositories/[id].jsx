import { useLocalSearchParams } from "expo-router";
import { View } from 'react-native';
import useRepository from "../../src/hooks/useRepository";
import HomePage from "../index";
import SingleRepository from "../../src/components/Repositories/SingleRepository";


const WrappedPage = () => {
    const { id } = useLocalSearchParams();
    const query = {
        id,
        first: 3,
    }
    const { repository, fetchMore } = useRepository(query);
    const onEndReach = () => { fetchMore(); };

    return (
        <SingleRepository repository={repository} onEndReach={onEndReach} />
    );
}


const RepositoryItemPage = () => {
    return (
        <HomePage>
            <View>
                <WrappedPage />
            </View>
        </HomePage>
    );
}

export default RepositoryItemPage;