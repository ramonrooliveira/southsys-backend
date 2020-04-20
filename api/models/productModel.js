'use strict';
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    dropDups: true,
    required: 'Please, enter a product name'
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Products', ProductSchema);