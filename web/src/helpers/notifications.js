import { notification } from 'antd';

export const notifyError = (title, description) => {
  return notification.error({
    message: `${title} error`,
    description
  });
};

export const notifySuccess = (title, description) => {
  return notification.success({
    message: `${title} success`,
    description
  });
};
