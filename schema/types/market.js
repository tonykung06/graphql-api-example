const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean
} = require('graphql');

const SelectionType = require('./selection');

module.exports = new GraphQLObjectType({
	name: 'MarketType',
	fields: {
		id: {
			type: GraphQLID
		},
		primary: {
			type: GraphQLBoolean
		},
		selections: {
			type: new GraphQLList(SelectionType)
		},
		active_selections: {
			type: GraphQLInt
		},
		tags: {
			type: new GraphQLList(GraphQLInt)
		}
	}
});
