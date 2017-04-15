const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull
} = require('graphql');
const pgdb = require('../database/pgdb');
const UserType = require('./types/user');
const RootQueryType = new GraphQLObjectType({
	name: 'MyRootQueryType',
	fields: {
		me: {
			type: UserType,
			description: 'The current user identified by an api key',
			args: {
				key: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			// parentObj for root field is null
			resolve: (parentObj, args, {loaders}) => {
				return loaders.usersByApiKeys.load(args.key);
			}
		}
	}
});

const AddContestMutation = require('./mutations/add_contest');
const AddNameToContest = require('./mutations/add_name_to_contest');

const RootMutationType = new GraphQLObjectType({
	name: 'MyRootMutationType',
	fields() {
		return {
			AddContest: AddContestMutation,
			AddName: AddNameToContest
		};
	}
});

const ncSchema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutationType
});

module.exports = ncSchema;