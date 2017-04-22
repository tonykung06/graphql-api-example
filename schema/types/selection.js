const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLFloat
} = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'SelectionType',
	fields: {
		timestamp: {
			type: GraphQLInt
		},
		group_id: {
			type: GraphQLInt
		},
		type: {
			type: GraphQLString
		},
		special_bet_value: {
			type: GraphQLString
		},
		odds: {
			type: GraphQLFloat
		},
		min_stake: {
			type: GraphQLFloat
		},
		max_stake: {
			type: GraphQLFloat
		},
		status: {
			type: GraphQLInt
		}
	}
});
