// 封装接口
const api = {
    login: {
        url: '/users/login',
        method: 'put'
    },
    getGroup: {
        url: '/group/all',
        method: 'get'
    },
    postInfo: {
        url: '/info/submit',
        method: 'post'
    },
    patchInfo: {
        url: '/info/patch',
        method: 'patch'
    },
    deleteInfo: {
        url: '/info/delete',
        method: 'delete'
    }
};

export default api;