# aurora-mysql2-cluster
Managed Pool Connections for Aurora DB. 

This module will create 2 Mysql2 pools using the Amazon Aurora endpoints. Read replicas will be automatically optimized by Amazon.

Also executes plain Mysql queries through the pools. 

# Configuration

This module will read the enviromental variables in order to find the information regarding to the write and read endpoints for the Aurora Cluster. If the information for read is not provided, it will use the corresponding variable for write.

## Enviromental Variables

### Writter 

* DB_HOST
* DB_USER
* DB_DATABASE
* DB_PORT
* DB_PASS

### Reader

While we can use an Aurora writter endpoint to read is not recommended. All the information not found in the enviroment will use the writter variables by default.

* DB_HOST (RECOMMENDED)
* DB_USER (OPTIONAL)
* DB_DATABASE (OPTIONAL)
* DB_PORT (OPTIONAL)
* DB_PASS (OPTIONAL)


## Creating the object

Using the enviromental variables.

```
const AuroraPool = require("aurora-mysql2-cluster");

let auroraPool = new AuroraPool();
```

Using params 

```
const AuroraPool = require("aurora-mysql2-cluster");

let writterInfo = {
    host : "",
    user : "",
    database : "",
    port : "",
    password : ""
}

let readerInfo = {
    host : "",
    user : "",
    database : "",
    port : "",
    password : ""
}

let auroraPool = new AuroraPool(writterInfo,readerInfo);
```

### Read Query

```
auroraPool.read(query);
```

Return Mysql2 pool query result as a promise.

### Write Query

```
auroraPool.write(query);
```

Return Mysql2 pool query result as a promise.