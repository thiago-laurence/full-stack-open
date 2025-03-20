import { FlatList, View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import RepositoryInfo from './RepositoryInfo';
import ItemSeparator from './ItemSeparator';
import theme from '../../theme';
  
const styles = StyleSheet.create({
    Container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
    },
    Rating: {
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.primary,
        border: '1px solid',
        borderColor: theme.colors.primary,
        borderRadius: 50,
        width: 40,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.Container}>
            <View style={styles.Rating}>
                <Text>{review.rating}</Text>
            </View>
            <Text>{review.user.username}</Text>
            <Text>{format(new Date(review.createdAt), 'dd/MM/yy')}</Text>
            <Text>{review.text}</Text>
        </View>
    );
};
  
const SingleRepository = ({ repository }) => {
    const reviews = repository.reviews.edges.map(edge => edge.node);
  
    return (
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo item={repository} />}
      />
    );
  };
  
export default SingleRepository;