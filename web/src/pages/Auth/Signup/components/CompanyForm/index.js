import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SCHEMAS } from '@get_appointment/shared';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import authService from '../../../../../services/auth';
import {
  notifyError,
  notifySuccess
} from '../../../../../helpers/notifications';
import useAxios from '../../../../../hooks/useAxios';
import Input from '../../../../../shared/Input';
import Button from '../../../../../shared/Button';
import Form from '../../../../../shared/Form';
import ImgCrop from 'antd-img-crop';
import { Upload, Form as FormAntd, Modal } from 'antd';
import 'react-image-crop/dist/ReactCrop.css';
import { useEffect, useState } from 'react';
import Paragraph from '../../../../../shared/Paragraph';
import { StyledLink } from '../../../styles';
import { UploadOutlined } from '@ant-design/icons';
import { dummyRequest, getBase64 } from '../../../../../constants/global';
import LocationMap from './components/LocationMap';
import SearchMapInput from './components/SearchMapInput';
const CompanyForm = () => {
  const navigate = useNavigate();
  const [mapInstance, setMapInstance] = useState(null);
  const [location, setLocation] = useState(null);
  const [previewState, setPreviewState] = useState({
    isVisible: false,
    image: '',
    title: ''
  });
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
    if (avatar.length !== 0) formData.append('avatar', avatar[0].originFileObj);
    if (background.length !== 0)
      formData.append('background', background[0].originFileObj);
    if (photos.length !== 0)
      photos.forEach((photo) => formData.append('photos', photo.originFileObj));

    mutate(formData);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewState({
      image: file.url || file.preview,
      isVisible: true,
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };

  const handleCancel = () => setPreviewState({ isVisible: false });

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
      <Controller
        control={control}
        name="avatar"
        render={({ field: { value } }) => {
          return (
            <FormAntd.Item
              label="Avatar"
              help={errors?.avatar?.message}
              hasFeedback
              tooltip="Max size: 1mb"
              validateStatus={
                (value || errors?.avatar) &&
                (errors?.avatar ? 'error' : 'success')
              }
            >
              <ImgCrop shape="round">
                <Upload
                  onChange={({ fileList }) => {
                    setValue('avatar', [...fileList], {
                      shouldValidate: true
                    });
                  }}
                  onPreview={handlePreview}
                  customRequest={dummyRequest}
                  listType="picture"
                  fileList={value}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </ImgCrop>
            </FormAntd.Item>
          );
        }}
      />

      <Controller
        control={control}
        name="background"
        render={({ field: { value } }) => {
          return (
            <FormAntd.Item
              label="Background"
              help={errors?.background?.message}
              hasFeedback
              tooltip="Max size: 1mb"
              validateStatus={
                (value || errors?.background) &&
                (errors?.background ? 'error' : 'success')
              }
            >
              <ImgCrop shape="round">
                <Upload
                  onChange={({ fileList }) => {
                    setValue('background', [...fileList], {
                      shouldValidate: true
                    });
                  }}
                  onPreview={handlePreview}
                  customRequest={dummyRequest}
                  listType="picture"
                  fileList={value}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </ImgCrop>
            </FormAntd.Item>
          );
        }}
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

      <Controller
        control={control}
        name="photos"
        render={({ field: { value } }) => {
          return (
            <FormAntd.Item
              label="Photos"
              help={errors?.photos?.message}
              hasFeedback
              tooltip="Max size: 1mb"
              validateStatus={
                (value || errors?.photos) &&
                (errors?.photos ? 'error' : 'success')
              }
            >
              <ImgCrop shape="round">
                <Upload
                  onChange={({ fileList }) => {
                    setValue('photos', [...fileList], {
                      shouldValidate: true
                    });
                  }}
                  onPreview={handlePreview}
                  customRequest={dummyRequest}
                  listType="picture"
                  fileList={value}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </ImgCrop>
            </FormAntd.Item>
          );
        }}
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
      <Modal
        visible={previewState.isVisible}
        title={previewState.title}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewState.image} />
      </Modal>
    </Form>
  );
};

export default CompanyForm;
