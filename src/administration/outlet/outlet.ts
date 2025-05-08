// index.ts
import { Router } from "@vaadin/router";
import "./pages/users.page"; // Adding the lit-app component here for better performance
import "../styles"; // Adding the lit-app component here for better performance
import { IconComponent } from "firelight-ui/icons/ui-icon.component";

IconComponent.colorways = {
  primary: {
    primary: "var(--primary-800)",
    secondary: "var(--primary-300)",
    shadow: "var(--gray-600)",
  },
};

const routes = [
  {
    path: "/locksmith/users/:urlGroup?/:urlKey?",
    component: "locksmith-users-page",
  },
  {
    path: "(.*)",
    action: (r) => {
      console.log(r);
      console.warn("Page not found");
      Router.go("/locksmith/users");
    },
    component: "not-found-page",
  },
];

const outlet = document.getElementById("outlet");
export const router = new Router(outlet);
router.setRoutes(routes);
