'use strict';
import { isUndefined } from 'lodash';
import { environment } from 'src/environments/environment';


const PORT: String = !isUndefined(environment.API_PORT) && environment.API_PORT !== 80
    ? `:${environment.API_PORT}`
    : '';
const SITE_PORT: String = !isUndefined(environment.SITE_PORT) && environment.SITE_PORT !== 80
    ? `:${environment.SITE_PORT}`
    : '';
export const SERVER_URL = `${environment.API_HTTPS ? 'https' : 'http'}://${environment.API_HOST}${PORT}${environment.API_PREFIX}/`;
export const WEB_URL = `${environment.SITE_HTTPS ? 'https' : 'http'}://${environment.SITE_HOST}${SITE_PORT}${environment.SITE_PREFIX}/`;
