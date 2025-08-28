import {header, nav, main, footer} from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { camelCase } from "lodash";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector('#root').innerHTML = `
  ${header(state)}
  ${nav(store.nav)}
  ${main(state)}
  ${footer()}`;

  router.updatePageLinks();
}

router.on({
  "/": () => render(),
  
  '/:view': function(match) {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    if (view in store) {
      render(store[view]);
    } else {
      render(store.viewNotFound);
      console.log(`View ${view} not defined`);
    }
  }
}).resolve();

// add menu toggle to bars icon in nav bar
document.querySelector(".fa-bars").addEventListener("click", () => {
  document.querySelector("nav > ul").classList.toggle("hidden--mobile");
});
