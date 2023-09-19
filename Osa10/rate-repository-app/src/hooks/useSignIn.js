<<<<<<< HEAD
import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";

import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: { username, password }
    });
    const token = response.data.authenticate.accessToken;
    console.log(token);
    await authStorage.setAccessToken(token);
=======
import { useApolloClient, useMutation, } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        username, password
      }
    });
    await authStorage.setAccessToken(response.data?.authenticate.accessToken);
>>>>>>> c6e86e71869049c8bafb86261dd303cb28d6c764
    apolloClient.resetStore();
    return response;
  };

  return [signIn, result];
};

export default useSignIn;