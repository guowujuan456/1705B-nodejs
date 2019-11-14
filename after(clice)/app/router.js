'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/list', controller.home.listfn);
  router.get('/search', controller.home.searchfn);
  router.post('/add', controller.home.addfn);
};
