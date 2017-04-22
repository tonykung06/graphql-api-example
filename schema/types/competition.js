const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLInt
} = require('graphql');

const GroupType = require('./group');
const EventType = require('./event');

module.exports = new GraphQLObjectType({
	name: 'CompetitionType',
	fields: {
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		groups: {
			type: new GraphQLList(GroupType)
		},
		events: {
			type: new GraphQLList(EventType)
		},
		event_count: {
			type: GraphQLInt
		},
		priority: {
			type: GraphQLInt
		}
	}
});