import { setModules } from "reactor/router/modules-list";

setModules([
  {
    path: '/',
    name: 'app',
    modules: [
      {
        entry: ['/'],
        module: 'home',
      },
    ]
  },
]);