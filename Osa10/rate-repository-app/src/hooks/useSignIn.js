import { useApolloClient, useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { AUTHORIZE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const apolloClient = useApolloClient();
  const storage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const res = await mutate({ variables: { username, password } })
    await storage.setAccessToken(res.data.authorize.accessToken);
    apolloClient.resetStorage();
  };
  return [signIn, result];
};

export default useSignIn