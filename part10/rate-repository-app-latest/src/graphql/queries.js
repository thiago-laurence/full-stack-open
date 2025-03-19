import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DEATILS } from './fragments';

export const GET_REPOSITORIES = gql`
    query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges{
                node{
                    ...RepositoryDetails
                }
            }
        }
    }
    ${REPOSITORY_DETAILS}
`;

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;

export const GET_REPOSITORY = gql`
    query repository($id: ID!) {
        repository(id: $id) {
            ...RepositoryDetails
            url
            reviews {
                edges {
                    node {
                        ...ReviewDetails
                    }
                }
            }
        }
    }
    ${REPOSITORY_DETAILS}
    ${REVIEW_DEATILS}
`;