import {
  Button,
  Card,
  Form,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';

/**
 * 蛇者页面
 * @constructor
 */

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const [user, setUser] = useState(null);
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState;

  const initialValues = {
    username: loginUser.username,
    gender: loginUser.gender,
    userAvatar: null, // 用户头像不从用户信息中获取，而是从上传的图片中获取
  };

  useEffect(() => {
    setUser(loginUser);
  }, [loginUser]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card bordered={true} title={'个人设置'} style={{ width: 600 }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name=""
            initialValue={loginUser.username}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="用户头像" name="userAvatar" initialValue={loginUser.userAvatar}>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item label="性别" name="gender" initialValue={loginUser.gender}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="手机号" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="用户等级" name="userRole">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              更新
            </Button>

            <span style={{ marginRight: 200 }} />

            <Button type="primary" htmlType="submit" href="/">
              返回
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Settings;
