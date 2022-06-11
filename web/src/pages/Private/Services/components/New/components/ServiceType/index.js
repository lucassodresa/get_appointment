import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from 'shared/Page';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import useAxios from 'hooks/useAxios';
import { yupResolver } from '@hookform/resolvers/yup';
import { SCHEMAS } from '@get_appointment/shared';
import { useMutation } from 'react-query';
import Form from 'shared/Form';
import Input from 'shared/Input';
import Button from 'shared/Button';
import { notifyError, notifySuccess } from 'helpers/notifications';
import serviceService from 'services/service';
import ActionPageContainer from 'shared/ActionPageContainer';

const ServiceType = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SCHEMAS.SERVICE_TYPE.CREATE),
    mode: 'onChange'
  });
  const { api } = useAxios({ withAuth: true });

  const { mutate, isLoading } = useMutation(
    serviceService.postServiceType(api),
    {
      onSuccess: ({ data: { message } }) => {
        notifySuccess('Service Type', message);
      },
      onError: ({ response: { data } }) =>
        notifyError('Service Type', data?.data?.message)
    }
  );

  return (
    <Page
      title="New Service Type"
      tooltipText="Back"
      actionButtonIcon={<ArrowLeftOutlined />}
      action={() => navigate('/services/new')}
    >
      <Form layout="vertical" onFinish={handleSubmit(mutate)} type="page">
        <Input name="name" label="Name" control={control} error={errors.name} />

        <Input
          name="description"
          label="Description"
          control={control}
          error={errors.description}
          type="textarea"
          autoSize={{ minRows: 2, maxRows: 3 }}
          tooltip="This field is optional"
        />

        <ActionPageContainer>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Request
          </Button>
        </ActionPageContainer>
      </Form>
    </Page>
  );
};

export default ServiceType;
