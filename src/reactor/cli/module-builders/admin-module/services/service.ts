import { RestfulEndpoint } from "reactor/http";

class ServiceClassNameService extends RestfulEndpoint {
    route = 'service-route';
}

const serviceObjectService: ServiceClassNameService = new ServiceClassNameService();

export default serviceObjectService;