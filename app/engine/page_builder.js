import { Banner } from './banner.js';
import { Contents } from './content_body.js';


function build(){

  Banner.buildBanner();
  Contents.buildContents();

}

build();
