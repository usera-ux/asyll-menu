
        document.addEventListener('DOMContentLoaded', function() {
            
            initAnimations();
            initFilterSystem();
            initOrderSystem();
            initScrollAnimations();
            initBackToTop();
            initWhatsAppModal();
        });

        
        function initAnimations() {
            
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

            document.querySelectorAll('.menu-item, .section-title').forEach(el => {
                observer.observe(el);
            });
        }

     
        function initFilterSystem() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const menuItems = document.querySelectorAll('.menu-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                   
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
                  
                    this.classList.add('animate-bounce');
                    setTimeout(() => {
                        this.classList.remove('animate-bounce');
                    }, 1000);

                   
                    currentOrderItem = {
                        name: itemName,
                        price: itemPrice
                    };

                    
                    modalText.textContent = `Вы хотите заказать "${itemName}" за ${itemPrice}тг? Вы будете перенаправлены в WhatsApp для оформления заказа.`;
                    whatsappModal.classList.add('active');
                });
            });

          
            cancelOrder.addEventListener('click', function() {
                whatsappModal.classList.remove('active');
                currentOrderItem = null;
            });

            confirmOrder.addEventListener('click', function() {
                if (currentOrderItem) {
                    const message = `Сәлеметсізбе! Мен заказ бергім келеді:%0A%0A${currentOrderItem.name} - ${currentOrderItem.price}тг%0A%0AБұл тағамды тапсырыс бергім келеді. Болған бағасы ${currentOrderItem.price}тг. Рахмет!`;
                    const whatsappUrl = `https://wa.me/+77713493398?text=${message}`;
                    
                    
                    window.open(whatsappUrl, '_blank');
                    
                    
                    whatsappModal.classList.remove('active');
                    currentOrderItem = null;
                }
            });

            
            whatsappModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    currentOrderItem = null;
                }
            });
        }

        
        function initScrollAnimations() {
            let lastScrollTop = 0;
            const header = document.querySelector('header');

            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
               
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                lastScrollTop = scrollTop;
            });
        }

        
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

        
        function initWhatsAppModal() {
         
        }

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
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const whatsappModal = document.getElementById('whatsappModal');
                whatsappModal.classList.remove('active');
            }
        });
