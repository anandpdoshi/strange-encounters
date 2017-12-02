import request from 'superagent';

export const submitForm = ({ endpoint, data, callback }) => {
    return request
        .post(endpoint)
        .send(data)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('accept', 'json')
        .end((err, res) => {
            if (err) {
                console.error(err.text);
            } else if (res) {
                callback && callback(res);
            }
        });
};

export const createHandleChange = (actionType) => {
    return (event) => {
        const key = event.target.name;
        const value = event.target.value;
        // console.log(key, value);

        return (dispatch) => {
            dispatch({
                type: actionType,
                payload: {
                    key,
                    value
                }
            });
        }
    }
}
