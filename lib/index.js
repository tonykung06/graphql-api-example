const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const DataLoader = require('dataloader');
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const pgdb = require('../database/pgdb')(pgPool);
const mongodb = require('../database/mongodb');

const app = require('express')();

// // Read the query from the command line args
// const query = process.argv[2];

const ncSchema = require('../schema');
// const {graphql} = require('graphql');

// graphql(ncSchema, query).then(result => {
// 	console.log(result);
// });

const {MongoClient, Logger} = require('mongodb');
const assert = require('assert');
const mongodbConfig = require('../config/mongo')[nodeEnv];
const graphqlHTTP = require('express-graphql');

MongoClient.connect(mongodbConfig.url, (err, mongoPool) => {
	// Logger.setLevel('debug');
	// Logger.filter('class', ['Server']);
	assert.equal(err, null);
	app.use('/graphql', (req, res) => {
		const loaders = {
			usersByIds: new DataLoader(pgdb.getUsersByIds),
			usersByApiKeys: new DataLoader(pgdb.getUsersByApiKeys),
			contestsForUserIds: new DataLoader(pgdb.getContestsForUserIds),
			namesForContestIds: new DataLoader(pgdb.getNamesForContestIds),
			totalVotesByNameIds: new DataLoader(pgdb.getTotalVotesByNameIds),
			activitiesForUserIds: new DataLoader(pgdb.getActivitiesForUserIds),
			mongodb: {
				usersByIds: new DataLoader(mongodb(mongoPool).getUsersByIds)
			}
		};
		graphqlHTTP({
			schema: ncSchema,
			graphiql: true,
			context: {
				pgPool,
				mongoPool,
				loaders
			}
		})(req, res);
	});

	const PORT = process.env.PORT || 80;
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
	});
});
