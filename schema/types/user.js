const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLInt
} = require('graphql');

// const {snakeCaseToCamelCase} = require('../../lib/util');

const ContestType = require('./contest');
const ActivityType = require('./activity');
const pgdb = require('../../database/pgdb');
const mongodb = require('../../database/mongodb');

module.exports = new GraphQLObjectType({
	name: 'UserType',
	fields: {
		id: {
			type: GraphQLID
		},
		fullName: {
			type: GraphQLString,
			resolve: obj => `${obj.firstName} ${obj.lastName}`
		},
		firstName: {
			type: GraphQLString
		},
		lastName: {
			type: GraphQLString
		},
		email: {
			type: new GraphQLNonNull(GraphQLString)
		},
		createdAt: {
			type: GraphQLString
		},
		contests: {
			type: new GraphQLList(ContestType),
			resolve(obj, args, {loaders}) {
				// return pgdb(pgPool).getContests(obj.id);
				return loaders.contestsForUserIds.load(obj.id);
			}
		},
		contestsCount: {
			type: GraphQLInt,
			resolve(obj, args, {loaders, mongoPool}, {fieldName}) {
				// return mongodb(mongoPool).getCounts(obj, fieldName);
				return loaders.mongodb.usersByIds.load(obj.id).then(row => row[fieldName]);
			}
		},
		namesCount: {
			type: GraphQLInt,
			resolve(obj, args, {loaders, mongoPool}, {fieldName}) {
				// return mongodb(mongoPool).getCounts(obj, fieldName);
				return loaders.mongodb.usersByIds.load(obj.id).then(row => row[fieldName]);
			}
		},
		votesCount: {
			type: GraphQLInt,
			resolve(obj, args, {loaders, mongoPool}, {fieldName}) {
				// return mongodb(mongoPool).getCounts(obj, fieldName);
				return loaders.mongodb.usersByIds.load(obj.id).then(row => row[fieldName]);
			}
		},
		activities: {
			type: new GraphQLList(ActivityType),
			resolve(obj, args, {loaders}) {
				return loaders.activitiesForUserIds.load(obj.id);
			}
		}
	}
});