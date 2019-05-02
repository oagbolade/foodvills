import Home from './components/views/Home'
import Results from './components/Results'
import FetchLatLng from './components/FetchLatLng'
import Map from './components/views/Map'

const routes = [
    { path: '/', component: Home },
    { path: '/results', component: Results },
    { path: '/latlng', component: FetchLatLng },
    { path: '/map', component: Map },
];

export default routes;