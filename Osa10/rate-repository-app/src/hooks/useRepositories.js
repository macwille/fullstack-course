import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...results } = useQuery(GET_REPOSITORIES, {
    variables, fetchPolicy: 'cache-and-network',
  })

  const handleFetch = () => {
    fetchMore({
      variables: {
        after: data.repositories,
        ...variables
      },
    })
  }

  return {
    repositories: data ? data.repositories : undefined,
    loading,
    ...results,
    refetch: handleFetch
  };
};

export default useRepositories;