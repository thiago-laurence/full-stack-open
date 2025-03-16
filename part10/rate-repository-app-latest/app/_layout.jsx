import { Stack } from 'expo-router';

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="repositories/index" options={{
                headerTitle: "Repositories",
            }} />
            <Stack.Screen name="signin/index" options={{
                headerTitle: "Sign in",
            }} />
        </Stack>
    );
};

export default RootLayout;