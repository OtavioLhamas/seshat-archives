import Dialog from '../templates/Dialog.vue';
import { VueApplicationMixin } from './libs/VueApplicationMixin.mjs';

const { ApplicationV2 } = foundry.applications.api;

export default class NewSessionDialog extends VueApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
        id: `app-${Math.random().toString(36).substr(2, 9)}`,
        window: {
            title: `seshat.archives.title`,
            icon: "fa-solid fa-triangle-exclamation"
        },
        position: {
            width: 680,
            height: "auto"
        },
        actions: {}
    }, { inplace: false });

    static PARTS = {
        app: {
            id: "app",
            component: Dialog,
            scrollable: [],
        }
    };
}
