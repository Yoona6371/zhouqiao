// 封装接口
const api = {
  categoryCase: {
    url: '/api/designCase/stylist/design_cases/category',
    method: 'get',
  },
  login: {
    url: '/api/auth/password',
    method: 'post',
  },
  getMyInfo: {
    url: '/api/client/my/baseInfo',
    method: 'get',
  },
  caseType: {
    url: '/designCase/designCaseCategory/client/design_cases/category/list',
    method: 'get',
  },
  rankingList: {
    url: '/api/stylist/RankingList',
    method: 'get',
  },
  demandSet: {
    url: '/api/client/requirement',
    method: 'post',
  },
  demandUpdate: {
    url: '/api/client/my/requirement',
    method: 'post',
  },
  demandDelete: {
    url: '/api/client/my/requirement',
    method: 'delete',
  },
  myRequirements: {
    url: '/api/client/my/requirements',
    method: 'get',
  },
  requirementDetail: {
    url: '/api/requirement',
    method: 'post',
  },
  fileUpdate: {
    url: '/api/resource/file',
    method: 'post',
  },
  requirementCategories: {
    url: '/api/requirement/categories',
    method: 'get',
  },
  // 获取他人信息
  // await request.otherInfo(
  //   { userId: 'cfc241796dc3f8d4a86150a1131789d3' },
  //   false,
  // )
  getOthersDetail: {
    url: '/api/stylist',
    method: 'get',
  },

  // 获取他人关注列表
  // await request.getOthersFocusList(
  //   { page: 1, size: 1 },
  //   '/cfc241796dc3f8d4a86150a1131789d3/follower',
  // ),
  getOthersFocusList: {
    url: '/api/user',
    method: 'get',
  },

  // 账号密码认证
  // await request.accountAuthentication({}, false, {
  //   account: "19834422405",
  //   password: 'hxl1974428129',
  // }),
  accountAuthentication: {
    url: '/api/auth/password',
    method: 'post',
  },

  // 关注用户
  // const message = await request.focusUser(
  //   {},
  //   '/a64bbe91e048638e09ef6b7213f02d32/follower',
  // );
  focusUser: {
    url: '/api/user',
    method: 'post',
  },

  // 取消关注用户
  // const message = await request.unfocusUser(
  //   {},
  //   '/a64bbe91e048638e09ef6b7213f02d32/follower',
  // );
  unfocusUser: {
    url: '/api/user',
    method: 'delete',
  },

  // 我的关注列表
  // const message = await request.myFocusList(
  //  { page: 1, size: 1 });
  myFocusList: {
    url: '/api/my/follower',
    method: 'get',
  },

  // 我的粉丝列表
  // const message = await request.myFansList(
  //  { page: 1, size: 1 });
  myFansList: {
    url: '/api/my/fans',
    method: 'get',
  },
  goodsList: {
    url: '/api/client/commodities',
    method: 'get',
  },
  getSlideShow: {
    url: '/api/slideShow',
    method: 'get',
  },
  // 获取设计案例
  getDesignExample: {
    url: '/api/designCase/stylist/other/design_cases',
    method: 'get',
  },
  // 搜索
  getSearchList: {
    url: '/api/search',
    method: 'get',
  },
};

export default api;
