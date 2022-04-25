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
import { setToken } from '../../../helpers/auth';
import { loggedUserInfoState } from '../../../recoil/user';
import { useSetRecoilState } from 'recoil';

const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SCHEMAS.USER.SIGNIN),
    mode: 'onChange'
  });
  const { api } = useAxios();
  const setLoggedUserInfo = useSetRecoilState(loggedUserInfoState);

  const { mutate, isLoading } = useMutation(authService.signIn(api), {
    onSuccess: ({ data: { message, user, token } }) => {
      setToken(token);
      setLoggedUserInfo(user);
      notifySuccess('Sign In', message);
      navigate('/users');
    },
    onError: ({ response: { data } }) =>
      notifyError('Sign In', data?.data?.message)
  });

  return (
    <StyledSection>
      <Title>Sign In</Title>
      <Paragraph marginBottom="52px">
        Access the app by entering your credentials
      </Paragraph>
      <Form onSubmit={handleSubmit(mutate)}>
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
          Sign In
        </Button>
        <Paragraph marginBottom="20px" marginTop="20px">
          or
        </Paragraph>
        <StyledLink className="ant-btn ant-btn-block" to={'/signup'}>
          Sign Up
        </StyledLink>
      </Form>
    </StyledSection>
  );
};

export default SignIn;
