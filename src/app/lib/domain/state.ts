import { Page, Opts, Snapshot } from './entities';

export { Page, Opts }

export interface AppState{
    pages: Page[];
    opts: Opts;
    snapshot: Snapshot;
}