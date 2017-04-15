module.exports = {
  development: {
	database: 'xxxx',
	user: 'xxxx', //env var: PGUSER
	password: 'xxxxxx', //env var: PGPASSWORD
	host: 'xxxxx', // Server hosting the postgres database
	port: 5432, //env var: PGPORT
	max: 10, // max number of clients in the pool
	idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  }
};
