import { useQuery } from "@apollo/client";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from 'react-native';
import HomePage from "../index";
import SingleRepository from "../../src/components/Repositories/SingleRepository";
import { GET_REPOSITORY } from "../../src/graphql/queries";


const WrappedPage = () => {
    const { id } = useLocalSearchParams();
    const result = useQuery(GET_REPOSITORY, {
        variables: { id },
        fetchPolicy: 'cache-and-network'
    });

    if (result.loading) {
        return (
            <Text>Loading...</Text>
        );
    }
    const repository = result.data.repository;

    return (
        <SingleRepository repository={repository} />
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