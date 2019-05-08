import Home from './components/views/Home'
import Results from './components/Results'
import FetchLatLng from './components/FetchLatLng'
import Map from './components/views/Map'

const routes = [
    { path: '/', component: Home },
    { path: '/latlng', component: FetchLatLng },
];

export default routes;