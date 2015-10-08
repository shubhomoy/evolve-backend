/**
* Photo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	indentity : 'Photo',
	autoPK : false,
	autoCreatedAt: false,
	autoUpdatedAt: false,
	tableName: 'photos',
	connection: 'someMysqlServer',
	attributes: {
		id: {type: 'integer', primaryKey: true, autoIncrement: true},
  		user_id: 'integer',
  		photo_date: 'string',
  		name: 'string',
  		description: 'string',
  		lat: 'string',
  		lon: 'string'
	}
};

