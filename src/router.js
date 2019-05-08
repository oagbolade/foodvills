import Home from './components/views/Home'
import FetchLatLng from './components/FetchLatLng'

const routes = [
    { path: '/', component: Home },
    { path: '/latlng', component: FetchLatLng },
];

export default routes;