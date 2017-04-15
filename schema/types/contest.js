const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList
} = require('graphql');

const ContestStatusType = require('./contest_status');
const NameType = require('./name');
const pgdb = require('../../database/pgdb');

module.exports = new GraphQLObjectType({
	name: 'MyContestType',
	fields: {
		id: {
			type: GraphQLID
		},
		code: {
			type: new GraphQLNonNull(GraphQLString)
		},
		title: {
			type: new GraphQLNonNull(GraphQLString)
		},
		description: {
			type: GraphQLString
		},
		status: {
			type: new GraphQLNonNull(ContestStatusType)
		},
		createdAt: {
			type: new GraphQLNonNull(GraphQLString)
		},
		names: {
			type: new GraphQLList(NameType),
			resolve(obj, args, {pgPool, loaders}) {
				// return pgdb(pgPool).getNames(obj);
				return loaders.namesForContestIds.load(obj.id);
			}
		}
	}
});