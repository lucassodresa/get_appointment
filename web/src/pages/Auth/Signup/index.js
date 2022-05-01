import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SCHEMAS } from '@get_appointment/shared';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/auth';
import { StyledLink, StyledSection } from '../styles';
import { notifyError, notifySuccess } from '../../../helpers/notifications';
import useAxios from '../../../hooks/useAxios';
import Input from '../../../shared/Input';
import Title from '../../../shared/Title';
import Paragraph from '../../../shared/Paragraph';
import Button from '../../../shared/Button';
import Form from '../../../shared/Form';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import 'react-image-crop/dist/ReactCrop.css';
import { useState } from 'react';

const SignUp = () => {
  const navigate = useNavigate();
  const [avatarList, setAvatarList] = useState([]);
  const {
    handleSubmit,
    control,
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

  const onSubmit = ({ name, email, password }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatarList[0].originFileObj);

    mutate(formData);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <StyledSection>
      <Title>Sign Up</Title>
      <Paragraph marginBottom="52px">Access the app by signing up</Paragraph>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ImgCrop shape="round">
          <Upload
            onChange={({ fileList }) => setAvatarList([...fileList.slice(-1)])}
            onPreview={onPreview}
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={avatarList}
          >
            + Add Avatar
          </Upload>
        </ImgCrop>

        <Input
          name="name"
          placeholder="Name"
          control={control}
          error={errors.name}
        />

        <Input
          name="email"
          placeholder="Email"
          control={control}
          error={errors.email}
        />

        <Input
          name="password"
          placeholder="Password"
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
      </Form>
    </StyledSection>
  );
};

export default SignUp;
