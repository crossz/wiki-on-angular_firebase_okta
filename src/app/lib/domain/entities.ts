import { HttpResponse } from '@angular/common/http';
import { WikiPagesPageMap } from '../classes/WikiPages';

export class Page {
  // TODO: These two important properties are not returned from Gitlab Wiki Api.
  created: number;
  modified: number;
 
    // {
    //   "content" : "Hello world",
    //   "format" : "markdown",
    //   "slug" : "Hello",
    //   "title" : "Hello"
    // }
   
  content: string;
  format: string;
  slug: string;
  title: string;

  // TODO: POST method will return: 
  // response (post method) from uploading an attachment to the wiki repository:   
    // {
    //   "file_name" : "dk.png",
    //   "file_path" : "uploads/6a061c4cf9f1c28cb22c384b4b8d4e3c/dk.png",
    //   "branch" : "master",
    //   "link" : {
    //     "url" : "uploads/6a061c4cf9f1c28cb22c384b4b8d4e3c/dk.png",
    //     "markdown" : "![dk](uploads/6a061c4cf9f1c28cb22c384b4b8d4e3c/dk.png)"
    //   }
    // }

  file_name: string;
  file_path: string;
  branch: string;

  // TODO: check wich works from the folloing 2:
  // link: Map<string, string>;
  link: {url: string; markdown: string};
}

export class Opts {
  projectId: string;
  slug: string;
}

export class Snapshot {
  resp: HttpResponse<Object>;
  page: WikiPagesPageMap;
}