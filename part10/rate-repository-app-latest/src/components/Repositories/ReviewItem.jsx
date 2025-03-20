import { useMutation } from '@apollo/client';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';
import { DELETE_REVIEW } from '../../graphql/mutations';
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
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: 'white',
    },
    ButtonView: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    ButtonDelete: {
        backgroundColor: theme.colors.danger,
        padding: 10,
        borderRadius: 5,
        flex: 1,
    },
    ButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: theme.fontWeights.bold,
    },
});

const ReviewItem = ({ review, own = { ok: false, refetch: () => {} } }) => {
    if (!review) {
        return null;
    }

    const title = own.ok ? review.repository.fullName : review.user.username;
    const [deleteReview] = useMutation(DELETE_REVIEW, {
        onCompleted: () => {
            alert('Review deleted successfully');
            own.refetch();
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
        },
    });

    const handleDelete = () => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Delete', onPress: () => deleteReview({ variables: { id: review.id } }) },
        ]);
    };

    return (
        <>
            <View style={styles.Container}>
                <View style={styles.RatingContainer}>
                    <Text style={styles.Rating}>{review.rating}</Text>
                </View>
                <View style={styles.ReviewContent}>
                    <Text style={styles.Username}>
                        {title}
                    </Text>
                    <Text style={styles.Date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                    <Text style={styles.ReviewText}>{review.text}</Text>
                </View>
            </View>
            {
                own.ok &&
                <View style={styles.ButtonContainer}>
                    <Pressable style={styles.ButtonView} onPress={() => Linking.openURL(review.repository.url)}>
                        <Text style={styles.ButtonText}>View repository</Text>
                    </Pressable>
                    <Pressable style={styles.ButtonDelete} onPress={handleDelete}>
                        <Text style={styles.ButtonText}>Delete review</Text>
                    </Pressable>
                </View>
            }
        </>
    );
};

export default ReviewItem;