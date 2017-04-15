const {orderedFor} = require('../lib/util');
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
		}
	};
};