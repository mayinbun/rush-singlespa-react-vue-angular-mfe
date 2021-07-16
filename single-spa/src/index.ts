fetch('http://localhost:9999/versions').then(res => res.json()).then((meta) => {
    // set remote urls dynamically

    meta.forEach(app => {
        (window as any)[app.remoteWindowProperty] = app.remoteLocalUrl + app.remoteEntryFileName
    });

    // bootstrap shell
    import('./bootstrap');
});
