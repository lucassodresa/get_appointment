// libraries

const getMe = (axios) => async () => {
  const res = await axios().get('/users/me');
  return res.data;
};

const getUsers = (axios) => async () => {
  const res = await axios().get('/users');
  return res.data;
};

export default { getMe, getUsers };
