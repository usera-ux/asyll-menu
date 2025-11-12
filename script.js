
        // Основные функции и анимации
        document.addEventListener('DOMContentLoaded', function() {
            // Инициализация всех функций
            initAnimations();
            initFilterSystem();
            initOrderSystem();
            initScrollAnimations();
            initBackToTop();
            initWhatsAppModal();
        });

        // Анимации при загрузке
        function initAnimations() {
            // Анимация для элементов при скролле
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Наблюдаем за всеми элементами с анимациями
            document.querySelectorAll('.menu-item, .section-title').forEach(el => {
                observer.observe(el);
            });
        }

        // Система фильтрации
        function initFilterSystem() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const menuItems = document.querySelectorAll('.menu-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Удаляем активный класс у всех кнопок
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Добавляем активный класс текущей кнопке
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Анимация скрытия элементов
                    menuItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }

        // Система заказов с WhatsApp
        function initOrderSystem() {
            const orderButtons = document.querySelectorAll('.order-btn');
            const whatsappModal = document.getElementById('whatsappModal');
            const modalText = document.getElementById('modalText');
            const cancelOrder = document.getElementById('cancelOrder');
            const confirmOrder = document.getElementById('confirmOrder');

            let currentOrderItem = null;

            orderButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const itemName = this.getAttribute('data-item');
                    const itemPrice = this.getAttribute('data-price');
                    
                    // Анимация кнопки
                    this.classList.add('animate-bounce');
                    setTimeout(() => {
                        this.classList.remove('animate-bounce');
                    }, 1000);

                    // Сохраняем информацию о заказе
                    currentOrderItem = {
                        name: itemName,
                        price: itemPrice
                    };

                    // Показываем модальное окно
                    modalText.textContent = `Вы хотите заказать "${itemName}" за ${itemPrice}тг? Вы будете перенаправлены в WhatsApp для оформления заказа.`;
                    whatsappModal.classList.add('active');
                });
            });

            // Обработчики для модального окна
            cancelOrder.addEventListener('click', function() {
                whatsappModal.classList.remove('active');
                currentOrderItem = null;
            });

            confirmOrder.addEventListener('click', function() {
                if (currentOrderItem) {
                    const message = `Сәлеметсізбе! Мен заказ бергім келеді:%0A%0A${currentOrderItem.name} - ${currentOrderItem.price}тг%0A%0AБұл тағамды тапсырыс бергім келеді. Болған бағасы ${currentOrderItem.price}тг. Рахмет!`;
                    const whatsappUrl = `https://wa.me/+77713493398?text=${message}`;
                    
                    // Открываем WhatsApp
                    window.open(whatsappUrl, '_blank');
                    
                    // Закрываем модальное окно
                    whatsappModal.classList.remove('active');
                    currentOrderItem = null;
                }
            });

            // Закрытие модального окна при клике на фон
            whatsappModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    currentOrderItem = null;
                }
            });
        }

        // Анимации при скролле
        function initScrollAnimations() {
            let lastScrollTop = 0;
            const header = document.querySelector('header');

            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Прячем/показываем хедер при скролле
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                lastScrollTop = scrollTop;
            });
        }

        // Кнопка "Наверх"
        function initBackToTop() {
            const backToTop = document.getElementById('backToTop');
            
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });

            backToTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Инициализация модального окна WhatsApp
        function initWhatsAppModal() {
            // Функция уже реализована в initOrderSystem
        }

        // Mobile menu functionality
        const burgerMenu = document.getElementById('burgerMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        menuOverlay.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Smooth scrolling
        document.querySelectorAll('nav a, .mobile-menu a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });

        // Закрытие модального окна при нажатии Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const whatsappModal = document.getElementById('whatsappModal');
                whatsappModal.classList.remove('active');
            }
        });
