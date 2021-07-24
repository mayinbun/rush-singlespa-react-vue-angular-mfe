const appImports = {
  // @ts-ignore
  gandalf: () => import("gandalf/App"),
  // @ts-ignore
  saruman: () => import("saruman/App"),
  // @ts-ignore
  aragorn: () => import("aragorn/App"),
  // @ts-ignore
  legolas: () => import("legolas/App"),
}

import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

const routes = constructRoutes({
  routes: [
    {
      type: "route",
      path: "gandalf",
      routes: [
        {
          type: "main",
          attrs: [
            {
              name: "class",
              value: "gandalf",
            },
          ],
          routes: [
            {
              type: "application",
              name: "gandalf",
            },
          ],
        },
      ],
    },
    {
      type: "route",
      path: "saruman",
      routes: [
        {
          type: "main",
          attrs: [
            {
              name: "class",
              value: "saruman",
            },
          ],
          routes: [
            {
              type: "application",
              name: "saruman",
            },
          ],
        },
      ],
    },
    {
      type: "route",
      path: "aragorn",
      routes: [
        {
          type: "main",
          attrs: [
            {
              name: "class",
              value: "aragorn",
            },
          ],
          routes: [
            {
              type: "application",
              name: "aragorn",
            },
          ],
        },
      ],
    },
    {
      type: "route",
      path: "legolas",
      routes: [
        {
          type: "main",
          attrs: [
            {
              name: "class",
              value: "legolas",
            },
          ],
          routes: [
            {
              type: "application",
              name: "legolas",
            },
          ],
        },
      ],
    },
  ],
});

const applications = constructApplications({
  routes,
  loadApp: ({ name }) => appImports[name](),
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
start({
  urlRerouteOnly: true,
});
