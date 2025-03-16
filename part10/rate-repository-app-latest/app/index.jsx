import { View, StyleSheet } from 'react-native';
import AppBar from '../src/components/AppBar/AppBar';
import theme from '../src/theme';

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.colors.backgroundSecondary
  }
});

export default function HomePage() {
  return (
    <View style={styles.main}>
      <AppBar />
    </View>
  );
}
