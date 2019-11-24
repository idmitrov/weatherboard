import appConfig from '../app/App.config';

const apiMiddleware = () => (next) => (action) => {
  if (action.api) {
    const options = {
      method: action.api.method,
      headers: { 'Accept': 'application/json, text/plain, */*' }
    };

    if (action.headers) {
      for (let key in action.headers) {
        options.headers[key] = action.headers[key];
      }
    }

    if (/^POST$|^PUT$|^PATCH$/.test(options.method)) {
      if (action.payload) {
        options.body = JSON.stringify(action.payload);
        options.headers['Content-Type'] = 'application/json';
      } else if (action.file) {
        options.body = action.file;
      }
    }

    if (action.api.query) {
      action.api.endpoint += `?${action.api.query}`;
    }

    return new Promise((resolve, reject) => {
      fetch(`//${appConfig.apiUrl}/${action.api.endpoint}`, options)
        .then((response) => {
          if (!response.ok) {
            return response.json()
              .then((result) => {
                throw result;
              });
          }

          if (/application\/json/.test(response.headers.get('Content-Type'))) {
            return response.json();
          }

          return response.text();
        })
        .then((response) => resolve(response.data))
        .catch((response) => {
          let error = 'Something went wrong';

          if (response.status) {
            error = response.statusText;
          }

          if (response.errors) {
            error = response.errors;

            response.errors.forEach((error) => {
              console.log(error.id || error);
            });
          }

          return reject(error);
        })
    });
  }

  next(action);
};

export default apiMiddleware;
