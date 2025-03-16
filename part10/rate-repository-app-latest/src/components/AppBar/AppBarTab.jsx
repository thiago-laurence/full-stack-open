import { Link } from 'expo-router';
import { Text, Pressable } from 'react-native';

const AppBarTab = ({ title, link, styles }) => {
  return (
    <Pressable>
        <Link href={link}>
            <Text style={styles}>{title}</Text>
        </Link>
    </Pressable>
  );
};

export default AppBarTab;