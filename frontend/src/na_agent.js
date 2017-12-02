import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

// TODO modify this
// const API_ROOT = 'http://localhost:3000/api';
const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).then(responseBody)
};

const Auth = {
    // should be post
    login: () =>
        requests.get(`/auth/login`),

    logout: () =>
        requests.get(`/auth/logout`)

};

const Articles = {
  all: page =>
    requests.get(`/articles?limit=10`)
};

export default {
    Auth,
    Articles
};
