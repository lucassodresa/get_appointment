import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Page from 'shared/Page';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import useAxios from 'hooks/useAxios';
import { yupResolver } from '@hookform/resolvers/yup';
import { SCHEMAS } from '@get_appointment/shared';
import { useMutation, useQuery } from 'react-query';
import Form from 'shared/Form';
import Input from 'shared/Input';
import Button from 'shared/Button';
import { notifyError, notifySuccess } from 'helpers/notifications';
import serviceService from 'services/service';
import Select from 'shared/Select';
import { Select as SelectAntd } from 'antd';
import Slider from 'shared/Slider';
import ImageInput from 'shared/ImageInput';
import ActionPageContainer from 'shared/ActionPageContainer';
const { Option } = SelectAntd;

const New = () => {
  const navigate = useNavigate();
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SCHEMAS.SERVICE.CREATE),
    mode: 'onChange',
    defaultValues: {
      duration: 30,
      price: 10
    }
  });
  const { api } = useAxios({ withAuth: true });

  const { mutate, isLoading } = useMutation(serviceService.postService(api), {
    onSuccess: ({ data: { message } }) => {
      notifySuccess('Create', message);
      // navigate('/services');
    },
    onError: ({ response: { data } }) =>
      notifyError('Create', data?.data?.message)
  });

  const marks = {
    5: "5'",
    30: "30'",
    60: "60'",
    90: "90'"
  };

  const { data } = useQuery(
    'serviceTypes',
    serviceService.getServiceTypes(api)
  );

  const onSubmit = ({ name, description, typeId, photos, price, duration }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('typeId', typeId);
    formData.append('price', price);
    formData.append('duration', duration);

    if (photos?.length)
      photos.forEach((photo) => formData.append('photos', photo.originFileObj));

    mutate(formData);
  };

  return (
    <Page
      title="New Service"
      tooltipText="Back"
      actionButtonIcon={<ArrowLeftOutlined />}
      action={() => navigate('/services')}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} type="page">
        <Input name="name" label="Name" control={control} error={errors.name} />

        <Input
          name="description"
          label="Description"
          control={control}
          error={errors.description}
          type="textarea"
          autoSize={{ minRows: 2, maxRows: 3 }}
        />

        <Select
          name="typeId"
          label="Type"
          control={control}
          error={errors.typeId}
          placeholder="Select type"
        >
          {data?.data?.services?.map(({ _id, name }) => (
            <Option key={_id} value={_id}>
              {name}
            </Option>
          ))}
        </Select>

        <Input
          name="price"
          label="Price"
          control={control}
          error={errors.price}
          type="number"
          min={1}
          formatter={(value) => `${value}€`}
          parser={(value) => value?.replace('€', '')}
        />
        <Slider
          name="duration"
          label="Duration"
          control={control}
          error={errors.duration}
          min={5}
          max={90}
          step={5}
          defaultValue={30}
          marks={marks}
          tooltip="Duration in minutes"
        />
        <ImageInput
          control={control}
          name="photos"
          label="Photos"
          setValue={setValue}
          error={errors?.photos}
        />

        <ActionPageContainer>
          <Link style={{ whiteSpace: 'nowrap' }} to="service-type">
            New Service Type
          </Link>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Create
          </Button>
        </ActionPageContainer>
      </Form>
    </Page>
  );
};

export default New;
