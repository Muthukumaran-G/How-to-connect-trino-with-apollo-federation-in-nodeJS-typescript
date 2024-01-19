import { BasicAuth, Columns, Trino } from 'trino-client';

const trino: Trino = Trino.create({
    server: 'http://localhost:8080',
    catalog: 'postgresql,tpcds,mssql',
    schema: 'public,sf1,dbo',
    auth:new BasicAuth('test')
  });
  

var outputData: {
    [key: string]: any;
}[]  

export async function getDBData(allCustomerQuery: string){
    const iter = await trino.query(allCustomerQuery);
      for await (const queryResult of iter) {
      console.log(queryResult.data);
      if(queryResult.data === undefined) continue;
      console.log(queryResult.columns);
      var columns: string[]=[];
      for (const column of queryResult.columns as Columns)
      {
        const nameValue : string = column.name;
        console.log(column.name);
        columns.push(column.name);
        console.log(`Column array value: ${column.name}`);
      }
      outputData = queryResult.data?.map(item=>{
        const obj:{[key:string]: any} = {};
        columns.forEach((propertyName,index)=>{
          obj[propertyName] = item[index];
        });
        return obj;
      });
      console.log(outputData);
    }
    return outputData;
  }