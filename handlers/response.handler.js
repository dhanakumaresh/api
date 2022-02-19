let success = {
    _httpStatus: 200,
    _body: {
        status: 0,
        message: '_received',
        _data: {}
    }
  };
  let created = {
    _httpStatus: 201,
    _body: {
        status: 0,
        message: '_success',
        _data: {}
    }
  };

  let failure = {
    _httpStatus: 500,
    _body: {
        status: 1,
        message: '_Bad_request'
    }
  };

  module.exports = { success, created, failure}
