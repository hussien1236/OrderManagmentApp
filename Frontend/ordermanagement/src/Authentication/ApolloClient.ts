import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_SCHEMA_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token"); 

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authentication middleware and HTTP link
  cache: new InMemoryCache(), // Cache results to optimize performance
});
