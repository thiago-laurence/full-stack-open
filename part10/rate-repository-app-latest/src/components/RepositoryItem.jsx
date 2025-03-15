import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';

const cardHeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 5,
    },
    avatarContainer: {
        flexGrow: 0,
        paddingRight: 15,
    },
    infoContainer: {
        flexGrow: 1,
        flexShrink: 1,
    },
    language: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.textPrimary,
        padding: 7.5,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    fullName: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
    },
    description: {
        color: 'gray',
        marginBottom: 5,
        flexWrap: 'wrap',
    },
});

const CardHeader = ({ item }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image style={cardHeaderStyles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text style={cardHeaderStyles.fullName}>{item.fullName}</Text>
        <Text style={cardHeaderStyles.description}>{item.description}</Text>
        <Text style={cardHeaderStyles.language}>{item.language}</Text>
      </View>
    </View>
  );
};

const cardBodyStyles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  }
});

const CardBody = () => {
  return (
    <View style={cardBodyStyles.container}>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales molestie nisl, a elementum leo congue tempor. Aliquam erat volutpat. Aenean id pharetra orci.
      </Text>
    </View>
  );
};

const cardFooterStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-around',
    },
    actionTouchable: {
        flexGrow: 0,
    },
    actionText: {
        textDecorationLine: 'underline',
    },
    statCount: {
        fontWeight: theme.fontWeights.bold,
    },
    statText: {
        color: theme.colors.textSecondary
    }
});

const formatCount = (count) => {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
};

const CardFooterItem = ({ count, label }) => {
return (
    <View style={cardFooterStyles.actionTouchable}>
        <View style={{ alignItems: 'center' }}>
            <Text style={cardFooterStyles.statCount}>{formatCount(count)}</Text>
            <Text style={cardFooterStyles.statText}>{label}</Text>
        </View>
    </View>
)
};

const CardFooter = ({ item }) => {
  return (
    <View style={cardFooterStyles.container}>
        <CardFooterItem count={item.stargazersCount} label="Stars" />
        <CardFooterItem count={item.forksCount} label="Forks" />
        <CardFooterItem count={item.reviewCount} label="Reviews" />
        <CardFooterItem count={item.ratingAverage} label="Rating" />
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 10,
    backgroundColor: 'white',
  },
});

const Card = ({ item }) => {
  return (
    <View style={cardStyles.container}>
      <CardHeader item={ item } />
      {/* <CardBody /> */}
      <CardFooter item={ item } />
    </View>
  );
};

export default Card;