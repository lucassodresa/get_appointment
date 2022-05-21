import { useForm } from 'react-hook-form';
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
import { Upload, Form as FormAntd } from 'antd';
import 'react-image-crop/dist/ReactCrop.css';
import { useEffect, useState } from 'react';
import Paragraph from '../../../../../shared/Paragraph';
import { StyledLink } from '../../../styles';
import { UploadOutlined } from '@ant-design/icons';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Control from 'react-leaflet-control';
import { dummyRequest } from '../../../../../constants/global';
import StyledButton from '../../../../../shared/Button/styles';

const CompanyForm = () => {
  const navigate = useNavigate();
  const [avatarList, setAvatarList] = useState([]);
  const [backgroundList, setBackgroundList] = useState([]);
  const [photosList, setPhotosList] = useState([]);
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(null);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SCHEMAS.COMPANY.SIGNUP),
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
    if (avatarList.length !== 0)
      formData.append('avatar', avatarList[0].originFileObj);
    if (backgroundList.length !== 0)
      formData.append('background', backgroundList[0].originFileObj);
    if (photosList.length !== 0)
      formData.append('photos', photosList[0].originFileObj);

    mutate(formData);
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

  function MarkerLocation({ location, setLocation }) {
    const icon = L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png'
    });

    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setLocation([lat, lng]);
      }
    });

    return location && <Marker icon={icon} position={location} />;
  }

  const initialViewMapPosition = [39.7, -8.08];

  const LocationControl = () => {
    return (
      <div className="leaflet-bottom leaflet-left">
        <div className="leaflet-control leaflet-bar">
          <button style={{ height: '25px', width: '25px' }}>GPS</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log(map);
    // if (map) L.control.locate({ showPopup: false }).addTo(map);
    // console.log(map);
  }, [map]);

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
      <FormAntd.Item label="Avatar">
        <ImgCrop shape="round">
          <Upload
            onChange={({ fileList }) => setAvatarList([...fileList.slice(-1)])}
            onPreview={onPreview}
            customRequest={dummyRequest}
            listType="picture"
            fileList={avatarList}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </ImgCrop>
      </FormAntd.Item>
      <FormAntd.Item label="Background">
        <ImgCrop>
          <Upload
            onChange={({ fileList }) =>
              setBackgroundList([...fileList.slice(-1)])
            }
            onPreview={onPreview}
            customRequest={dummyRequest}
            listType="picture"
            fileList={backgroundList}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </ImgCrop>
      </FormAntd.Item>

      <Input name="nif" label="Nif" control={control} error={errors.nif} />
      <Input
        name="phone"
        label="Phone"
        control={control}
        error={errors.phone}
      />
      <FormAntd.Item label="Location">
        <MapContainer
          style={{ width: '100%', height: '300px', borderRadius: '2px' }}
          center={initialViewMapPosition}
          zoom={6}
          minZoom={5}
          ref={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
          />
          <Control position="topleft">
            <button>G</button>
          </Control>
          <MarkerLocation location={location} setLocation={setLocation} />
        </MapContainer>
      </FormAntd.Item>

      <FormAntd.Item label="Photos">
        <ImgCrop>
          <Upload
            onChange={({ fileList }) => setPhotosList([...fileList])}
            onPreview={onPreview}
            customRequest={dummyRequest}
            listType="picture"
            fileList={photosList}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </ImgCrop>
      </FormAntd.Item>

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

export default CompanyForm;
