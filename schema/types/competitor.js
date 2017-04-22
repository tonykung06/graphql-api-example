const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLInt
} = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'CompetitorType',
	fields: {
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		type: {
			type: GraphQLInt
		}
	}
});