// Adicionar funcionalidade para os modais de projetos
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    const scrollCards = document.querySelectorAll('.scroll-card');
    const openProjectBtns = document.querySelectorAll('.open-project');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const backToProjectsLinks = document.querySelectorAll('.back-to-projects');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    
    // ===== Navegação e Header =====
    
    // Efeito de scroll no header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-medium)';
            header.style.padding = '0.7rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = 'var(--spacing-sm) 0';
        }
        
        // Mostrar/esconder botão de voltar ao topo
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Atualizar link ativo no menu
        updateActiveNavLink();
        
        // Animar cards de rolagem na seção Sobre
        animateScrollCards();
    });
    
    // Função para animar cards de rolagem
    function animateScrollCards() {
        scrollCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                card.classList.add('visible');
            }
        });
    }
    
    // Iniciar animação dos cards visíveis na carga da página
    setTimeout(animateScrollCards, 300);
    
    // Menu mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Navegação suave ao clicar nos links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fechar menu mobile se estiver aberto
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Animação suave de scroll
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Atualizar URL sem recarregar a página
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Atualizar link ativo no menu com base na seção visível
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Botão voltar ao topo
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Filtro de Projetos =====
    // ===== Filtro de Projetos + "Ver mais" =====
    if (filterBtns.length > 0 && projectCards.length > 0) {
        const grid = document.querySelector(".projects-grid");
        const MAX_VISIBLE = 6;
        let viewMoreWrap = null;
    
        // cria/garante wrapper do botão
        function ensureViewMoreWrap() {
        if (!viewMoreWrap) {
            viewMoreWrap = document.createElement("div");
            viewMoreWrap.className = "view-more-wrap";
            grid.insertAdjacentElement("afterend", viewMoreWrap);
        }
        return viewMoreWrap;
        }
    
        // aplica filtro + limita a 6
        function applyFilter(filterValue) {
        // 1) filtra quais devem ficar visíveis por categoria
        const match = [];
        const hide = [];
    
        projectCards.forEach(card => {
            const category = card.getAttribute("data-category");
            const inFilter = (filterValue === "all" || category === filterValue);
            if (inFilter) {
            match.push(card);
            } else {
            hide.push(card);
            }
        });
    
        // 2) esconde os que não pertencem ao filtro
        hide.forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
            card.classList.remove("is-hidden"); // para não acumular classe
            card.style.display = "none";
            }, 150);
        });
    
        // 3) mostra apenas os 6 primeiros do filtro
        match.forEach((card, idx) => {
            card.style.removeProperty("display");
            // usa classe para esconder > 6
            if (idx < MAX_VISIBLE) {
            card.classList.remove("is-hidden");
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 50);
            } else {
            card.classList.add("is-hidden");
            }
        });
    
        // 4) botão "Ver mais / Ver menos" (só aparece se houver mais de 6)
        const wrap = ensureViewMoreWrap();
        wrap.innerHTML = ""; // limpa anterior
    
        const hasMore = match.length > MAX_VISIBLE;
        if (hasMore) {
            const btn = document.createElement("button");
            btn.className = "btn btn-small view-more-btn";
            btn.textContent = "Ver mais";

            let expanded = false;
    
            btn.addEventListener("click", () => {
                if (!expanded) {
                    // Mostrar todos
                    match.forEach(card => card.classList.remove("is-hidden"));
                    btn.textContent = "Ver menos";
                    expanded = true;
                } else {
                    // Voltar a mostrar apenas os 6 primeiros
                    match.forEach((card, idx) => {
                        if (idx < MAX_VISIBLE) {
                            card.classList.remove("is-hidden");
                        } else {
                            card.classList.add("is-hidden");
                        }
                    });
                    btn.textContent = "Ver mais";
                    expanded = false;
                }
            });
    
            wrap.appendChild(btn);
        }
        }
    
        // clique nos botões de filtro (mantendo sua UX atual)
        filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filterValue = btn.getAttribute("data-filter");
            applyFilter(filterValue);
        });
        });
    
        // estado inicial: usa o botão que já vem com .active
        const initial = document.querySelector(".filter-btn.active");
        applyFilter(initial ? initial.getAttribute("data-filter") : "all");
    }  

    // ===== Card Flip Interativo =====
    const flipCard = document.querySelector('.flip-card');
    if (flipCard) {
        // Adicionar classe para iniciar animação após carregamento
        setTimeout(() => {
            flipCard.classList.add('loaded');
        }, 1000);
        
        // Alternar flip ao clicar no card
        flipCard.addEventListener('click', () => {
            flipCard.classList.toggle('flipped');
        });
    }

    // ===== Modais de Projetos =====
    
    // Abrir modal de projeto
    if (openProjectBtns.length > 0) {
        openProjectBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                const modal = document.getElementById(`modal-${projectId}`);
                
                if (modal) {
                    // Impedir scroll da página
                    document.body.style.overflow = 'hidden';
                    
                    // Mostrar modal com animação
                    modal.classList.add('active');
                }
            });
        });
    }
    
    // Fechar modal ao clicar no botão de fechar
    if (modalCloseButtons.length > 0) {
        modalCloseButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                
                if (modal) {
                    // Fechar modal com animação
                    modal.classList.remove('active');
                    
                    // Restaurar scroll da página após animação
                    setTimeout(() => {
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });
    }
    
    // Fechar modal ao clicar no link "Voltar para Projetos"
    if (backToProjectsLinks.length > 0) {
        backToProjectsLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Encontrar o modal pai
                const modal = this.closest('.modal-overlay');
                
                if (modal) {
                    // Fechar modal com animação
                    modal.classList.remove('active');
                    
                    // Restaurar scroll da página após animação
                    setTimeout(() => {
                        document.body.style.overflow = '';
                        
                        // Scroll até a seção de projetos
                        const projectsSection = document.querySelector('#projetos');
                        if (projectsSection) {
                            window.scrollTo({
                                top: projectsSection.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                }
            });
        });
    }
    
    // Fechar modal ao clicar fora dele
    if (modalOverlays.length > 0) {
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                // Verificar se o clique foi no overlay e não no conteúdo do modal
                if (e.target === this) {
                    // Fechar modal com animação
                    this.classList.remove('active');
                    
                    // Restaurar scroll da página após animação
                    setTimeout(() => {
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });
    }

    // ===== Certificações Clicáveis =====
    const certLinks = document.querySelectorAll('.cert-card');
    if (certLinks.length > 0) {
        certLinks.forEach(link => {
            link.addEventListener('click', function() {
                const certUrl = this.getAttribute('data-url');
                if (certUrl) {
                    window.open(certUrl, '_blank');
                }
            });
        });
    }

    // ===== Formulário de Contato =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio de formulário com feedback visual
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Simular delay de envio
            setTimeout(() => {
                // Mostrar mensagem de sucesso
                const formGroups = this.querySelectorAll('.form-group');
                const lastFormGroup = formGroups[formGroups.length - 1];
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Mensagem enviada com sucesso!';
                successMessage.style.color = 'var(--accent-color)';
                successMessage.style.fontWeight = '500';
                successMessage.style.marginTop = 'var(--spacing-sm)';
                
                // Inserir mensagem após o último form-group
                lastFormGroup.insertAdjacentElement('afterend', successMessage);
                
                // Resetar formulário
                contactForm.reset();
                
                // Restaurar botão
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Remover mensagem após alguns segundos
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 3000);
            }, 1500);
        });
    }
});
