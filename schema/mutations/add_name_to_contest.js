const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInputObjectType
} = require('graphql');

const NameType = require('../types/name');
const pgdb = require('../../database/pgdb');
const NameInputType = new GraphQLInputObjectType({
	name: 'NameInputType',
	fields: {
		apiKey: {
			type: new GraphQLNonNull(GraphQLString)
		},
		contestId: {
			type: new GraphQLNonNull(GraphQLString)
		},
		label: {
			type: new GraphQLNonNull(GraphQLString)
		},
		description: {
			type: GraphQLString
		}
	}
});

module.exports = {
	type: NameType, //the response type
	args: {
		input: {
			type: new GraphQLNonNull(NameInputType)
		}
	},
	resolve(obj, {input}, {pgPool}) {
		// 1. save new contest to db
		// 2. resolve the response object
		return pgdb(pgPool).addName(input);
	}
};
