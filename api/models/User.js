/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	autoPK : false,
	autoCreatedAt: false,
	autoUpdatedAt: false,
	tableName: 'users',
	connection: 'someMysqlServer',
	attributes: {
  		id: {
  			type: 'integer',
  			primaryKey: true
  		},
  		email: 'string',
  		phone: 'string',
  		otp: 'string',
      tokens : {
        collection: 'AccessToken',
        via : 'owner'
      }
	}
};

