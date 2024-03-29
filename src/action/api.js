// 封装接口
const api = {
  login: {
    url: '/api/auth/password',
    method: 'post',
  },
  getVerifyCode: {
    url: '/api/sms/verifyCode',
    method: 'get',
  },
  register: {
    url: '/api/user/register',
    method: 'post',
  },
  findPassword: {
    url: '/api/my/password',
    method: 'put',
  },
  getMyInfo: {
    url: '/api/client/my/baseInfo',
    method: 'get',
  },

  rankingList: {
    url: '/api/stylist/RankingList',
    method: 'get',
  },
  test: {
    url: '/api/client/baseInfo',
    method: 'get',
  },
  categoryCase: {
    url: '/api/designCase/stylist/design_cases/category',
    method: 'get',
  },
  caseType: {
    url: '/designCase/designCaseCategory/client/design_cases/category/list',
    method: 'get',
  },
  demandSet: {
    url: '/api/client/requirement',
    method: 'post',
  },
  demandUpdate: {
    url: '/api/client/my/requirement',
    method: 'put',
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
  infoSet: {
    url: '/api/client/my/baseInfo',
    method: 'put',
  },
  nickSet: {
    url: '/api/user/my/nick',
    method: 'put',
  },
  //案例详情
  CaseDetails: {
    url: '/api/designCaseExt/client/design_cases',
    method: 'get',
  },
  //收藏案例
  CollectCase: {
    url: '/api/designCaseCollect/client/design_cases/collect/add',
    method: 'post',
  },
  DeleteCase: {
    url: '/api/designCaseCollect/client/design_cases/collect/cancel',
    method: 'delete',
  },
  mobileSet: {
    url: '/api/user/binding/mobile',
    method: 'put',
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
  // 消息
  messageList: {
    url: '/api/message/getList',
    method: 'get',
  },
  messageDetail: {
    url: '/api/message/getMessageList',
    method: 'post',
  },
  upimg: {
    url: '/api/message/chat/upimg',
    method: 'post',
  },
  ifRead: {
    url: '/api/message/readed',
    method: 'get',
  },
  revoke: {
    url: '/api/message/revoke',
    method: 'get',
  },
  send: {
    url: '/api/message/send',
    method: 'post',
  },
  // 搜索
  getSearchList: {
    url: '/api/search',
    method: 'get',
  },
  goodsDetail: {
    url: '/api/commodityExt/client/commodities/detail',
    method: 'get',
  },
  getPaymentDetail: {
    url: '/api/wxPay/unifiedOrder',
    method: 'get',
  },
  getMyAddress: {
    url: '/api/user/addresses',
    method: 'get',
  },
  addMyaddress: {
    url: '/api/user/address',
    method: 'post',
  },
  changeAddress: {
    url: '/api/user/address/',
    method: 'put',
  },
  addressDetails: {
    url: '/api/user/address/',
    method: 'get',
  },
  deleteAddress: {
    url: '/api/user/address/',
    method: 'delete',
  },
  // 生成商品订单
  generateGoodOrder: {
    url: '/api/stylist/orderCommodity',
    method: 'post',
  },
  generateDesignOrder: {
    url: '/api/client/orderDesignCase/',
    method: 'post',
  },
  // 获取订单列表
  getOrderLists: {
    url: '/api/client/orders',
    method: 'get',
  },
  //排行榜
  getRankList: {
    url: '/api/stylist/RankingList',
    method: 'get',
  },
  //订单详情
  orderDetail: {
    url: '/api/order',
    method: 'get',
  },
  // 需求详情
  demandDetail: {
    url: '/api/requirement',
    method: 'get',
  },
  orderCommodity: {
    url: '/api/stylist/orderCommodity',
    method: 'post',
  },
  orderDesignCase: {
    url: '/api/client/orderDesignCase',
    method: 'post',
  },
  MyCollectList: {
    url: '/api/designCaseCollect/client/design_cases/collect/mylist',
    method: 'get',
  },
};
export default api;
