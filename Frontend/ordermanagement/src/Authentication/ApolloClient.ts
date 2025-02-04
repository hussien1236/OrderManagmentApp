import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: getRandomGraphqlUrl(),
});
function getRandomGraphqlUrl() {
  const urls = [
    import.meta.env.VITE_GRAPHQL_URL_1,
    import.meta.env.VITE_GRAPHQL_URL_2
  ];
  const randomIndex = Math.floor(Math.random() * 2);
  console.log("Random index: "+randomIndex);
  console.log("Random URL: "+urls[randomIndex]);
  return urls[randomIndex];
}
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
