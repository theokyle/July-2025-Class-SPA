import html from 'html-literal';
import navItem from "./navItem";

export default navItems => html `<nav>
    <i class="fas fa-bars"></i>
    <ul class="">
      ${navItems.map(item => navItem(item)).join("")}
    </ul>
  </nav>`