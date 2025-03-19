import { FlatList, View } from 'react-native';
import RepositoryInfo from './RepositoryInfo';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';

const SingleRepository = ({ repository }) => {
    const reviews = repository.reviews.edges.map(edge => edge.node);

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => 
                <View>
                    <RepositoryInfo item={repository} />
                    <ItemSeparator />
                </View>
            }
        />
    );
};

export default SingleRepository;