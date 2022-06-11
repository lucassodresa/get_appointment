import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Page from 'shared/Page';
import { PlusOutlined } from '@ant-design/icons';
import useAxios from 'hooks/useAxios';
import { useQuery } from 'react-query';
import serviceService from 'services/service';
import { Card, Carousel } from 'antd';
import {
  EditOutlined,
  ClockCircleOutlined,
  EuroCircleOutlined
} from '@ant-design/icons';
import { StyledCardListContainer } from './styles';
const { Meta } = Card;

const List = () => {
  const navigate = useNavigate();
  const { api } = useAxios({ withAuth: true });

  const { data } = useQuery('services', serviceService.getServices(api));

  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };

  return (
    <Page
      title="Services"
      tooltipText="New Service"
      actionButtonIcon={<PlusOutlined />}
      action={() => navigate('new')}
    >
      <StyledCardListContainer>
        {data?.data?.services?.map(
          ({ _id, name, description, price, duration, photos }) => {
            return (
              <Card
                key={_id}
                extra={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      gap: '30px'
                    }}
                  >
                    <span>
                      <EuroCircleOutlined /> {`${price}€`}
                    </span>

                    <span>
                      <ClockCircleOutlined /> {`${duration}'`}
                    </span>
                  </div>
                }
                style={{ width: '300px' }}
                actions={[
                  <Link to={`/services/${_id}`} key="edit">
                    <EditOutlined />
                  </Link>
                ]}
              >
                <Carousel afterChange={onChange}>
                  {photos.map((photo, index) => {
                    return (
                      <div key={index}>
                        <div
                          style={{
                            height: '160px',
                            background: `url(${photo})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </Carousel>
                <Meta title={name} description={description} />
              </Card>
            );
          }
        )}
      </StyledCardListContainer>
    </Page>
  );
};

export default List;
