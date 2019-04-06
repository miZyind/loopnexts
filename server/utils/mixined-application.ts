// Node module
import { BootMixin } from '@loopback/boot';
import { RestApplication } from '@loopback/rest';
import { RepositoryMixin } from '@loopback/repository';
import { ServiceMixin } from '@loopback/service-proxy';

export default BootMixin(ServiceMixin(RepositoryMixin(RestApplication)));
