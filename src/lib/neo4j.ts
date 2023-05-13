import neo4j from "neo4j-driver";
export const driver = neo4j.driver(
  process.env.NEXT_PUBLIC_NEO4J_URI as string,
  neo4j.auth.basic(
    process.env.NEXT_PUBLIC_NEO4J_USERNAME as string,
    process.env.NEXT_PUBLIC_NEO4J_PASSWORD as string
  )
);
