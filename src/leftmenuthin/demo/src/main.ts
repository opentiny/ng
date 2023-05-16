import { enableProdMode } from '@angular/core';

import { AppModule } from './app/AppModule';
import { environment } from '../../../environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err: any) => console.error(err));
