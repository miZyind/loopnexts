// Node module
import Routes from 'next-routes';

const routes = new Routes();

routes.add('/', 'index');
routes.add('/test', 'test');

export default routes;
