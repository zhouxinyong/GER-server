/**
 * @author zhaodonghong
 * @fileoverview routers user.js
 * @date 2017/02/22
 */

module.exports = function( Router ){
	var routers = ['/index', '/user/add', '/user/detail','/user/changepass'];
	routers.forEach((v)=>{
		Router.get(v, function( req, res ){
			res.render('index',{
				isLogin: req.session.isLogin,
				character: req.session.character
			});
		});
	});
	return Router;
};