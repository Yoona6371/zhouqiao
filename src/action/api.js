// 封装接口
const api = {
  login: {
    url: '/users/login',
    method: 'put',
  },
  getGroup: {
    url: '/group/all',
    method: 'get',
  },
  postInfo: {
    url: '/info/submit',
    method: 'post',
  },
  patchInfo: {
    url: '/info/patch',
    method: 'patch',
  },
  deleteInfo: {
    url: '/info/delete',
    method: 'delete',
  },
  test: {
    url: '/',
    method: 'get',
  },
  // 获取他人信息
  // await request.otherInfo(
  //   { userId: 'cfc241796dc3f8d4a86150a1131789d3' },
  //   false,
  // )
  getOthersDetail: {
    url: '/api/client',
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

  // 获取我的基本信息
  myInfo: {
    url: '/api/client/my/baseInfo',
    method: 'get',
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
    url: 'api/my/fans',
    method: 'get',
  },
};

export default api;
