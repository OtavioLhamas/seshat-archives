<script setup>
import { ref, onMounted, onUpdated, onUnmounted, computed, watch } from 'vue';
import NewArchiveDialog from '../scripts/NewArchiveDialog.mjs';
import { localize } from '../scripts/libs/helpers.mjs';

const props = defineProps({
    archives: Array
})

const archives = ref(props.archives)
const selectedArchive = ref(null)

function createArchiveDialog() {
    new NewArchiveDialog().render(true);
}

function addLastMessage() {
    for (let index = 2; index < 12; index++) {
        /** @type Array */
        let msg = game.messages;
        let x = Math.floor(Math.random() * (index - 1) + 1);
        let y = Math.floor(Math.random() * (index - 1) + 1);
        archives.value.push({
            id: foundry.utils.randomID(),
            name: `Archive ${archives.value.length + 1}`,
            timestamp: Date.now(),
            description: '',
            messages: msg.contents.slice(x > y ? y : x, x > y ? x : y)
        });
    }
}

/**
 * @param {int} index - The index of the archive to be selected
 */
function selectArchive(index) {
    selectedArchive.value = archives.value[index];
    console.log(selectedArchive)
}

/**
 * @param {number} timestamp - The timestamp to be formated
 */
function dateFormat(timestamp) {
    return new Date(timestamp).toLocaleDateString();
}

onMounted(() => {
    console.log('App Mounted');
});

onUpdated(() => {
    console.log('App Updated');
});

onUnmounted(() => {
    console.log('App Unmounted');
});

</script>

<template>
    <aside class="sidebar flexcol directory">

        <header class="card sidebar-header directory-header">
            <i class="fas fa-home sidebar-home" @click="selectedArchive = null"></i>
            <p>Seshat's Archives</p>
        </header>

        <nav class="sidebar-nav">
            <ol class="archive-list directory-list">
                <li v-for="(archive, index) in archives" class="archive-item text directory-item"
                    @click="selectArchive(index)">

                    <button class="archive-button">
                        <span class="archive-name">{{ archive.name }}</span>
                        <!-- <span class="archive-messages">{{ messageRange(archive.messages) }}</span> -->
                        <span class="archive-timestamp">{{ dateFormat(archive.timestamp) }}</span>
                    </button>

                </li>
            </ol>
        </nav>

        <div class="buttons-footer flexrow">
            <button type="button" @click="createArchiveDialog()">
                {{ localize('seshat.archives.newArchive') }}
            </button>
            <button type="button" @click="addLastMessage()">
                {{ localize('seshat.archives.newArchive') }} 10
            </button>
        </div>

    </aside>

    <section class="content flexcol">

        <header class="content-header">
            {{ selectedArchive ? selectedArchive.name : "Summary" }}
        </header>

        <div class="content-body">
            <span class="message-count">Messages: {{ selectedArchive?.messages?.length }}</span>
            <span class="message-count">Rolls: {{ selectedArchive?.messages?.filter(x => x.rolls.length > 0).length }}</span>

        </div>

    </section>
</template>

<style scoped lang="scss">
@import "../styles/module.scss";

$seshat-sidebar-width: 300px;

.sidebar {
    transition: margin-left 450ms ease;
    max-height: 100%;
    flex-basis: $seshat-sidebar-width;
    color: var(--color-text-light-highlight);

    .sidebar-header {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin: 0.5rem;
        align-items: center;

        .sidebar-home {
            font-size: var(--font-size-32);
            cursor: pointer;
        }
    }

    .sidebar-nav {
        flex: 1;
        position: relative;
        margin-bottom: 0.5rem;

        .archive-list {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            padding-right: 0.5rem;
            scrollbar-width: thin;
            scrollbar-color: $seshat-color-darkgold transparent;

            .archive-item {
                display: flex;
                flex-direction: column;
                position: relative;
                margin-bottom: 0.5rem;

                .archive-button {
                    margin: 0;
                    font-size: var(--font-size-24);
                    min-height: 4rem;

                    .archive-name {
                        flex: 1;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .archive-messages {
                        position: absolute;
                        bottom: 0;
                        left: 0.25rem;
                        font-size: 0.75rem;
                        line-height: 1rem;
                    }

                    .archive-timestamp {
                        position: absolute;
                        bottom: 0;
                        right: 0.25rem;
                        font-size: 0.75rem;
                        line-height: 1rem;
                    }
                }
            }
        }
    }

    .buttons-footer {
        flex: none;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }

}

.content {
    flex: 1;
    height: 100%;
    background-color: rgba($color: $seshat-color-darkblue, $alpha: 0.1);
    border: 2px solid #000;
    border-radius: 4px;

    .content-header {
        flex: none;
        margin: 1rem;
        border: 1px transparent;
        font-size: var(--font-size-46);
        font-weight: bold;
        letter-spacing: 1px;
        text-align: center;
        background: rgba($color: #000000, $alpha: 0.25);
        border-radius: 4px;
    }

    .content-body {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 0 0.5rem 1rem 1rem;
    }
}
</style>
