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
import Paragraph from 'shared/Paragraph';
import ImageInput from 'shared/ImageInput';
import { StyledLink } from 'pages/Auth/styles';

const UserForm = () => {
  const navigate = useNavigate();

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

  return (
    <Form
      className="animationLeft"
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <ImageInput
        control={control}
        name="avatar"
        label="Avatar"
        setValue={setValue}
        error={errors?.avatar}
        maxCount={1}
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
    </Form>
  );
};

export default UserForm;
