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
    url: '/api/client/baseInfo',
    method: 'get',
  },
  categoryCase: {
    url: '/api/designCase/stylist/design_cases/category/0001',
    method: 'get',
  },
};

export default api;
