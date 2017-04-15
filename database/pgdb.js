const humps = require('humps');
const {orderedFor, slug} = require('../lib/util');

module.exports = pgPool => {
	return {
		getUsersByApiKeys(apiKeys) {
			return pgPool.query(`
				select * from users
				where api_key = ANY($1)
			`, [apiKeys]).then(res => {
				return orderedFor(humps.camelizeKeys(res.rows), apiKeys, 'apiKey', true);
			});
		},
		getUsersByIds(userIds) {
			return pgPool.query(`
				select * from users
				where id = ANY($1)
			`, [userIds]).then(res => {
				return orderedFor(humps.camelizeKeys(res.rows), userIds, 'id', true);
			});
		},
		getContestsForUserIds(userIds) {
			return pgPool.query(`
				select * from contests
				where created_by = ANY($1)
			`, [userIds]).then(res => orderedFor(humps.camelizeKeys(res.rows), userIds, 'createdBy', false));
		},
		getNamesForContestIds(contestIds) {
			return pgPool.query(`
				select * from names
				where contest_id = ANY($1)
			`, [contestIds]).then(res => orderedFor(humps.camelizeKeys(res.rows), contestIds, 'contestId', false));
		},
		getTotalVotesByNameIds(nameIds) {
			// total_votes_by_name is a database view
			// create view total_votes_by_name as
			// select id as name_id,
			// 	(select count(up) from votes v where v.name_id = n.id and up = true) as up,
			//     (select count(up) from votes v where v.name_id = n.id and up = false) as down
			// from names n;
			return pgPool.query(`
				select name_id, up, down from total_votes_by_name
				where name_id = ANY($1)
			`, [nameIds]).then(res => {
				return orderedFor(humps.camelizeKeys(res.rows), nameIds, 'nameId', true);
			});
		},

		addNewContest({apiKey, title, description}) {
			return pgPool.query(`
				insert into contests(code, title, description, created_by)
				values (
					$1,
					$2,
					$3,
					(select id from users where api_key = $4)
				)
				returning *
			`, [slug(title), title, description, apiKey]).then(res => {
				return humps.camelizeKeys(res.rows[0]);
			});
		},

		addName({apiKey, contestId, label, description}) {
			return pgPool.query(`
				insert into names(contest_id, label, description, created_by, normalized_label)
				values (
					$1,
					$2,
					$3,
					(select id from users where api_key = $4),
					$5
				)
				returning *
			`, [Number(contestId), label, description, apiKey, slug(label)]).then(res => {
				return humps.camelizeKeys(res.rows[0]);
			});
		},

		getActivitiesForUserIds(userIds) {
			return pgPool.query(`
				select created_by, created_at, label, '' as title, 'name' as activity_type
				from names
				where created_by = ANY($1)
				union
				select created_by, created_at, '' as label, title, 'contest' as activity_type
				from contests
				where created_by = ANY($1)
			`, [userIds]).then(res => orderedFor(humps.camelizeKeys(res.rows), userIds, 'createdBy', false));
		}
	};
};