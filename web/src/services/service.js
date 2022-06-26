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

const getServices = (axios) => async (filter) => {
  const url =
    typeof filter === 'string' ? `/services?filter=${filter}` : '/services';
  const res = await axios().get(url);
  return res.data;
};
export default { postService, postServiceType, getServiceTypes, getServices };
