import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DEATILS, CURSOR_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
    query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
        repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
            edges{
                node{
                    ...RepositoryDetails
                }
                cursor
            }
            pageInfo{
                ...CursorDetails
            }
        }
    }
    ${REPOSITORY_DETAILS}
    ${CURSOR_DETAILS}
`;

export const GET_CURRENT_USER = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        ...ReviewDetails
                        repository {
                            id
                            fullName
                            url
                        }
                    }
                    cursor
                }
                pageInfo {
                    ...CursorDetails
                }
            }
        }
    }
    ${REVIEW_DEATILS}
    ${CURSOR_DETAILS}
`;

export const GET_REPOSITORY = gql`
    query repository($id: ID!, $first: Int, $after: String) {
        repository(id: $id) {
            ...RepositoryDetails
            url
            reviews(first: $first, after: $after) {
                edges {
                    node {
                        ...ReviewDetails
                    }
                    cursor
                }
                pageInfo {
                    ...CursorDetails
                }
            }
        }
    }
    ${REPOSITORY_DETAILS}
    ${REVIEW_DEATILS}
    ${CURSOR_DETAILS}
`;