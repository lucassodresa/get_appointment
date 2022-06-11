// libraries

const postService = (axios) => async (payload) => {
  const res = await axios().post('/services', payload);
  return res.data;
};

const postServiceType = (axios) => async (payload) => {
  const res = await axios().post('/service-types', payload);
  return res.data;
};

const getServiceTypes = (axios) => async () => {
  const res = await axios().get('/service-types?active=true');
  return res.data;
};

const getServices = (axios) => async () => {
  const res = await axios().get('/services');
  return res.data;
};
export default { postService, postServiceType, getServiceTypes, getServices };
