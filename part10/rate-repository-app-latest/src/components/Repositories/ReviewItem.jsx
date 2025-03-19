import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import theme from '../../theme';

const styles = StyleSheet.create({
    Container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
    },
    RatingContainer: {
        marginRight: 10,
    },
    Rating: {
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.primary,
        border: '2px solid',
        borderColor: theme.colors.primary,
        borderRadius: 50,
        width: 50,
        height: 50,
        textAlign: 'center',
        lineHeight: 50,
    },
    ReviewContent: {
        flex: 1,
    },
    Username: {
        fontWeight: theme.fontWeights.bold,
        marginBottom: 5,
    },
    Date: {
        color: theme.colors.textSecondary,
        marginBottom: 5,
    },
    ReviewText: {
        marginBottom: 5,
    }
});

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.Container}>
            <View style={styles.RatingContainer}>
                <Text style={styles.Rating}>{review.rating}</Text>
            </View>
            <View style={styles.ReviewContent}>
                <Text style={styles.Username}>{review.user.username}</Text>
                <Text style={styles.Date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                <Text style={styles.ReviewText}>{review.text}</Text>
            </View>
        </View>
    );
};

export default ReviewItem;