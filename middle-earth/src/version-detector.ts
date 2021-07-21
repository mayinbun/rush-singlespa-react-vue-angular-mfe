import { Observable } from 'rxjs';
import { map, pairwise, retry } from 'rxjs/operators';

interface FederationModule {
    remoteName: string;
    remoteVersion: string;
}

const eventsource = new Observable<FederationModule[]>(observer => {
    const source = new EventSource('http://localhost:9999/sse');
    source.onmessage = x => observer.next(JSON.parse(x.data));
    source.onerror = x => observer.error(x);

    return () => {
        source.close();
    };
});

eventsource
    .pipe(
        pairwise(),
        map(([oldValue, newValue]) => {
            console.log({
                oldValue,
                newValue,
            });

            const changedAppNames = newValue
                .filter(({ remoteVersion: v1 }) => !oldValue.some(({ remoteVersion: v2 }) => v1 === v2))
                .map((value) => value.remoteName);

            return changedAppNames;
        }),
        retry(Infinity),
    )
    .subscribe(updatedApps => {
        console.log('updatedApps', updatedApps);
        const currentApp = window.location.pathname.split('/')[1];

        console.log({
            updatedApps,
            currentApp,
        });

        if (updatedApps.includes(currentApp) && !document.getElementById('version-changed-banner')) {
            let container = document.createElement('div');
            container.id = 'version-changed-container';
            container.className = 'version-changed-container';
            container.setAttribute('style',
                `
            position: absolute;
            background: #333333;
            right: 1rem;
            top: 1rem;
            text-align: center;
            border-radius: 3px;
            cursor: pointer;
        `,
            );

            container.addEventListener('click', () => {
                window.location.reload();
            });

            let text = document.createElement('h4');
            text.setAttribute('style', `
        color: #999999;
        margin: 0;
        padding: 1rem;
        `);
            text.textContent = `New version of ${currentApp} available!`;

            container.appendChild(text);

            document.body.appendChild(container);
        }
    });
