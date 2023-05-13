import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer, gql } from "apollo-server";
import neo4j from "neo4j-driver";

// Create Neo4j driver instance
// (You may need to replace your connection details, username and password)
const AURA_ENDPOINT = process.env.NEO4J_URI;
const USERNAME = process.env.NEO4J_USERNAME;
const PASSWORD = process.env.NEO4J_PASSWORD;

// Create Neo4j driver instance
const driver = neo4j.driver(
  AURA_ENDPOINT!,
  neo4j.auth.basic(USERNAME!, PASSWORD!)
);

//DEFINE NOTE TYPE SIMPLE and json
const typeDefs = gql`
  type Person {
    name: String
    knows: [Person!]! @relationship(type: "KNOWS", direction: OUT)
    friendCount: Int
      @cypher(statement: "MATCH (this)-[:KNOWS]->(p:Person) RETURN count(p)")
  }
`;

// Create instance that contains executable GraphQL schema from GraphQL type definitions
const neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
  driver,
});

// Generate schema
neo4jGraphQL.getSchema().then((schema) => {
  // Create ApolloServer instance to serve GraphQL schema
  const server = new ApolloServer({
    schema,
    context: { driverConfig: { database: "neo4j" } },
  });

  // Start ApolloServer
  server.listen().then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`);
  });
});
