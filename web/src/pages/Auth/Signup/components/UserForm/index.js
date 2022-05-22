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
import { useState } from 'react';
import Paragraph from '../../../../../shared/Paragraph';
import { StyledLink } from '../../../styles';
import { UploadOutlined } from '@ant-design/icons';
import { dummyRequest, getBase64 } from '../../../../../constants/global';

const UserForm = () => {
  const navigate = useNavigate();
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
    resolver: yupResolver(SCHEMAS.USER.SIGNUP),
    mode: 'onChange'
  });

  const { api } = useAxios();
  const { mutate, isLoading } = useMutation(authService.signUp(api), {
    onSuccess: ({ data }) => {
      navigate('/signin');
      notifySuccess('Sign up', data?.message);
    },
    onError: ({ response: { data } }) =>
      notifyError('Sign up', data?.data?.message)
  });

  const onSubmit = ({ name, email, password, avatar }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar.length !== 0) formData.append('avatar', avatar[0].originFileObj);

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

  return (
    <Form
      className="animationLeft"
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      autoComplete="off"
    >
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

export default UserForm;
