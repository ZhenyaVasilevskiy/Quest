import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue";

import Finquest from "../views/Finquest.vue";
import FinquestWelcome from "../components/finquest/FinquestWelcome.vue";
import FinquestRules from "../components/finquest/FinquestRules.vue";
import FinquestMapPoints from "../components/finquest/FinquestMapPoints.vue";

import FinquestHistory from "../views/FinHistory.vue";
import FinhistoryWelcome from "../components/finhistory/FinhistoryWelcome.vue";
import FinhistoryRules from "../components/finhistory/FinhistoryRules.vue";
import FinhistorytMapPoints from "../components/finhistory/FinhistoryMapPoints.vue";

import Finnavigator from "../views/FinNavigator.vue";
import FinnavigatorWelcome from "../components/finnavigator/FinnavigatorWelcome.vue";
import FinnavigatorRules from "../components/finnavigator/FinnavigatorRules.vue";
import FinnavigatortMapPoints from "../components/finnavigator/FinnavigatorMapPoints.vue";

import Finregulator from "../views/FinRegulator.vue";
import FinregulatorWelcome from "../components/finregulator/FinregulatorWelcome.vue";
import FinregulatorRules from "../components/finregulator/FinregulatorRules.vue";
import FinregulatortMapPoints from "../components/finregulator/FinregulatorMapPoints.vue";

import podachaVue from "../components/podacha_zayavlenia/podachaVue.vue"
import Cab from "../components/cab/Cab.vue"
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
      path: "/cab",
      name: "finquest-cab",
      component: Cab
    },
    {
        path: "/chat",
        name: "chat",
        component: Chat
    },
    {
        path: "/finquest-zayavka",
        name: "finquest-zayavka",
        component: podachaVue
    },
    {
        path: "/finquest",
        name: "finquest",
        component: Finquest,
        children: [
            {
                path: "/",
                name: "finquest-welcome",
                component: FinquestWelcome
            },
            {
                path: "/finquest/rules",
                name: "finquest-rules",
                component: FinquestRules
            }
        ]
    },
    {
        path: "/finquest-map-points",
        name: "finquest-map-points",
        component: FinquestMapPoints
    },
    // {
    //     path: "/fin-navigator",
    //     name: "finquest-navigator",
    //     component: FinquestNavigator
    // },
    {
        path: "/fin-regulator",
        name: "finquest-regulator",
        component: Finregulator
    },
    {
        path: "/fin-history",
        name: "finquest-history",
        component: FinquestHistory,
        children: [
            {
                path: "/",
                name: "finhistory-welcome",
                component: FinhistoryWelcome
            },
            {
                path: "/finquest/rules",
                name: "finhistory-rules",
                component: FinhistoryRules
            }
        ]
    },
    {
        path: "/finhistory-map-points",
        name: "finhistory-map-points",
        component: FinhistorytMapPoints
    },
    {
        path: "/fin-navigator",
        name: "finquest-navigator",
        component: Finnavigator,
        children: [
            {
                path: "/",
                name: "finnavigator-welcome",
                component: FinnavigatorWelcome
            },
            {
                path: "/finnavigator/rules",
                name: "finnavigator-rules",
                component: FinnavigatorRules
            }
        ]
    },
    {
        path: "/finnavigator-map-points",
        name: "finnavigator-map-points",
        component: FinnavigatortMapPoints
    },
    {
        path: "/fin-regulator",
        name: "finquest-regulator",
        component: Finregulator,
        children: [
            {
                path: "/",
                name: "finregulator-welcome",
                component: FinregulatorWelcome
            },
            {
                path: "/finregulator/rules",
                name: "finregulator-rules",
                component: FinregulatorRules
            }
        ]
    },
    {
        path: "/finregulator-map-points",
        name: "finregulator-map-points",
        component: FinregulatortMapPoints
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
