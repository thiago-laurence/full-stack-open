import { useQuery } from "@apollo/client";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from 'react-native';
import HomePage from "../index";
import RepositoryItem from "../../src/components/Repositories/RepositoryItem";
import { GET_REPOSITORY } from "../../src/graphql/queries";


const WrappedPage = () => {
    const { id } = useLocalSearchParams();
    const result = useQuery(GET_REPOSITORY, {
        variables: { id }
    });

    if (result.loading) {
        return (
            <Text>Loading...</Text>
        );
    }
    const repository = result.data.repository;

    return (
        <RepositoryItem item={repository} />
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