const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLEnumType
} = require('graphql');
// const pgdb = require('../../database/pgdb');
module.exports = new GraphQLObjectType({
	name: 'NameType',
	// defer interpretation until all other modules are imported to avoid cyclic dependencies, User -> Contest -> Name -> User
	fields: () => {
		const UserType = require('./user');
		const TotalVotesType = require('./total_votes');
		return {
			id: {
				type: GraphQLID
			},
			label: {
				type: new GraphQLNonNull(GraphQLString)
			},
			description: {
				type: GraphQLString
			},
			createdAt: {
				type: new GraphQLNonNull(GraphQLString)
			},
			createdBy: {
				type: new GraphQLNonNull(UserType),
				resolve(obj, args, {loaders}) {
					return loaders.usersByIds.load(obj.createdBy);
					// return pgdb(pgPool).getUserById(obj.createdBy);
				}
			},
			totalVotes: {
				type: TotalVotesType,
				resolve(obj, args, {loaders}) {
					return loaders.totalVotesByNameIds.load(obj.id);
				}
			}
		};
	}
});