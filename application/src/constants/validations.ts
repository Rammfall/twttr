const validationLength = {
  user: {
    username: {
      minLength: 2,
      maxLength: 30,
    },
    email: {
      minLength: 3,
      maxLength: 320,
    },
    password: {
      minLength: 8,
      maxLength: 60,
    },
  },
};

export default validationLength;
