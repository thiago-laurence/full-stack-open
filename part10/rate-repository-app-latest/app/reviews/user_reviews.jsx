import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { GET_CURRENT_USER } from "../../src/graphql/queries";
import HomePage from "../index";
import ItemSeparator from "../../src/components/Repositories/ItemSeparator";
import ReviewItem from "../../src/components/Repositories/ReviewItem";

const UserReviews = () => {
    const { loading, data, refetch } = useQuery(GET_CURRENT_USER, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true },
    });
    if (loading) {
        return null;
    }
    const reviews = data.me.reviews.edges.map(edge => edge.node);

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} own={ {ok: true, refetch: refetch} } />}
            keyExtractor={({ id }) => id}
        />
    );
}

const Page = () => {
    return (
        <HomePage>
            <UserReviews />
        </ HomePage>
    );
}

export default Page;