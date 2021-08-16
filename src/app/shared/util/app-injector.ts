import { Injector } from '@angular/core';

export let AppInjector: Injector;

// tslint:disable-next-line:typedef
export function setAppInjector(injector: Injector) {
    if (AppInjector) {
        console.error('Error: AppInjector was already set');
    } else {
        AppInjector = injector;
    }
}
