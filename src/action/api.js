// 封装接口
const api = {
  designCase_list: {
    url: '/api/designCase/stylist/design_cases/category',
    method: 'get',
  },
  designCase_species: {
    url: '/designCase/designCaseCategory/client/design_cases/category/list',
    method: 'get',
  },
  rankingList: {
    url: '/api/stylist/RankingList',
    method: 'get',
  },
};

export default api;
