// libraries

const signIn = (axios) => async (payload) => {
  const res = await axios().post('/auth/signin', payload);
  return res.data;
};

const signUp = (axios) => async (payload) => {
  const res = await axios().post('/auth/signup', payload);

  return res.data;
};

const validateToken = (axios) => async () => {
  const res = await axios().get('/auth/validateToken');

  return res.data;
};

export default { signIn, signUp, validateToken };
