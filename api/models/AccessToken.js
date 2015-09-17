/**
* AccessToken.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	indentity : 'AccessToken',
	autoPK : false,
	autoCreatedAt: false,
	autoUpdatedAt: false,
	tableName: 'access_tokens',
	connection: 'someMysqlServer',
	attributes: {
  		user_id: 'integer',
  		token: 'string',
  		owner: {
  			model:'User',
  			columnName: 'user_id'
  		}
	}

};

