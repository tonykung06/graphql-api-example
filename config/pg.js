module.exports = {
  development: {
	database: 'XXXX',
	user: 'XXXX', //env var: PGUSER
	password: 'XXXX', //env var: PGPASSWORD
	host: 'XXXX', // Server hosting the postgres database
	port: 1234, //env var: PGPORT
	max: 10, // max number of clients in the pool
	idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  }
};
