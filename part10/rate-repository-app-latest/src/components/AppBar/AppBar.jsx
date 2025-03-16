import { View, StyleSheet, ScrollView } from 'react-native';
// import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        backgroundColor: theme.colors.backgroundPrimary,
        flexDirection: 'row',
    },
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
        marginRight: 15,
    },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
          <AppBarTab title="Repositories" link="/" styles={styles.text} />
          <AppBarTab title="Sign in" link="/SignIn" styles={styles.text} />
      </ScrollView>
    </View>
  );
};

export default AppBar;