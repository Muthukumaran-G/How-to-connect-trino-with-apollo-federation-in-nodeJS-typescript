import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import { getDBData } from './datasource';
import { dateScalar } from './dateScalar';

const portNumber = 4001;
var employeeData = getDBData('Your-Select-Query-Here');

const typeDefs = gql`
  scalar Date

  type Employee @key(fields: "department_id"){
    employee_id : Int!
    first_name: String!
    last_name: String!
    salary: Float!
    department_id: Int!
    joining_date: Date
  }

  extend type Query {
    employee(department_id: Int!): Employee
    employees: [Employee]
  }
`;

const resolvers = {
  Date: dateScalar,
  Employee: {
    async __resolveReference(ref: any) {
      var employees = await employeeData;
         var employee = employees.find((emp) => emp.department_id === ref.department_id);
        return employee;
    }
  },
  Query: {
    async employee(parent: any, args: {department_id: any},context: any, info: any) {
      var employees = await employeeData;
      const {department_id} = args;
         var employee = employees.find((emp) => emp.department_id === department_id);
        return employee;
    },
    employees() {
      return employeeData;
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