const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLUnionType
} = require('graphql');

const ContestStatusType = require('./contest_status');
const NameType = require('./name');
const ContestType = require('./contest');
const pgdb = require('../../database/pgdb');

module.exports = new GraphQLUnionType({
	name: 'ActivityType',
	types: [ContestType, NameType],
	resolveType(value) {
		return value.activityType === 'contest' ? ContestType : NameType;
	}
});