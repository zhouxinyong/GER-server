/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/02/22
 */
var express = require('express');
var router = express.Router();

module.exports = [];

function addRouter(path) {
  module.exports.push(require(path)(router));
}

addRouter('./login');
addRouter('./user');/*
addRouter('./logout');
addRouter('./error');*/