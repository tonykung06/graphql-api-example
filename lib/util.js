// const humps = require('humps');
const _ = require('lodash');

module.exports = {
	nodeEnv: process.env.NODE_ENV || 'development',
	orderedFor(rows, collection, field, isSingleObj) {
		const keyedRows = _.groupBy(rows, field);
		return collection.map(key => {
			const rows = keyedRows[key];
			if (isSingleObj) {
				return rows ? rows[0] : {};
			}
			return rows || [];
		});
	},
	slug(str) {
		return str.toLowerCase().replace(/[\s\W-]+/g, '-');
	}
  // snakeCaseToCamelCase(graphQLType) {
  // 	return {
  // 		type: graphQLType,
  // 		resolve(obj, args, ctx, {fieldName}) {
  // 			return obj[humps.decamelize(fieldName)];
  // 		}
  // 	};
  // }
};
