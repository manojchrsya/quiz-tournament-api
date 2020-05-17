

module.exports = function (Customer) {
  Customer.setup = function () {
    const CustomerModel = this;
    CustomerModel.validatesUniquenessOf('email', {
      message: 'already exists.',
    });
  };
  Customer.setup();

  Customer.signup = function (ctx, options) {
    const {
      name, password, email,
    } = options;
    const customerData = {
      name,
      email,
      password,
    };
    return Customer.create(customerData);
  };

  Customer.remoteMethod(
    'signup',
    {
      description: 'Sign up customer.',
      accepts: [
        { arg: 'ctx', type: 'object', http: { source: 'context' } },
        // eslint-disable-next-line max-len
        {
          arg: 'options', type: 'object', required: true, http: { source: 'body' },
        },
      ],
      returns: {
        arg: 'status', type: 'object', root: true,
      },
      http: { verb: 'post' },
    },
  );

  Customer.saveAnswer = function (ctx, options) {
    const data = {
      questionId: options.questionId,
      answer: options.answer,
    };
    const { userId } = ctx.req.accessToken;
    data.userId = userId;
    return QuizLog.upsertWithWhere({ userId: data.userId, questionId: data.questionId }, data);
  };

  Customer.remoteMethod(
    'saveAnswer',
    {
      description: 'Sign up customer.',
      accepts: [
        { arg: 'ctx', type: 'object', http: { source: 'context' } },
        // eslint-disable-next-line max-len
        {
          arg: 'options', type: 'object', required: true, http: { source: 'body' },
        },
      ],
      returns: {
        arg: 'status', type: 'object', root: true,
      },
      http: { url: 'saveAnswer/:questionId', verb: 'post' },
    },
  );
};
