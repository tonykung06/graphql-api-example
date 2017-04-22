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
	name: 'SportType',
	fields: {
		id: {
			type: GraphQLID
		}
	}
});