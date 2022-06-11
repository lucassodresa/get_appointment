import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SCHEMAS } from '@get_appointment/shared';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import authService from 'services/auth';
import { notifyError, notifySuccess } from 'helpers/notifications';
import useAxios from 'hooks/useAxios';
import Input from 'shared/Input';
import Button from 'shared/Button';
import Form from 'shared/Form';
import { Form as FormAntd } from 'antd';
import 'react-image-crop/dist/ReactCrop.css';
import { useEffect, useState } from 'react';
import Paragraph from 'shared/Paragraph';
import { StyledLink } from '../../../styles';

import LocationMap from './components/LocationMap';
import SearchMapInput from './components/SearchMapInput';
import ImageInput from 'shared/ImageInput';
const CompanyForm = () => {
  const navigate = useNavigate();
  const [mapInstance, setMapInstance] = useState(null);
  const [location, setLocation] = useState(null);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SCHEMAS.COMPANY.SIGNUP),
    mode: 'onChange'
  });

  const { api } = useAxios();
  const { mutate, isLoading } = useMutation(authService.signUpCompany(api), {
    onSuccess: ({ data }) => {
      navigate('/signin');
      notifySuccess('Sign up', data?.message);
    },
    onError: ({ response: { data } }) =>
      notifyError('Sign up', data?.data?.message)
  });

  const onSubmit = ({
    name,
    email,
    password,
    avatar,
    background,
    photos,
    nif,
    phone,
    location
  }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nif', nif);
    formData.append('phone', phone);
    location.forEach((item) => formData.append('location', item));
    if (avatar?.length) formData.append('avatar', avatar[0].originFileObj);
    if (background?.length)
      formData.append('background', background[0].originFileObj);
    if (photos?.length)
      photos.forEach((photo) => formData.append('photos', photo.originFileObj));

    mutate(formData);
  };

  useEffect(() => {
    location &&
      setValue('location', location, {
        ...(errors?.location?.message && { shouldValidate: true })
      });
  }, [location, setValue, errors]);

  return (
    <Form
      className="animationLeft"
      layout="vertical"
      autoComplete="off"
      onFinish={handleSubmit(onSubmit)}
    >
      <Input name="name" label="Name" control={control} error={errors.name} />
      <Input
        name="email"
        label="Email"
        control={control}
        error={errors.email}
      />

      <Input
        name="password"
        label="Password"
        control={control}
        error={errors.password}
        type="password"
      />
      <ImageInput
        control={control}
        name="avatar"
        label="Avatar"
        setValue={setValue}
        error={errors?.avatar}
        maxCount={1}
      />

      <ImageInput
        control={control}
        name="background"
        label="Background"
        setValue={setValue}
        error={errors?.background}
        maxCount={1}
      />

      <Input name="nif" label="Nif" control={control} error={errors.nif} />
      <Input
        name="phone"
        label="Phone"
        control={control}
        error={errors.phone}
      />
      <FormAntd.Item label="Location">
        <SearchMapInput setLocation={setLocation} mapInstance={mapInstance} />
        <LocationMap
          location={location}
          setLocation={setLocation}
          setMapInstance={setMapInstance}
        />
        <div className="ant-form-item-explain-error">
          {errors?.location?.message}
        </div>
      </FormAntd.Item>

      <ImageInput
        control={control}
        name="photos"
        label="Photos"
        setValue={setValue}
        error={errors?.photos}
      />

      <Button
        type="primary"
        htmlType="submit"
        style={{ marginTop: '10px' }}
        block
        loading={isLoading}
      >
        Continue
      </Button>
      <Paragraph marginBottom="20px" marginTop="20px">
        or
      </Paragraph>
      <StyledLink className="ant-btn ant-btn-block" to={'/signin'}>
        Sign In
      </StyledLink>
    </Form>
  );
};

export default CompanyForm;
