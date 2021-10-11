import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import LotteryInput from '../components/LotteryInput/LotteryInput';
import Seller from '../components/Seller/Seller';
import ProfileEditor from '../components/ProfileEditor/ProfileEditor';

const routes = {
  user: {
    route: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/lottery-input',
        component: LotteryInput,
      },
      {
        path: '/seller',
        component: Seller,
      },
      {
        path: '/profile-editor',
        component: ProfileEditor,
      },
      {
        path: '/',
        component: Home,
      },
    ],
    redirect: '/',
  },
  guest: {
    route: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/',
        component: Home,
      },
    ],
    redirect: '/',
  },
};

export default routes;
