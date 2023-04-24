import {
  getInterfaceInfoByIdUsingGET,
  InvokeInterfaceInfoUsingPOST,
} from '@/services/flyapi_backend/interfaceInfoController';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Divider, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * 主页
 * @constructor
 */

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数错误');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res?.data);
    } catch (error: any) {
      message.error('请求失败,' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await InvokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });
      setInvokeRes(res.data);
      message.success('测试成功');
    } catch (error: any) {
      message.error('请求失败' + error.message);
    }
    setInvokeLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <PageContainer title="查看接口文档">
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Divider />
      <Divider />
      <Card>
        <Form name="invoke" onFinish={onFinish} onFinishFailed={onFinishFailed} layout={'vertical'}>
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={'返回结果'} loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
