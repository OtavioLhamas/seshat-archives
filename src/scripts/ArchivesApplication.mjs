import { VueApplicationMixin } from './libs/VueApplicationMixin.mjs';
import Archives from '../templates/Archives.vue';

const { ApplicationV2 } = foundry.applications.api;

export default class ArchivesApplication extends VueApplicationMixin(ApplicationV2) {
    constructor(options = {}) {
        super(options);

        this.constructor.PARTS.archives = foundry.utils.mergeObject(this.constructor.PARTS.archives, {
            props: {
                archives: this.archives
            }
        });
    }

    static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
        id: 'seshat-archives-application',
        window: {
            title: `seshat.archives.title`,
            minimizable: true,
            resizable: true
        },
        position: {},
        actions: {},
        classes: ['seshat-archives-application'],
    }, { inplace: false });

    /** @inheritdoc */
    static PARTS = {
        archives: {
            id: 'archives',
            component: Archives,
            props: {}
        }
    };

    /**
     * @typedef {Object} Session
     * @prop {string} id Random unique ID
     * @prop {string} name
     * @prop {Date} timestamp The date this sessions was created
     * @prop {string} description
     * @prop {Object[]} messages
     */

    /** @constant
     * @type {Session[]}
     */
    #archives = [
        {
            id: foundry.utils.randomID(),
            name: `Archive 1`,
            timestamp: Date.now(),
            description: '',
            messages: game.messages.contents.slice(2, 8)
        }
    ];

    get archives() {
        return this.#archives;
    }
}
