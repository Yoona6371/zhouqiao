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
    url: '/api/designCase/stylist/design_cases/category',
    method: 'get',
  },
  caseType: {
    url: '/designCase/designCaseCategory/client/design_cases/category/list',
    method: 'get',
  },
};

export default api;
