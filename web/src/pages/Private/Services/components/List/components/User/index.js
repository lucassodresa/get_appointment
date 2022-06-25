import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Page from 'shared/Page';
import useAxios from 'hooks/useAxios';
import { useMutation } from 'react-query';
import serviceService from 'services/service';
import { Card, Carousel } from 'antd';
import {
  EditOutlined,
  ClockCircleOutlined,
  EuroCircleOutlined
} from '@ant-design/icons';
import { StyledCardListContainer } from './styles';
import Button from 'shared/Button';
import { MapContainer, TileLayer, FeatureGroup, Marker } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { markenIcon } from 'constants/global';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
const { Meta } = Card;

const User = () => {
  const { api } = useAxios({ withAuth: true });
  const [showMap, setShowMap] = useState(false);
  const [polygon, setPolygon] = useState(null);
  const [services, setServices] = useState([]);
  const { mutate } = useMutation('services', serviceService.getServices(api), {
    onSuccess: ({ data: { services } }) => {
      setServices([...services]);
    },
    onError: () => setServices([])
  });

  const initialViewMapPosition = [39.7, -8.08];

  useEffect(() => {
    if (polygon?.length !== 0) {
      const filterObject = {
        polygon
      };
      const rawFilterObject = JSON.stringify(filterObject);
      mutate(rawFilterObject);
    } else {
      mutate();
    }
  }, [polygon, mutate]);

  return (
    <Page title="Services">
      <header>
        <Button onClick={() => setShowMap(true)}>Map</Button>
        <Button onClick={() => setShowMap(false)}>List</Button>
      </header>

      {showMap ? (
        <MapContainer
          style={{ width: '100%', height: '100%', borderRadius: '2px' }}
          center={initialViewMapPosition}
          zoom={6}
          minZoom={5}
          // whenCreated={setMapInstance}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
          />
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={({ layer }) => {
                const { _latlngs } = layer;
                const coordinates = _latlngs[0].map((coordinates) =>
                  Object.values(coordinates)
                );
                setPolygon([...coordinates, coordinates[0]]);
              }}
              onDeleted={() => {
                setPolygon([]);
              }}
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                polyline: false,
                marker: false
              }}
            />
          </FeatureGroup>

          {services.map(({ _id, name, company }) => {
            const {
              location: { coordinates }
            } = company;
            return (
              <Marker key={_id} icon={markenIcon} position={coordinates} />
            );
          })}
        </MapContainer>
      ) : (
        <StyledCardListContainer>
          {services.map(
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
                  <Carousel>
                    {photos.map((photo, index) => {
                      return (
                        <div key={index}>
                          <div
                            style={{
                              height: '160px',
                              backgroundImage: `url(${photo})`,
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
      )}
    </Page>
  );
};

export default User;
