import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
    containerBackground: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.transparent,
    },
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        backgroundColor: theme.colors.backgroundPrimary,
    },
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
    },
});

const AppBar = () => {
  return (
    <View style={styles.containerBackground}>
        <View style={styles.container}>
            <Pressable onPress={() => alert('Pressed!')}>
                <Text style={styles.text}>
                        Repositories
                </Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AppBar;