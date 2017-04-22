const {orderedFor} = require('../lib/util');
const popularEvents = require('./popular_events');
const popularCompetitions = require('./popular_competitions');
const liveEvents = require('./live_events');
const sportsbookPageStatic = require('./sportsbook_page_static');

module.exports = mongoPool => {
	return {
		getUsersByIds(userIds) {
			return mongoPool.collection('users').find({
				userId: {
					$in: userIds
				}
			}).toArray().then(rows => {
				return orderedFor(rows, userIds, 'userId', true);
			});
		},
		getPopularEvents() {
			return mongoPool.collection('popular_events').find({}).toArray();
		},
		getPopularCompetitions() {
			return mongoPool.collection('popular_competitions').find({}).toArray();
		},
		getLiveEvents() {
			return mongoPool.collection('live_events').find({}).toArray();
		},
		getSportsbookPageStatic() {
			return mongoPool.collection('sportsbook_page_static').find({}).toArray();
		},
		seedSportsData() {
			mongoPool.collection('popular_events').insert(popularEvents);
			mongoPool.collection('popular_competitions').insert(popularCompetitions);
			mongoPool.collection('live_events').insert(liveEvents);
			mongoPool.collection('sportsbook_page_static').insert(sportsbookPageStatic);
		}
	};
};