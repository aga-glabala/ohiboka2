import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

require("../scss/main.scss");

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
