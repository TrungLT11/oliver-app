import Vue from "vue";
import VTooltip from "v-tooltip";

Vue.use(VTooltip, { delay: { show: 500, hide: 100 } });
Vue.directive("tooltip", VTooltip.VTooltip);
