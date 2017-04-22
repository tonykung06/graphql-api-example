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

const ScoreType = require('./score');

module.exports = new GraphQLObjectType({
	name: 'MetadataType',
	fields: {
		event_time: {
			type: GraphQLString
		},
		event_time_extended: {
			type: GraphQLString
		},
		event_status: {
			type: GraphQLString
		},
		bet_status: {
			type: GraphQLString
		},
		score: {
			type: new GraphQLList(GraphQLInt)
		},
		set_scores: {
			type: new GraphQLList(ScoreType)
		},
		corners_away: {
			type: GraphQLInt
		},
		corners_home: {
			type: GraphQLInt
		},
		red_cards_away: {
			type: GraphQLInt
		},
		red_cards_home: {
			type: GraphQLInt
		},
		yellow_red_cards_away: {
			type: GraphQLInt
		},
		yellow_red_cards_home: {
			type: GraphQLInt
		}
	}
});
