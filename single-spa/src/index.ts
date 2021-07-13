fetch('http://localhost:9999/versions').then(res => res.json()).then((meta) => {
    // set remote urls
    meta.forEach(app => (window as any)[app.remoteWindowProperty] = `${app.remoteLocalUrl}/${app.remoteEntryFileName}`);

    // bootstrap single-spa
    import('./bootstrap');
});
