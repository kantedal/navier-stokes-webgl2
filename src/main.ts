///<reference path="./typings/gl-matrix.d.ts" />
///<reference path="../node_modules/@types/webgl2/index.d.ts" />
///<reference path="../node_modules/@types/node/index.d.ts" />

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
