    (function(){
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!header) return;

    // update CSS var so content is always below header
    function updateHeaderSpace(){
        window.requestAnimationFrame(()=>{
        const isHidden = header.classList.contains('hidden');
        const h = isHidden ? 0 : header.offsetHeight;
        document.documentElement.style.setProperty('--header-space', h + 'px');
        });
    }

    // initial
    updateHeaderSpace();

    // shrink + hide on scroll (hide when scrolling down, show when scrolling up)
    let lastY = window.scrollY || 0;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(()=>{
        const currentY = window.scrollY || 0;
            const shouldShrink = currentY > 60;
            // shrink header after scrolling a bit; only restore full header when near the top
            header.classList.toggle('shrink', shouldShrink);
            if (currentY <= 20) {
                header.classList.remove('shrink');
            }

        lastY = currentY;
        updateHeaderSpace();
        ticking = false;
        });
    }, {passive:true});

    // menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e)=>{
        const open = navMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        updateHeaderSpace();
        });

        // close when link clicked
        navMenu.addEventListener('click', (e)=>{
        if (e.target.tagName === 'A'){
            navMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            updateHeaderSpace();
        }
        });

        // close on outside click
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
