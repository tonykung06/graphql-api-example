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
    name: 'EventType',
    fields: () => {
        var SportType = require('./sport');
        var CompetitionType = require('./competition');
        var CompetitorType = require('./competitor');
        var MarketType = require('./market');
        var MetadataType = require('./metadata');
        return {
            id: {
                type: GraphQLID
            },
            image: {
                type: GraphQLString
            },
            timestamp: {
                type: GraphQLInt
            },
            starts_at: {
                type: GraphQLInt
            },
            open_markets: {
                type: GraphQLInt
            },
            status: {
                type: GraphQLInt
            },
            provider_id: {
                type: GraphQLInt
            },
            parlay_restriction: {
                type: GraphQLInt
            },
            sport: {
                type: SportType
            },
            competition: {
                type: CompetitionType
            },
            competitors: {
                type: new GraphQLList(CompetitorType)
            },
            markets: {
                type: new GraphQLList(MarketType)
            },
            metadata: {
                type: MetadataType
            }
        }
    }
});