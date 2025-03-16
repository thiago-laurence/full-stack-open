import { View, Text, Pressable, StyleSheet, Button } from 'react-native';
import FormikTextInput from '../../src/components/FormikInputs/FormikTextInput';
import theme from '../../src/theme';

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

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput style={styles.input} name="username" placeholder="Username" />
            <FormikTextInput style={styles.input} name="password" placeholder="Password" secureTextEntry />
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonHover : null,
                ]}
                onPress={onSubmit}
            >
                <Text style={styles.buttonText}>
                    Sign in
                </Text>
            </Pressable>
        </View>
    );
};

export default SignInForm;