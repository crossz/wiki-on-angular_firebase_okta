import { Page, Opts } from './entities';

export { Page, Opts }

export interface AppState{
    pages: Page[];
    opts: Opts;
}