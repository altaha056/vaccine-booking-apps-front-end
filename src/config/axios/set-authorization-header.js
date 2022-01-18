import api from './index';

export default (token = null) => {
    if (token) api.defaults.headers.common.Authorization = token;
    else delete api.defaults.headers.common.Authorization;
};
