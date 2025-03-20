import { StyleSheet } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const styles = StyleSheet.create({
  inputSearch: {
    margin: 10,
    padding: 10,
    border: '1px solid black',
    borderRadius: 5,
    backjgroundColor: 'white',
  }
});

const RepositoryList = ({ query }) => {
  const { repositories, fetchMore } = useRepositories(query);
  const onEndReach = () => { fetchMore(); };

  return (
    <>
      <RepositoryListContainer 
        repositories={repositories}
        onEndReach={onEndReach}
      />
    </>
  );
};

export default RepositoryList;