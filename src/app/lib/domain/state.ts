import { Page, Opts } from './entities';
import { WikiPagesSnapshotMap } from '../classes/WikiPages';

export { Page, Opts }

export interface AppState{
    pagesState: Page[];
    optsState: Opts;
    snapshotState: WikiPagesSnapshotMap;
}