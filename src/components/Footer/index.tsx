
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Fly ',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'FlyCode',
          href: 'https://github.com/flybase1',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/flybase1',
          blankTarget: true,
        },
        {
          key: 'qq',
          title: <QqOutlined />,
          href: 'https://github.com/flybase1',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
