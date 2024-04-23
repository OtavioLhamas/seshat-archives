import ArchivesApplication from "./ArchivesApplication.mjs";
import { localize } from "./libs/helpers.mjs";
import '../styles/module.scss';

Hooks.once('ready', async () => {
    console.log(`${localize('seshat.archives.title')} is ready!`);
    new ArchivesApplication().render(true);
});

