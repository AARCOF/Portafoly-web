import 'zone.js'; // Importing zone.js for Angular's change detection and async operations
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // ✅ aquí sí es válido
  ],
}).catch((err) => console.error(err));
