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
};

export default api;
