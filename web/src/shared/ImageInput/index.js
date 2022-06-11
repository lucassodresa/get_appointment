import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Upload, Form as FormAntd, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
import { dummyRequest, getBase64 } from 'constants/global';
import Button from 'shared/Button';
import { UploadOutlined } from '@ant-design/icons';

const ImageInput = ({
  name,
  label,
  control,
  error,
  setValue,
  shape = 'round',
  maxCount,
  tooltip = 'Max size: 1mb'
}) => {
  const [previewState, setPreviewState] = useState({
    isVisible: false,
    image: '',
    title: ''
  });
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
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value } }) => {
          return (
            <FormAntd.Item
              label={label}
              help={error?.message}
              hasFeedback
              tooltip={tooltip}
              validateStatus={(value || error) && (error ? 'error' : 'success')}
            >
              <ImgCrop shape={shape}>
                <Upload
                  onChange={({ fileList }) => {
                    setValue(name, [...fileList], {
                      shouldValidate: true
                    });
                  }}
                  onPreview={handlePreview}
                  customRequest={dummyRequest}
                  listType="picture"
                  fileList={value}
                  maxCount={maxCount}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </ImgCrop>
            </FormAntd.Item>
          );
        }}
      />
      <Modal
        visible={previewState.isVisible}
        title={previewState.title}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewState.image} />
      </Modal>
    </>
  );
};

export default ImageInput;
