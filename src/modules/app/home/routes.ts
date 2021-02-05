import router from 'reactor/router';
import Home from './components/Home';
import Layout from 'reactor/layout/components/Layout';

router.partOf(Layout, [{
    path: '/', 
    component: Home, 
}]);