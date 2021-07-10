const appImports = {
    // @ts-ignore
    gandalf: () => import('gandalf/App'),
};

import { registerApplication, start } from 'single-spa';
import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine,
} from 'single-spa-layout';

const routes = constructRoutes(document.querySelector('#single-spa-layout'));
const applications = constructApplications({
        routes,
        loadApp: ({ name }) => appImports[name](),
    },
);
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
start();
