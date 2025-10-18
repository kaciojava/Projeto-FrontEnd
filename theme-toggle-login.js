(function(){
    const toggle = document.getElementById('themeToggle');
    const storageKey = 'ecorp-theme';

    function applyTheme(theme){
        if(theme === 'light') document.body.classList.add('light');
        else document.body.classList.remove('light');
        if(toggle) toggle.checked = (theme === 'light');
    }

    const saved = localStorage.getItem(storageKey);
    if(saved){
        applyTheme(saved);
    } else {
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(prefersLight ? 'light' : 'dark');
    }

    if(toggle){
        toggle.addEventListener('change', (e) => {
            const theme = e.target.checked ? 'light' : 'dark';
            applyTheme(theme);
            localStorage.setItem(storageKey, theme);
        });
    }
})();