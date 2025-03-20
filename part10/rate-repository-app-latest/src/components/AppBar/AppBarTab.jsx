import { Link } from 'expo-router';
import { Text, Pressable } from 'react-native';

const AppBarTab = ({ title, link, styles }) => {
  return (
    <Pressable style={styles.container}>
        <Link href={link}>
            <Text style={styles.text}>{title}</Text>
        </Link>
    </Pressable>
  );
};

export default AppBarTab;