import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { BasicAuth, Columns, Query, QueryData, Trino } from "trino-client";

import { ApolloGateway, IntrospectAndCompose }  from "@apollo/gateway";

const port = 4000;

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "employees", url: "http://localhost:4001" },
    { name: "departments", url: "http://localhost:4002" }
    ],
  }),
});

const server = new ApolloServer({
    gateway
  });

  const portNumber = 4000;

  startStandaloneServer(server, {
     listen: { port: portNumber },
   });

     
  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 },
  // });
  
  console.log(`🚀  Server ready at: ${portNumber}`);

// const trino: Trino = Trino.create({
//     server: 'http://localhost:8080',
//     catalog: 'postgresql,tpcds,mssql',
//     schema: 'public,sf1,dbo',
//     //catalog:'postgresql',
//     //schema:'public',
//     auth:new BasicAuth('test')
//     //auth: new BasicAuth('test'),
//   });

  

// const typeDefs = `#graphql
//   type wfm_bpnew {
//   id: Int!
//   name: String
//   value: String
// }

// type Book {
//     title: String
//     author: String
//   }

//   type Employee {
//     employee_id : Int!
//     first_name: String!
//     last_name: String!
//     salary: Float!
//     department_id: Int!
//     department:Department!
//   }

//   type Department{
//     department_id: Int!
//     department_name:String!
//   }

//   type Query {
//     books: [Book]
//     dbData: [wfm_bpnew]
//     employeeData:[Employee]
//   }
// `;

// const books = [
//     {
//       title: 'The Awakening',
//       author: 'Kate Chopin',
//     },
//     {
//       title: 'City of Glass',
//       author: 'Paul Auster',
//     },
//   ];

//   const dbMockData = [
//     {
//       id:1,
//       name: 'The Awakening',
//       value: 'Kate Chopin',
//     },
//     {
//       id:2,
//       name: 'City of Glass',
//       value: 'Paul Auster',
//     },
//   ];
  
// const resolvers = {
//     Query: {
//       books: async() => books,
//       dbData: async()=> employeeData,
//       employeeData: async()=>employeeData,
//     },
//     Employee: {
//       async department(parent: any) {
//         var departments = await departmentData;
//          var department = departments.find((dept) => dept.department_id === parent.department_id);
//         return department;
//       },
//     },
//   };

//   var employeeData = getDBData('select * from postgresql.public.employees');
//   var departmentData = getDBData('select * from mssql.dbo.departments');

//   var outputData: {
//     [key: string]: any;
// }[]

//   async function getDBData(allCustomerQuery: string){
//     //const allCustomerQuery = 'select * from postgresql.public.employees as emp inner join mssql.dbo.departments as dept on emp.department_id=dept.department_id';
//     //const allCustomerQuery = 'select username from pdc_users limit 5';
//     const iter = await trino.query(allCustomerQuery);
//       for await (const queryResult of iter) {
//       console.log(queryResult.data);
//       if(queryResult.data === undefined) continue;
//       console.log(queryResult.columns);
//       var columns: string[]=[];
//       // queryResult.columns?.forEach
//       for (const column of queryResult.columns as Columns)
//       {
//         const nameValue : string = column.name;
//         console.log(column.name);
//         columns.push(column.name);
//         console.log(`Column array value: ${column.name}`);
//       }
//       outputData = queryResult.data?.map(item=>{
//         const obj:{[key:string]: any} = {};
//         columns.forEach((propertyName,index)=>{
//           obj[propertyName] = item[index];
//         });
//         return obj;
//       });
//       console.log(outputData);
//     }
//     return outputData;
//   }
  

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   const portNumber = 4000;

//   startStandaloneServer(server, {
//      listen: { port: portNumber },
//    });

     
//   // const { url } = await startStandaloneServer(server, {
//   //   listen: { port: 4000 },
//   // });
  
//   console.log(`🚀  Server ready at: ${portNumber}`);