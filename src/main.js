import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/ru-RU";
Vue.use(ElementUI, { locale });
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
import SlideUpDown from "vue-slide-up-down";
import VueSelect from "@desislavsd/vue-select";
import ElementUI from "element-ui";

Vue.config.productionTip = false;

// Vue pages
Vue.component("v-home", require("./views/Home.vue").default);
Vue.component("v-chat", require("./views/Chat.vue").default);
Vue.component("v-finquest", require("./views/Finquest.vue").default);
Vue.component("v-fin-navigator", require("./views/FinNavigator.vue").default);
Vue.component("v-fin-regulator", require("./views/FinRegulator.vue").default);

// Vue components
Vue.component("v-header", require("./components/HeaderSection.vue").default);
Vue.component("v-choose-game", require("./components/ChooseTheGame.vue").default);
Vue.component("v-choose-game-block", require("./components/ChooseGameBlock.vue").default);
Vue.component("v-finquest-map", require("./components/finquest/FinquestMap.vue").default);
Vue.component("v-finquest-map-points", require("./components/finquest/FinquestMapPoints.vue").default);
Vue.component("v-finquest-aside", require("./components/finquest/FinquestAside.vue").default);
Vue.component("v-finquest-welcome", require("./components/finquest/FinquestWelcome.vue").default);
Vue.component("v-finquest-rules", require("./components/finquest/FinquestRules.vue").default);
Vue.component("v-stopwatch", require("./components/Stopwatch.vue").default);
Vue.component("v-fin-navigator-map", require("./components/fin-navigator/FinNavigatorMap.vue").default);
Vue.component("v-fin-regulator-map", require("./components/fin-regulator/FinRegulatorMap.vue").default);

// Vue help components
Vue.component("v-icons", require("./components/IconsRender.vue").default);
Vue.component("v-vue-select", VueSelect.vSelect);
Vue.component("v-slide-up-down", SlideUpDown);
Vue.component("v-checkbox", require("./components/form-components/VueCheckbox.vue").default);
Vue.component("v-finquest-modals", require("./components/finquest-modals/FinquestModalsWrapper.vue").default);

// Вопросы для Финквеста
Vue.component("v-domashny-1", require("./components/finquest-modals/Domashny1.vue").default);
Vue.component("v-deshevay-8", require("./components/finquest-modals/Deshevay8.vue").default);
Vue.component("v-finansov-17", require("./components/finquest-modals/Finansov17.vue").default);
Vue.component("v-controly-12", require("./components/finquest-modals/Controly12.vue").default);
Vue.component("v-obmennay-11", require("./components/finquest-modals/Obmennay11.vue").default);
Vue.component("v-finansov-15", require("./components/finquest-modals/Finansov15.vue").default);
Vue.component("v-razumnogo-potrebleniy-6", require("./components/finquest-modals/RazumnogoPotrebleniy6.vue").default);
Vue.component("v-predprinimatelskay-5", require("./components/finquest-modals/Predprinimatelskay5.vue").default);
Vue.component("v-kartochnay-7", require("./components/finquest-modals/Kartochnay7.vue").default);
Vue.component("v-bankovskay-4", require("./components/finquest-modals/Bankovskay4.vue").default);
// Vue.component("v-job-application", require("./components/finquest-modals/JobApplication.vue").default);
// Vue.component("v-wage", require("./components/finquest-modals/Wage.vue").default);
// Vue.component("v-dismissial", require("./components/finquest-modals/Dismissial.vue").default);
// Vue.component("v-family-budget", require("./components/finquest-modals/FamilyBudget.vue").default);
// Vue.component("v-credit", require("./components/finquest-modals/Credit.vue").default);
// Vue.component("v-money-storage", require("./components/finquest-modals/MoneyStorage.vue").default);
// Vue.component("v-business-development", require("./components/finquest-modals/BusinessDevelopment.vue").default);
// Vue.component("v-taxes-for-individuals", require("./components/finquest-modals/TaxesForIndividuals.vue").default);
// Vue.component("v-business-opening", require("./components/finquest-modals/BusinessOpening.vue").default);

// hint modals
Vue.component("v-hint-modal", require("./components/hint-modal/HintModalWrapper.vue").default);
Vue.component("v-hint-modal-inner", require("./components/hint-modal/HintModalInner.vue").default);
Vue.component("v-hint-modal-activate", require("./components/hint-modal/HintModalActivate.vue").default);
Vue.component("v-points-hint", require("./components/hint-modal/PointsHint.vue").default);

