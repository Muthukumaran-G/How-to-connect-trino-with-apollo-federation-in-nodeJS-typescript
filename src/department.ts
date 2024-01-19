import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import { getDBData } from './datasource';

const portNumber = 4002;
var departmentData = getDBData('Your-Select-Query-Here');

const typeDefs = gql`
  type Department {
    department_id: Int!
    department_name:String!
  }

  type Employee @key(fields: "department_id"){
    department_id: Int!
    departments:[Department]
  }

  type Query {
    department(department_id: Int!): Department
    departments: [Department]
  }
`;

const resolvers = {
  Employee: {
    async departments(parent: any, args: any,context: any, info: any) {
      var data= (await departmentData);
      var departmentsList= data.filter((dept) => dept.department_id === parent.department_id);
      return departmentsList;      
    }
  },
  Query: {
    async department(parent: any, args: {department_id: any},context: any, info: any) {
      var departments = await departmentData;
      const {department_id} = args;
         var department = departments.find((dept) => dept.department_id === department_id);
        return department;
    },
    departments() {
      return departmentData;
    }
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server,{
  listen: { port: portNumber },
});
console.log(`🚀  Server ready at ${portNumber}`);