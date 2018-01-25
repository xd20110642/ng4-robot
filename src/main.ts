import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {URLS} from "./app/common/server.url";

if (environment.production) {
  enableProdMode();
}
URLS.initBaseUrl();
platformBrowserDynamic().bootstrapModule(AppModule);
