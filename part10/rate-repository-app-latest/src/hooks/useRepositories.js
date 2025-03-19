import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: orderBy,
      orderDirection: orderDirection,
      searchKeyword: searchKeyword
    }
  });

  const repositories = data ? data.repositories : [];

  return { repositories, error, loading, refetch };
};

export default useRepositories;