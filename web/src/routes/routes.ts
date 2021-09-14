import AdminLayout from '../pages/admin/layout';
import Login from '../pages/admin/login';
import AdminHome from '../pages/admin/home';
import AdminTags from '../pages/admin/tags';
import AdminArticles from '../pages/admin/articles';

import BlogLayout from '../pages/blog/layout';
import BlogHome from '../pages/blog/home';
import BlogAbout from '../pages/blog/about';
import BlogDetail from '../pages/blog/detail';
import BlogArchive from '../pages/blog/archive';

const routes = [
  {
    title: '登录',
    path: '/login',
    component: Login
  },
  {
    title: '管理后台',
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '/home',
        component: AdminHome,
        title: '首页',
      },
      {
        path: '/articles',
        component: AdminArticles,
        title: '文章',
      },
      {
        path: '/tags',
        component: AdminTags,
        title: '标签',
      }
    ]
  },
  {
    title: '博客前台',
    path: '/blog',
    component: BlogLayout,
    children: [
      {
        path: '/home',
        component: BlogHome,
        title: '首页',
      },
      {
        path: '/about',
        component: BlogAbout,
        title: '关于',
      },
      {
        path: '/detail',
        component: BlogDetail,
        title: '详情',
      },
      {
        path: '/archive',
        component: BlogArchive,
        title: '归档',
      }
    ]
  },
]

export default routes;
