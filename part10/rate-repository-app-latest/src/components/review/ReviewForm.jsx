import { View, Text, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from '../FormikInputs/FormikTextInput';
import theme from '../../theme';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
    },
    input: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 5,
        border: '1px solid #ccc',
        color: 'gray'
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonHover: {
        backgroundColor: theme.colors.primaryDark,
    },
});

const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput style={styles.input} name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput style={styles.input} name="repositoryName" placeholder="Repository name" />
            <FormikTextInput style={styles.input} name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput style={styles.input} name="text" placeholder="Review" />
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonHover : null,
                ]}
                onPress={onSubmit}
            >
                <Text style={styles.buttonText}>
                    Create a review
                </Text>
            </Pressable>
        </View>
    );
};

export default ReviewForm;