'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async searchfn() {
    const { ctx } = this;
    let { key } = ctx.query
    let result = await ctx.service.home.searchfn(key)
    try {
      ctx.body = {
        code: 1,
        result
      }
    } catch (e) {
      ctx.body = {
        e: e,
        code: -1
      }
    }
    ctx.body = {
      result
    }
  }
  async addfn() {
    let { ctx } = this
    let { username, password, address, idCard, phone } = ctx.request.body
    // console.log(1111111)
    let result = ctx.service.home.addfns(username, password, address, idCard, phone)
    ctx.body = {
      data: "添加成功",
      result
    }
  }
  async listfn() {
    const { ctx } = this;
    let { pagenum = 1, limit = 2 } = ctx.query;
    let result = await ctx.service.home.find(pagenum, limit)
    try {
      ctx.body = {
        result,
        msg: "相应成功"
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: "请求出错"
      }

    }
  }
}

module.exports = HomeController;
