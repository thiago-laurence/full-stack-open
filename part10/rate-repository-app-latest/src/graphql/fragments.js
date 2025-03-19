import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
    fragment RepositoryDetails on Repository {
        id,
        fullName,
        description,
        language,
        ownerAvatarUrl,
        stargazersCount,
        forksCount,
        reviewCount,
        ratingAverage
    }
`;

export const REVIEW_DEATILS = gql`
    fragment ReviewDetails on Review {
        id,
        text,
        rating,
        createdAt,
        user {
            id,
            username
        }
    }
`;