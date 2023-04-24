import { ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table/lib';
import { Modal } from 'antd';
import React from 'react';
import { API } from '../../../../../types';

export type Props = {
  columns: ProColumns<API.UserVo>[];
  onCancel: () => void;
  onSubmit: (values: API.UserVo) => Promise<void>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onCancel, onSubmit } = props;
  return (
    <Modal visible={visible} onCancel={() => onCancel?.()} footer={null}>
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};

export default CreateModal;
