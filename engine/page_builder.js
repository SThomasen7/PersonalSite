import { Banner } from './banner.js';
import { Contents } from './content-body.js';


function build(){

  Banner.buildBanner();
  Contents.buildContents();

}

build();
