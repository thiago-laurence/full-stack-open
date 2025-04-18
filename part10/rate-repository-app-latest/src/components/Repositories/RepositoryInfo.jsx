import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../../theme';

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

const cardFooterStyles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  repoUrl: {
    color: 'white',
    padding: 15,
    fontWeight: theme.fontWeights.bold,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
  }
});

const CardFooter = ({ item }) => {
  if (!item.url) {
    return null;
  }

  return (
    <View style={cardFooterStyles.container}>
      <Pressable onPress={() => Linking.openURL(item.url)}>
        <Text style={cardFooterStyles.repoUrl}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

const cardBodyStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-around',
        marginVertical: 10
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

const CardBodyItem = ({ count, label }) => {
  return (
      <View style={cardBodyStyles.actionTouchable}>
          <View style={{ alignItems: 'center' }}>
              <Text style={cardBodyStyles.statCount}>{formatCount(count)}</Text>
              <Text style={cardBodyStyles.statText}>{label}</Text>
          </View>
      </View>
  )
};

const CardBody = ({ item }) => {
  return (
    <View style={cardBodyStyles.container}>
        <CardBodyItem count={item.stargazersCount} label="Stars" />
        <CardBodyItem count={item.forksCount} label="Forks" />
        <CardBodyItem count={item.reviewCount} label="Reviews" />
        <CardBodyItem count={item.ratingAverage} label="Rating" />
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 15,
    backgroundColor: 'white',
  },
});

const Card = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <View style={cardStyles.container}>
      <CardHeader item={ item } />
      <CardBody item={ item } />
      <CardFooter item={ item } />
    </View>
  );
};

export default Card;