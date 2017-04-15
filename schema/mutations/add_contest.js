const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInputObjectType
} = require('graphql');

const ContestType = require('../types/contest');
const pgdb = require('../../database/pgdb');
const ContestInputType = new GraphQLInputObjectType({
	name: 'ContestInputType',
	fields: {
		apiKey: {
			type: new GraphQLNonNull(GraphQLString)
		},
		title: {
			type: new GraphQLNonNull(GraphQLString)
		},
		description: {
			type: GraphQLString
		}
	}
});

module.exports = {
	type: ContestType, //the response type
	args: {
		input: {
			type: new GraphQLNonNull(ContestInputType)
		}
	},
	resolve(obj, {input}, {pgPool}) {
		// 1. save new contest to db
		// 2. resolve the response object
		return pgdb(pgPool).addNewContest(input);
	}
};
