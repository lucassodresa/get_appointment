import { useCallback } from 'react';
import axios from 'axios';
import StatusCodes from 'http-status-codes';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { clearToken, getToken } from '../helpers/auth';
import { loggedUserInfoState } from '../recoil/user';
import authService from '../services/auth';
import { API_URL } from '../constants/api';

const useAxios = (props) => {
  const setIsLoggedIn = useSetRecoilState(loggedUserInfoState);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setIsLoggedIn(null);
    clearToken();
    navigate('/signin');
  }, [navigate, setIsLoggedIn]);

  const api = useCallback(() => {
    const axiosInstance = axios.create({
      baseURL: `${API_URL}/api`
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;

        if (status === StatusCodes.FORBIDDEN) logout();

        return Promise.reject(error);
      }
    );

    if (props?.withAuth) {
      axiosInstance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${getToken()}`;

        return config;
      });
    }

    return axiosInstance;
  }, [logout, props]);

  const { mutate, isLoading } = useMutation(authService.validateToken(api), {
    onSuccess: () => {
      setIsLoggedIn(true);
      navigate(-1);
    },
    onError: () => logout()
  });

  const login = useCallback(() => {
    if (getToken()) mutate();
  }, [mutate]);

  return { api, logout, login, isLoadingLogin: isLoading };
};

export default useAxios;
