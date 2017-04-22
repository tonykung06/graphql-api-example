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

module.exports = new GraphQLObjectType({
	name: 'ScoreType',
	fields: {
		score: {
			type: new GraphQLList(GraphQLInt)
		}
	}
});
