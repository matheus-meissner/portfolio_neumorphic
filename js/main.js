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

    // ===== Toggle de linguagem (PT <-> EN) =====
    const langToggle = document.getElementById('langToggle');

    // Mapeamento de textos por seletor (sem precisar trocar HTML)
    const i18n = {
    pt: {
        'a.nav-link[href="#home"]': 'Home',
        'a.nav-link[href="#sobre"]': 'Sobre',
        'a.nav-link[href="#tecnologias"]': 'Tecnologias',
        'a.nav-link[href="#certificacoes"]': 'Certificações',
        'a.nav-link[href="#experiencia"]': 'Experiência',
        'a.nav-link[href="#educacao"]': 'Educação',
        'a.nav-link[href="#projetos"]': 'Projetos',
        'a.nav-link[href="#contato"]': 'Contato',

        '#home .hero-text h1': 'Olá, eu sou Matheus Meissner',
        '#home .hero-text h2': 'Dynamics Developer & Functional Consultant',
        '.flip-message': 'Role pra baixo e me conheça melhor',

        '#sobre .section-header h2': 'Sobre Mim',
        '#sobre .section-header p': 'Conheça um pouco da minha história e experiência',

        '#tecnologias .section-header h2': 'Tecnologias',
        '#tecnologias .section-header p': 'Ferramentas e linguagens que utilizo no dia a dia',

        '#certificacoes .section-header h2': 'Certificações',
        '#certificacoes .section-header p': 'Certificados e Licenças',

        '#experiencia .section-header h2': 'Experiência',
        '#experiencia .section-header p': 'Minha trajetória profissional',
        '#experiencia .timeline-card .timeline-date': '2024 ~ Presente',
        // --- Best.Projects ---
        '#experiencia .timeline-item:nth-child(1) .timeline-description p:nth-child(1)': 'Após o período de estágio, fui efetivado como Desenvolvedor & Consultor Funcional, atuando de forma estratégica na entrega de soluções completas dentro da Power Platform.',
        '#experiencia .timeline-item:nth-child(1) .timeline-description p:nth-child(2)': 'Desenvolvo fluxos avançados no Power Automate, aplicativos em Canvas App, Custom APIs e customizações no Dynamics, garantindo integração, desempenho e aderência às regras de negócio.',
        '#experiencia .timeline-item:nth-child(1) .timeline-description p:nth-child(3)': 'Produzo documentações técnicas, participo de reuniões com clientes, gerencio papéis de segurança e estruturo unidades organizacionais, utilizando Azure Functions e implementando soluções de IA no stack Microsoft para automações e otimização de processos.',
        // --- Atma Entretenimento ---
        '#experiencia .timeline-item:nth-child(2) .timeline-description p:nth-child(1)': 'No time de desenvolvimento da empresa, utilizei Python para criar ferramentas que otimizaram processos do setor de pré-produção, aumentando a eficiência, a precisão e a rentabilidade. Minha criatividade foi essencial para identificar e implementar soluções, enquanto meu bom relacionamento interpessoal facilitou a colaboração entre equipes.',
        '#experiencia .timeline-item:nth-child(2) .timeline-description p:nth-child(2)': 'Na Atma Entretenimento, atuei na tradução, adaptação e preparação de materiais para dublagem, operando o software VoiceQ e garantindo qualidade e precisão. Meu inglês fluente e japonês básico foram fundamentais para projetos internacionais e traduções culturalmente adequadas.',

        // --- Kumon ---
        '#experiencia .timeline-item:nth-child(3) .timeline-description p:nth-child(1)': 'Atuei como professor orientador do método Kumon em língua inglesa, personalizando planos de estudo conforme as necessidades de cada aluno e acompanhando seu progresso. Desenvolvi habilidades em ensino, orientação e adaptação de materiais, aprimorando minha comunicação e paciência.',
        '#experiencia .timeline-item:nth-child(3) .timeline-description p:nth-child(2)': 'O ponto mais gratificante foi criar conexões significativas com os alunos, apoiando seu desenvolvimento acadêmico, pessoal e social.',

        '#educacao .section-header h2': 'Educação',
        '#educacao .section-header p': 'Minha jornada acadêmica',

        '#projetos .section-header h2': 'Meus Projetos',
        '#projetos .section-header p': 'Trabalhos recentes e destaques do meu portfólio',
        '#projetos .projects-grid .project-card:nth-of-type(1)  .project-info p': 'Jogo "Pong" feito utilizando JS (P5j) focado em explorar o desenvolvimento web com ChatGPT e a criação de imagens utilizando Leonardo.AI',
        '#projetos .projects-grid .project-card:nth-of-type(2)  .project-info p': 'Linktree personalizada para o artista Tokage Music, desenvolvida em Less, focada em explorar o uso criativo de páginas de links para divulgação e presença digital.',
        '#projetos .projects-grid .project-card:nth-of-type(3)  .project-info p': 'Landing page dedicada ao campeonato mundial de Pokémon TCG, focada em explorar o desenvolvimento web com Parcel.',
        '#projetos .projects-grid .project-card:nth-of-type(4)  .project-info p': 'Fanpage dedicada ao filme Whiplash, focada em explorar HTML, CSS e Javascript puro.',
        '#projetos .projects-grid .project-card:nth-of-type(5)  .project-info p': 'Clone da página Disney+, focada em explorar o desenvolvimento web com HTML, CSS e Javascript puro.',
        '#projetos .projects-grid .project-card:nth-of-type(6)  .project-info p': 'Projeto focado em explorar desenvolvimento web utilizando Bootstrap, HTML, CSS e Javascript.',
        '#projetos .projects-grid .project-card:nth-of-type(7)  .project-info p': 'Projeto focado em explorar o desenvolvimento web utilizando Bootstrap e suas classes.',
        '#projetos .projects-grid .project-card:nth-of-type(8)  .project-info p': 'Projeto focado em explorar a responsividade do CSS e suas vertentes.',
        '#projetos .projects-grid .project-card:nth-of-type(9)  .project-info p': 'Projeto focado em explorar o desenvolvimento web utilizando apenas HTML e CSS.',
        '#projetos .projects-grid .project-card:nth-of-type(10) .project-info p': 'Landing page dedicada a explorar o desenvolvimento web utilizando Parcel',
        '#projetos .projects-grid .project-card:nth-of-type(11) .project-info p': 'Landing page dedicada a explorar o desenvolvimento web utilizando apenas HTML e CSS',
        '#projetos .projects-grid .project-card:nth-of-type(12) .project-info p': 'Página dedicada a explorar o Grunt e as operações matemáticas do Javascript.',
        '#projetos .projects-grid .project-card:nth-of-type(13) .project-info p': 'Projeto focado em explorar o JQuery e suas funcionalidades.',
        '#projetos .projects-grid .project-card:nth-of-type(14) .project-info p': 'Página dedicada a explorar o Javascript e suas funcionalidades.',
        '#projetos .projects-grid .project-card:nth-of-type(15) .project-info p': 'Página dedicada a explorar o Javascript e suas funcionalidades.',
        '#projetos .projects-grid .project-card:nth-of-type(16) .project-info p': 'Página dedicada a explorar o Javascript e suas operações matemáticas.',
        '#projetos .projects-grid .project-card:nth-of-type(17) .project-info p': 'Projeto focado em explorar o desenvolvimento web utilizando HTML, CSS e Javascript.',
        '#projetos .projects-grid .project-card:nth-of-type(18) .project-info p': 'Projeto focado em explorar o desenvolvimento fullstack utilizando Python, React e Typescript.',
        '#projetos .projects-grid .project-card:nth-of-type(19) .project-info p': 'Downloader de vídeos do Youtube, feito utilizando Python, HTML, CSS e Javascript.',
        '#projetos .projects-grid .project-card:nth-of-type(20) .project-info p': 'Game page feita utilizando Python, Flask, HTML and Bootstrap.',
        '#projetos .projects-grid .project-card:nth-of-type(21) .project-info p': 'Delivery de comida feito com React, Redux, Styled Components e React Router DOM.',
        '#projetos .projects-grid .project-card:nth-of-type(22) .project-info p': 'Loja de jogos virtuais feita utilizando React, Redux, Styled Components e React Router DOM.',
        '#projetos .projects-grid .project-card:nth-of-type(23) .project-info p': 'Agenda de contatos feita utilizando React, Redux, Styled Components e React Router DOM.',

        '#contato .section-header h2': 'Entre em Contato',
        '#contato .section-header p': 'Vamos conversar sobre seu próximo projeto',

        '.hero-cta a.btn.btn-primary': 'Entre em contato',

        '#sobre .scroll-card h3': 'Quem sou eu?',
        '#sobre .scroll-card p': 'Sou Software Developer & Functional Consultant na Best.Projects, atuando no ecossistema Microsoft com Power Apps, Power Automate, Dynamics 365, Azure Functions, APIs REST, plugins em C#, JavaScript e CanvasApp, além de documentações técnicas e funcionais. Utilizo Copilot e modelos GPT para acelerar análises e desenvolvimento, explorando o potencial da IA em soluções corporativas com foco em integração ao Dataverse, escalabilidade, inovação e impacto real.',
      
        '#sobre .stats-container .stat-card:nth-child(1) .stat-label': 'Anos de experiência',
        '#sobre .stats-container .stat-card:nth-child(2) .stat-label': 'Projetos Concluídos',
        '#sobre .stats-container .stat-card:nth-child(3) .stat-label': 'Certificações',

        // PT (mantenha como padrão)
        '#contato .section-header h2': 'Entre em Contato',
        '#contato .section-header p': 'Vamos conversar sobre seu próximo projeto',
        '#contato .contact-info .info-item:nth-child(1) .info-details h4': 'Email',
        '#contato .contact-info .info-item:nth-child(2) .info-details h4': 'Telefone',
        '#contato .contact-info .info-item:nth-child(3) .info-details h4': 'Localização',
        '#contato label[for="name"]': 'Nome',
        '#contato label[for="email"]': 'Email',
        '#contato label[for="subject"]': 'Assunto',
        '#contato label[for="message"]': 'Mensagem',
        '#contactForm button[type="submit"]': 'Enviar Mensagem',

        // botões de CV
        '.cv-button .btn.btn-primary': 'Download CV (PT)',
        '.cv-button-english .btn.btn-primary': 'Download CV (EN)',

        // ===== Educação (timeline) =====
        // --- PT ---
        '#educacao .timeline-item:nth-child(1) .timeline-date': '2025 - Presente',
        '#educacao .timeline-item:nth-child(1) .timeline-content h3': 'Inteligência Artificial',
        '#educacao .timeline-item:nth-child(1) .timeline-content h4': 'FIAP',
        '#educacao .timeline-item:nth-child(1) .timeline-content p':
          'Curso superior de Tecnologia em Inteligência Artificial, Machine Learning, IA Generativa e Natural Language Processing.',

        '#educacao .timeline-item:nth-child(2) .timeline-date': '2024 - Presente',
        '#educacao .timeline-item:nth-child(2) .timeline-content h3': 'Análise e Desenvolvimento de Sistemas',
        '#educacao .timeline-item:nth-child(2) .timeline-content h4': 'Universidade Anhembi Morumbi',
        '#educacao .timeline-item:nth-child(2) .timeline-content p':
          'Curso superior de Análise e Desenvolvimento de Sistemas, com foco em programação, banco de dados e desenvolvimento web.',

        '#educacao .timeline-item:nth-child(3) .timeline-date': '2023 - 2025',
        '#educacao .timeline-item:nth-child(3) .timeline-content h3': 'Full Stack Python',
        '#educacao .timeline-item:nth-child(3) .timeline-content h4': 'EBAC',
        '#educacao .timeline-item:nth-child(3) .timeline-content p':
          'Curso profissionalizante em desenvolvimento Full Stack com Python, incluindo Django, Flask e desenvolvimento de APIs, além de desenvolvimento de aplicações web e integração com bancos de dados, front-end development e deploy de aplicações.',

        '#educacao .timeline-item:nth-child(4) .timeline-date': '2019 - 2022',
        '#educacao .timeline-item:nth-child(4) .timeline-content h3': 'Produção Fonográfica',
        '#educacao .timeline-item:nth-child(4) .timeline-content h4': 'FATEC Tatuí',
        '#educacao .timeline-item:nth-child(4) .timeline-content p':
          'Curso superior de Tecnologia em Produção Fonográfica, com foco em áudio, música e produção musical.',

    },
    en: {
        'a.nav-link[href="#home"]': 'Home',
        'a.nav-link[href="#sobre"]': 'About',
        'a.nav-link[href="#tecnologias"]': 'Tech',
        'a.nav-link[href="#certificacoes"]': 'Certifications',
        'a.nav-link[href="#experiencia"]': 'Experience',
        'a.nav-link[href="#educacao"]': 'Education',
        'a.nav-link[href="#projetos"]': 'Projects',
        'a.nav-link[href="#contato"]': 'Contact',

        '#home .hero-text h1': "Hi, I'm Matheus Meissner",
        '#home .hero-text h2': 'Dynamics Developer & Functional Consultant',
        '.flip-message': 'Scroll down and get to know me',

        '#sobre .section-header h2': 'About Me',
        '#sobre .section-header p': 'Learn a bit about my story and background',

        '#tecnologias .section-header h2': 'Technologies',
        '#tecnologias .section-header p': 'Tools and languages I use daily',

        '#certificacoes .section-header h2': 'Certifications',
        '#certificacoes .section-header p': 'Certificates and Licenses',

        '#experiencia .section-header h2': 'Experience',
        '#experiencia .section-header p': 'My professional journey',
        '#experiencia .timeline-card .timeline-date': '2024 ~ Present',
        // --- Best.Projects ---
        '#experiencia .timeline-item:nth-child(1) .timeline-description p:nth-child(1)': 'After my internship period, I was hired as a Developer & Functional Consultant, working strategically on delivering complete solutions within the Power Platform.',
        '#experiencia .timeline-item:nth-child(1) .timeline-description p:nth-child(2)': 'I develop advanced flows in Power Automate, Canvas Apps, Custom APIs, and Dynamics customizations, ensuring integration, performance, and adherence to business rules.',
        '#experiencia .timeline-item:nth-child(1) .timeline-description p:nth-child(3)': 'I produce technical documentation, participate in client meetings, manage security roles, and structure organizational units, using Azure Functions and implementing AI solutions in the Microsoft stack for automation and process optimization.',
        // --- Atma Entretenimento ---
        '#experiencia .timeline-item:nth-child(2) .timeline-description p:nth-child(1)': 'In the company\'s development team, I used Python to create tools that optimized pre-production processes, increasing efficiency, accuracy, and profitability. My creativity was essential for identifying and implementing solutions, while my strong interpersonal skills facilitated collaboration among teams.',
        '#experiencia .timeline-item:nth-child(2) .timeline-description p:nth-child(2)': 'At Atma Entretenimento, I worked on translation, adaptation, and preparation of dubbing materials, operating the VoiceQ software and ensuring quality and precision. My fluent English and basic Japanese were essential for international projects and culturally appropriate translations.',

        // --- Kumon ---
        '#experiencia .timeline-item:nth-child(3) .timeline-description p:nth-child(1)': 'I worked as an instructor for the Kumon method in English, customizing study plans according to each student\'s needs and monitoring their progress. I developed skills in teaching, guidance, and material adaptation, improving my communication and patience.',
        '#experiencia .timeline-item:nth-child(3) .timeline-description p:nth-child(2)': 'The most rewarding aspect was building meaningful connections with students, supporting their academic, personal, and social development.',

        '#educacao .section-header h2': 'Education',
        '#educacao .section-header p': 'My academic path',

        '#projetos .section-header h2': 'My Projects',
        '#projetos .section-header p': 'Recent work and portfolio highlights',
        '#projetos .projects-grid .project-card:nth-of-type(1)  .project-info p': '“Pong” game built with JS (P5.js), focused on exploring web development with ChatGPT and creating images using Leonardo.AI.',
        '#projetos .projects-grid .project-card:nth-of-type(2)  .project-info p': 'Custom Linktree for the artist Tokage Music, built with Less, exploring creative use of link pages for promotion and online presence.',
        '#projetos .projects-grid .project-card:nth-of-type(3)  .project-info p': 'Landing page dedicated to the Pokémon TCG World Championships, focused on exploring web development with Parcel.',
        '#projetos .projects-grid .project-card:nth-of-type(4)  .project-info p': 'Fan page dedicated to the film Whiplash, exploring pure HTML, CSS, and JavaScript.',
        '#projetos .projects-grid .project-card:nth-of-type(5)  .project-info p': 'Disney+ page clone, focused on exploring web development with plain HTML, CSS, and JavaScript.',
        '#projetos .projects-grid .project-card:nth-of-type(6)  .project-info p': 'Project exploring web development using Bootstrap, HTML, CSS, and JavaScript.',
        '#projetos .projects-grid .project-card:nth-of-type(7)  .project-info p': 'Project exploring web development using Bootstrap and its utility classes.',
        '#projetos .projects-grid .project-card:nth-of-type(8)  .project-info p': 'Project focused on exploring CSS responsiveness and its approaches.',
        '#projetos .projects-grid .project-card:nth-of-type(9)  .project-info p': 'Project exploring web development using only HTML and CSS.',
        '#projetos .projects-grid .project-card:nth-of-type(10) .project-info p': 'Landing page exploring web development with Parcel.',
        '#projetos .projects-grid .project-card:nth-of-type(11) .project-info p': 'Landing page exploring web development using only HTML and CSS.',
        '#projetos .projects-grid .project-card:nth-of-type(12) .project-info p': 'Page dedicated to exploring Grunt and JavaScript math operations.',
        '#projetos .projects-grid .project-card:nth-of-type(13) .project-info p': 'Project exploring jQuery and its features.',
        '#projetos .projects-grid .project-card:nth-of-type(14) .project-info p': 'Page dedicated to exploring JavaScript and its features.',
        '#projetos .projects-grid .project-card:nth-of-type(15) .project-info p': 'Page dedicated to exploring JavaScript and its features.',
        '#projetos .projects-grid .project-card:nth-of-type(16) .project-info p': 'Page dedicated to exploring JavaScript and its math operations.',
        '#projetos .projects-grid .project-card:nth-of-type(17) .project-info p': 'Project exploring web development using HTML, CSS, and JavaScript.',
        '#projetos .projects-grid .project-card:nth-of-type(18) .project-info p': 'Project exploring full-stack development using Python, React, and TypeScript.',
        '#projetos .projects-grid .project-card:nth-of-type(19) .project-info p': 'YouTube video downloader built with Python, HTML, CSS, and JavaScript.',
        '#projetos .projects-grid .project-card:nth-of-type(20) .project-info p': 'Game page built with Python, Flask, HTML and Bootstrap.',
        '#projetos .projects-grid .project-card:nth-of-type(21) .project-info p': 'Food-delivery app built with React, Redux, Styled Components and React Router DOM.',
        '#projetos .projects-grid .project-card:nth-of-type(22) .project-info p': 'Virtual game store built with React, Redux, Styled Components and React Router DOM.',
        '#projetos .projects-grid .project-card:nth-of-type(23) .project-info p': 'Contacts agenda built with React, Redux, Styled Components and React Router DOM.',

        '#contato .section-header h2': 'Get in Touch',
        '#contato .section-header p': "Let's talk about your next project",

        '.hero-cta a.btn.btn-primary': 'Get in touch',

        '#sobre .scroll-card h3': 'Who am I?',
        '#sobre .scroll-card p': 'I am a Software Developer & Functional Consultant at Best.Projects, working in the Microsoft ecosystem with Power Apps, Power Automate, Dynamics 365, Azure Functions, REST APIs, plugins in C#, JavaScript, and CanvasApp, as well as technical and functional documentation. I use Copilot and GPT models to speed up analysis and development, exploring the potential of AI in corporate solutions focused on Dataverse integration, scalability, innovation, and real impact.',

        '#sobre .stats-container .stat-card:nth-child(1) .stat-label': 'Years of Experience',
        '#sobre .stats-container .stat-card:nth-child(2) .stat-label': 'Projects Completed',
        '#sobre .stats-container .stat-card:nth-child(3) .stat-label': 'Certifications',

        // contact cards
        '#contato .section-header h2': 'Get in Touch',
        '#contato .section-header p': "Let's talk about your next project",
        '#contato .contact-info .info-item:nth-child(1) .info-details h4': 'Email',
        '#contato .contact-info .info-item:nth-child(2) .info-details h4': 'Phone',
        '#contato .contact-info .info-item:nth-child(3) .info-details h4': 'Location',
        '#contato label[for="name"]': 'Name',
        '#contato label[for="email"]': 'Email',
        '#contato label[for="subject"]': 'Subject',
        '#contato label[for="message"]': 'Message',
        '#contactForm button[type="submit"]': 'Send Message',

        // CV buttons
        '.cv-button .btn.btn-primary': 'Download CV (PT)',
        '.cv-button-english .btn.btn-primary': 'Download CV (EN)',

        // ===== Educação (timeline) =====
        // --- EN ---

        '#educacao .timeline-item:nth-child(1) .timeline-date': '2025 - Present',
        '#educacao .timeline-item:nth-child(1) .timeline-content h3': 'Artificial Intelligence',
        '#educacao .timeline-item:nth-child(1) .timeline-content h4': 'FIAP',
        '#educacao .timeline-item:nth-child(1) .timeline-content p':
          'Undergraduate program in AI Technology, Machine Learning, Generative AI, and Natural Language Processing.',

        '#educacao .timeline-item:nth-child(2) .timeline-date': '2024 - Present',
        '#educacao .timeline-item:nth-child(2) .timeline-content h3': 'Systems Analysis and Development',
        '#educacao .timeline-item:nth-child(2) .timeline-content h4': 'Anhembi Morumbi University',
        '#educacao .timeline-item:nth-child(2) .timeline-content p':
          'Undergraduate program focused on programming, databases, and web development.',

        '#educacao .timeline-item:nth-child(3) .timeline-date': '2023 - 2025',
        '#educacao .timeline-item:nth-child(3) .timeline-content h3': 'Full Stack Python',
        '#educacao .timeline-item:nth-child(3) .timeline-content h4': 'EBAC',
        '#educacao .timeline-item:nth-child(3) .timeline-content p':
          'Professional training in full-stack development with Python, including Django, Flask, REST APIs, web apps, database integration, front-end, and deployment.',

        '#educacao .timeline-item:nth-child(4) .timeline-date': '2019 - 2022',
        '#educacao .timeline-item:nth-child(4) .timeline-content h3': 'Phonographic Production',
        '#educacao .timeline-item:nth-child(4) .timeline-content h4': 'FATEC Tatuí',
        '#educacao .timeline-item:nth-child(4) .timeline-content p':
          'Undergraduate program in phonographic production focused on audio, music, and music production.',
    }
    };

    function applyLanguage(lang) {
    const dict = i18n[lang];
    Object.keys(dict).forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.textContent = dict[sel];
    });

    // html lang + toggle UI
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    if (langToggle) langToggle.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');

    // guarda preferência
    localStorage.setItem('lang', lang);
    }

    // estado inicial
    const savedLang = localStorage.getItem('lang') || 'pt';
    applyLanguage(savedLang);

    // clique no toggle
    if (langToggle) {
    langToggle.addEventListener('click', () => {
        const current = localStorage.getItem('lang') || 'pt';
        const next = current === 'pt' ? 'en' : 'pt';
        applyLanguage(next);
    });
    }



    
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
    // ===== Formulário de Contato =====
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
    
        const name = this.querySelector('#name')?.value?.trim() || '';
        const email = this.querySelector('#email')?.value?.trim() || '';
        const subject = this.querySelector('#subject')?.value?.trim() || '';
        const message = this.querySelector('#message')?.value?.trim() || '';
    
        // validação simples
        if (!email || !subject || !message) {
            // feedback rápido (sem depender de alert)
            const formGroups = this.querySelectorAll('.form-group');
            const lastFormGroup = formGroups[formGroups.length - 1];
            const warn = document.createElement('div');
            warn.textContent = 'Preencha Email, Assunto e Mensagem.';
            warn.style.color = '#c53030';
            warn.style.fontWeight = '500';
            warn.style.marginTop = 'var(--spacing-sm)';
            lastFormGroup.insertAdjacentElement('afterend', warn);
            setTimeout(() => { warn.style.opacity = '0'; setTimeout(() => warn.remove(), 300); }, 2500);
            return;
        }
    
        // desabilita botão enquanto preparamos o mailto
        submitBtn.disabled = true;
        submitBtn.textContent = 'Abrindo seu e-mail';
    
        // monta o link mailto (remetente vai no corpo; não dá pra setar "From" via mailto)
        const body = `De: ${email}\n\n${message}${name ? `\n\n— ${name}` : ''}`;
        const mailtoLink = `mailto:matheus.iembo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        // abre o cliente de e-mail do usuário
        window.location.href = mailtoLink;
    
        // restaura UI e limpa o formulário (mantém sua experiência visual)
        setTimeout(() => {
            const formGroups = this.querySelectorAll('.form-group');
            const lastFormGroup = formGroups[formGroups.length - 1];
    
            const info = document.createElement('div');
            info.className = 'success-message';
            // info.textContent = 'Cliente de e-mail aberto. Finalize o envio por lá.';
            info.style.color = 'var(--accent-color)';
            info.style.fontWeight = '500';
            info.style.marginTop = 'var(--spacing-sm)';
    
            lastFormGroup.insertAdjacentElement('afterend', info);
    
            // reset do form e botão
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
    
            setTimeout(() => {
            info.style.opacity = '0';
            setTimeout(() => { info.remove(); }, 300);
            }, 3000);
        }, 600);
        });
    }
});
