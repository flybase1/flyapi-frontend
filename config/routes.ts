export default [
  { path: '/', name: '主页', icon: 'smile', component: './index/index' },
  {
    path: '/interface_info/:id',
    name: '查看接口',
    icon: 'smile',
    component: './InterfaceInfo/index',
    hideInMenu: true,
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
      { name: '个人设置', path: '/user/settings', component: './User/Settings' },
      { name: '忘记密码', path: '/user/forgetPassword', component: './User/ForgetPassword' },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface_info',
        component: './admin/InterfaceInfo',
      },
      {
        name: '用户管理',
        icon: 'table',
        path: '/admin/userInfo',
        component: './admin/UserInfo',
      },
    ],
  },

  /*  { path: '/', redirect: '/welcome' },*/
  { path: '*', layout: false, component: './404' },
];
