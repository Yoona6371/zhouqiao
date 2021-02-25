// 封装接口
const api = {
  login: {
    url: '/api/auth/password',
    method: 'post',
  },
  register:{
    utl:'/api/user/register',
    method:'post',
  },
  getMyInfo: {
    url: '/api/client/my/baseInfo',
    method: 'get',
  },
  getGroup: {
    url: '/group/all',
    method: 'get',
  },
  getVerifyCode: {
    url: '/api/sms/verifyCode',
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
};

export default api;