// congratulation modals
Vue.component("v-congratulation-modal", require("./components/congratulation-modals/CongratulationModalWrapper.vue").default);
Vue.component("v-congratulation-philanthropist", require("./components/congratulation-modals/CongratulationPhilanthropist.vue").default);
Vue.component("v-congratulation-ecologist", require("./components/congratulation-modals/CongratulationEcologist.vue").default);
Vue.component("v-congratulation-false", require("./components/congratulation-modals/CongratulationFalse.vue").default);
Vue.component("v-congratulation-financier", require("./components/congratulation-modals/CongratulationFinancier.vue").default);
Vue.component("v-expert-financial-history", require("./components/congratulation-modals/ExpertFinancialHistory.vue").default);
Vue.component("v-financial-well-being", require("./components/congratulation-modals/FinancialWellBeing.vue").default);
Vue.component("v-financial-regulatory-institutions", require("./components/congratulation-modals/FinancialRegulatoryInstitutions.vue").default);
Vue.component("v-finquest-question-result", require("./components/congratulation-modals/FinquestQuestionResult.vue").default);
Vue.component("v-finquest-area-modal-1", require("./components/congratulation-modals/FinquestAreaModal1.vue").default);
Vue.component("v-open-rollup", require("./components/finquest-modals/openRollup.vue").default);
Vue.component("v-finquest-area-modal-2", require("./components/congratulation-modals/FinquestAreaModal2.vue").default);
Vue.component("v-finquest-area-modal-3", require("./components/congratulation-modals/FinquestAreaModal3.vue").default);
Vue.component("v-finquest-area-modal-4", require("./components/congratulation-modals/FinquestAreaModal4.vue").default);
Vue.component("v-congratulation-golden", require("./components/congratulation-modals/CongratulationGolden.vue").default);
Vue.component("v-congratulation-silver", require("./components/congratulation-modals/CongratulationSilver.vue").default);
Vue.component("v-congratulation-bronze", require("./components/congratulation-modals/CongratulationBronze.vue").default);
Vue.component("v-congratulation-place", require("./components/congratulation-modals/CongratulationPlace.vue").default);

// vee-validate form
Vue.use(VeeValidate, {
    inject: false,
    dictionary: {
        ru: {
            messages: {
                _default: (field) => `Значение поля недопустимо.`,
                after: (field, [target, inclusion]) => `В поле должна быть дата после ${inclusion ? "или равная " : ""}${target}.`,
                alpha: (field) => `Поле может содержать только буквы.`,
                alpha_dash: (field) => `Поле может содержать только буквы, цифры и дефис.`,
                alpha_num: (field) => `Поле может содержать только буквы и цифры.`,
                alpha_spaces: (field) => `Поле может содержать только буквы и пробелы.`,
                before: (field, [target, inclusion]) => `В поле должна быть дата до ${inclusion ? "или равная " : ""}${target}.`,
                between: (field, [min, max]) => `Поле должно быть между ${min} и ${max}.`,
                confirmed: (field, [confirmedField]) => `Поле не совпадает с ${confirmedField}.`,
                credit_card: (field) => `Поле должно быть действительным номером карты`,
                date_between: (field, [min, max]) => `Поле должно быть между ${min} и ${max}.`,
                date_format: (field, [format]) => `Поле должно быть в формате ${format}.`,
                decimal: (field, [decimals = "*"] = []) =>
                    `Поле должно быть числовым и может содержать${decimals === "*" ? " десятичные числа" : " " + decimals + " десятичных чисел"}.`,
                digits: (field, [length]) => `Поле должно быть числовым и точно содержать ${length} цифры.`,
                dimensions: (field, [width, height]) => `Поле должно быть ${width} пикселей на ${height} пикселей.`,
                email: (field) => `Поле должно быть действительным электронным адресом.`,
                excluded: (field) => `Поле должно быть допустимым значением.`,
                ext: (field, [...args]) => `Поле должно быть действительным файлом. (${args})`,
                image: (field) => `Поле должно быть изображением.`,
                included: (field) => `Поле должно быть допустимым значением.`,
                integer: (field) => `Поле должно быть целым числом.`,
                ip: (field) => `Поле должно быть действительным IP-адресом.`,
                length: (field, [length, max]) => {
                    if (max) {
                        return `Длина поля должна быть между ${length} и ${max}.`;
                    }

                    return `Длина поля должна быть ${length}.`;
                },
                max: (field, [length]) => `Поле не может быть более ${length} символов.`,
                max_value: (field, [max]) => `Поле должно быть не больше, чем ${max}.`,
                mimes: (field, [...args]) => `Поле должно иметь допустимый тип файла. (${args})`,
                min: (field, [length]) => `Поле должно быть не менее ${length} символов.`,
                min_value: (field, [min]) => `Поле должно быть ${min} или больше.`,
                numeric: (field) => `Поле должно быть числом.`,
                regex: (field) => `Поле имеет ошибочный формат.`,
                required: (field) => `Поле обязательно для заполнения.`,
                size: (field, [size]) => `Поле должно быть меньше, чем ${size}.`,
                url: (field) => `Поле имеет ошибочный формат URL.`
            }
        }
    },
    locale: "ru"
});

//Vue modal
window.$finquestModal = Vue.observable({ value: null });
window.$hintModal = Vue.observable({ value: null });
window.$congratModal = Vue.observable({ value: null });
Vue.mixin({
    methods: {
        openFinquestModal(name) {
            this.$set(window.$finquestModal, "value", name);
        },
        closeFinquestModal() {
            this.$set(window.$finquestModal, "value", null);
        },
        openHintModal(name) {
            this.$set(window.$hintModal, "value", name);
        },
        closeHintModal() {
            this.$set(window.$hintModal, "value", null);
        },
        openCongratulationModal(name) {
            this.$set(window.$congratModal, "value", name);
        },
        closeCongratulationModal() {
            this.$set(window.$congratModal, "value", null);
        }
    }
});

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app");
