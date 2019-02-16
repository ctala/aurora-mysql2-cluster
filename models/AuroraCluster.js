const mysql2 = require("mysql2");

class AuroraCluster {

    /**
     * 
     * @param {*} writer 
     * @param {*} reader 
     * @param {*} config 
     */
    constructor(writer = {}, reader = {}, config = {}) {
        /**
         * Setting Writer Configuration
         */
        this.DB_HOST = writer.host || process.env.DB_HOST;
        this.DB_USER = writer.user || process.env.DB_USER;
        this.DB_DATABASE = writer.database || process.env.DB_DATABASE;
        this.DB_PORT = writer.port || process.env.DB_PORT;
        this.DB_PASS = writer.password || process.env.DB_PASS;


        /**
         * Setting Reader Configuration
         */
        this.DB_HOST_READ = reader.host || process.env.DB_HOST_READ || process.env.DB_HOST;
        this.DB_USER_READ = reader.user || process.env.DB_USER_READ || process.env.DB_USER;
        this.DB_DATABASE_READ = reader.database || process.env.DB_DATABASE;
        this.DB_PORT_READ = reader.port || process.env.DB_PORT_READ || process.env.DB_PORT;
        this.DB_PASS_READ = reader.password || process.env.DB_PASS_READ || process.env.DB_PASS;

        /**
         * Config for pool extra data
         */
        this.config = config;

        this.poolWritter = this.createPool({
            host: this.DB_HOST,
            port: this.DB_PORT,
            user: this.DB_USER,
            database: this.DB_DATABASE,
            password: this.DB_PASS
        }, config);

        this.poolReader = this.createPool({
            host: this.DB_HOST_READ,
            port: this.DB_PORT_READ,
            user: this.DB_USER_READ,
            database: this.DB_DATABASE_READ,
            password: this.DB_PASS_READ
        }, config);

    }

    createPool(poolData, config = {}) {
        let pool = mysql2.createPool({
            host: poolData.host,
            port: poolData.port,
            user: poolData.user,
            database: poolData.database,
            password: poolData.password,
            waitForConnections: config.waitForConnections || true,
            connectionLimit: config.connectionLimit || 10,
            queueLimit: config.queueLimit || 0
        });
        return pool;
    }


    /**
     * Query that will be executed on the Reader Pool
     * @param {*} query 
     */
    read(query) {
        return new Promise((resolve, reject) => {
            this.poolReader.query(
                query,
                function (err, results, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(results); // results contains rows returned by server
                        resolve(results);
                    }

                }
            );
        });
    }

    /**
     * Query that will be executed on the Writer Pool
     * @param {*} query 
     */
    write(query) {
        return new Promise((resolve, reject) => {
            this.poolWritter.query(
                query,
                function (err, results, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(results); // results contains rows returned by server
                        resolve(results);
                    }

                }
            );
        });
    }



}


module.exports = AuroraCluster;