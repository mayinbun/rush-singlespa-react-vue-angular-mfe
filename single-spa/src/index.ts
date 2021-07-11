// Ideally we would do some async call to fetch versions from the backend.

(window as any).gandalfAppUrl = '//localhost:5001/remoteEntry.js?v=1.0';
(window as any).sarumanAppUrl = '//localhost:5002/remoteEntry.js?v=1.0';

import('./bootstrap');
