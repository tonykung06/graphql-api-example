const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList
} = require('graphql');
const pgdb = require('../database/pgdb');
const UserType = require('./types/user');
const EventType = require('./types/event');
const CompetitionType = require('./types/competition');
const mongodb = require('../database/mongodb');
const graphqlhubSchemas = require('graphqlhub-schemas');

const RootQueryType = new GraphQLObjectType({
	name: 'MyRootQueryType',
	fields: {
		github: {
			type: graphqlhubSchemas.Github.QueryObjectType,
			description: 'querying github graphql server',
			resolve() {
				return {};
			}
		},
		liveEvents: {
			type: new GraphQLList(EventType),
			description: 'A list of live events',
			resolve: (parentObj, args, {mongoPool}) => {
				return mongodb(mongoPool).getLiveEvents();
			}
		},
		popularEvents: {
			type: new GraphQLList(EventType),
			description: 'A list of popular events',
			resolve: (parentObj, args, {mongoPool}) => {
				return mongodb(mongoPool).getPopularEvents();
			}
		},
		popularCompetitions: {
			type: new GraphQLList(CompetitionType),
			description: 'A list of popular competitions',
			resolve: (parentObj, args, {mongoPool}) => {
				return mongodb(mongoPool).getPopularCompetitions();
			}
		},
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