    (function(){
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!header) return;

    // atualiza a variável CSS para que o conteúdo fique sempre abaixo do cabeçalho
    function updateHeaderSpace(){
        window.requestAnimationFrame(()=>{
        const isHidden = header.classList.contains('hidden');
        const h = isHidden ? 0 : header.offsetHeight;
        document.documentElement.style.setProperty('--header-space', h + 'px');
        });
    }

    // inicial
    updateHeaderSpace();

    // encolher ao rolar; restaurar cabeçalho completo apenas quando estiver no topo
    let lastY = window.scrollY || 0;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(()=>{
        const currentY = window.scrollY || 0;
            const shouldShrink = currentY > 60;
            // encolhe o cabeçalho após rolar um pouco; restaura o cabeçalho completo somente quando estiver próximo ao topo
            header.classList.toggle('shrink', shouldShrink);
            if (currentY <= 20) {
                header.classList.remove('shrink');
            }

        lastY = currentY;
        updateHeaderSpace();
        ticking = false;
        });
    }, {passive:true});

    // alternador do menu
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e)=>{
        const open = navMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        updateHeaderSpace();
        });

        // fecha quando um link é clicado
        navMenu.addEventListener('click', (e)=>{
        if (e.target.tagName === 'A'){
            navMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            updateHeaderSpace();
        }
        });

        // fecha ao clicar fora do cabeçalho
        document.addEventListener('click', (e)=>{
        if (!header.contains(e.target)){
            navMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            updateHeaderSpace();
        }
        });
    }

    window.addEventListener('resize', updateHeaderSpace);
    window.addEventListener('load', updateHeaderSpace);
    })();
