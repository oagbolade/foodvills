import Home from './components/views/Home'
import Results from './components/Results'
import FetchLatLng from './components/FetchLatLng'

const routes = [
    { path: '/', component: Home },
    { path: '/results', component: Results },
    { path: '/latlng', component: FetchLatLng },
];

export default routes;