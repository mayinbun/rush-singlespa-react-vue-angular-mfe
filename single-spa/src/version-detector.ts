import { deepEqual } from 'fast-equals';
import { distinctUntilChanged, filter, interval, map, pairwise, skip, timer } from 'rxjs';

function getRemoteUrls() {
    return [
        {
            app: 'gandalf',
            url: (window as any).gandalfAppUrl,
        },
    ];
}

timer(0, 5000).pipe(
    map(_ => getRemoteUrls()),
    distinctUntilChanged((a, b) => deepEqual(a, b)),
    pairwise(),
    map(([oldValue, newValue]) => {

        const changedAppNames = newValue
            .filter(({ url: url1 }) => !oldValue.some(({ url: url2 }) => url1 === url2))
            .map((value) => value.app);

        return changedAppNames;
    }),
    filter(array => Boolean(array.length)),
).subscribe((changedAppNames) => {
    console.log('v', changedAppNames);
    const currentApp = window.location.pathname.split('/')[1];

    console.log({
        changedAppNames,
        currentApp,
    });

    if (changedAppNames.includes(currentApp) && !document.getElementById('version-changed-banner')) {
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
        })

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

