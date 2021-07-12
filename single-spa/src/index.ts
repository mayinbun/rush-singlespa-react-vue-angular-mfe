// Ideally we would do some async call to fetch versions from the backend.
import remotes from '../remotes';

(window as any).gandalfAppUrl = remotes.gandalfApp.url;
(window as any).sarumanAppUrl = '//localhost:5002';

import('./bootstrap');
