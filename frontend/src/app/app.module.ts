import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AccountService } from './_services';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';

// ─── DEPLOYMENT GUIDE ────────────────────────────────────────────────────────
// STAGE A (Fake Backend):
//   Keep `fakeBackendProvider` in the providers array below.
//   The app will run entirely in-browser without a real API.
//
// STAGE B (Real Backend):
//   1. Remove (or comment out) `fakeBackendProvider` from providers.
//   2. Update src/environments/environment.prod.ts with your deployed API URL.
//   3. Run: ng build --configuration production
// ─────────────────────────────────────────────────────────────────────────────

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // ── STAGE A: Fake Backend (comment out for Stage B / real backend) ──
        //fakeBackendProvider
        // ────────────────────────────────────────────────────────────────────
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
