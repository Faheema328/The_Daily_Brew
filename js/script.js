/**
 * ==========================================================================
 * THE DAILY BREW — PREMIUM SPECIALTY COFFEEHOUSE
 * Core JavaScript (Vanilla JS - No Frameworks)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // DOM Element References
    // ----------------------------------------------------------------------
    const siteHeader = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');
    const navBackdrop = document.getElementById('navBackdrop');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.skip-link)');

    // ----------------------------------------------------------------------
    // 1. Mobile Navigation
    // ----------------------------------------------------------------------
    const closeMobileMenu = (restoreFocus = false) => {
        if (!navToggle || !primaryNav) return;
        const wasOpen = navToggle.classList.contains('is-active');

        navToggle.classList.remove('is-active');
        primaryNav.classList.remove('is-open');
        if (navBackdrop) navBackdrop.classList.remove('is-visible');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        if (restoreFocus && wasOpen) {
            navToggle.focus();
        }
    };

    const openMobileMenu = () => {
        if (!navToggle || !primaryNav) return;
        navToggle.classList.add('is-active');
        primaryNav.classList.add('is-open');
        if (navBackdrop) navBackdrop.classList.add('is-visible');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    // ----------------------------------------------------------------------
    // 2. Smooth Navigation & Section Positioning
    // ----------------------------------------------------------------------
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#' || targetId.length <= 1) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                closeMobileMenu();

                const headerOffset = siteHeader ? siteHeader.offsetHeight : 70;
                const elementTop = targetElement.getBoundingClientRect().top;
                const targetPosition = elementTop + window.pageYOffset - headerOffset;

                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                if (window.history && window.history.pushState) {
                    window.history.pushState(null, null, targetId);
                }

                // Immediately synchronize active class on matching nav link
                navLinks.forEach(l => l.classList.remove('active'));
                const matchingNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
                if (matchingNavLink) {
                    matchingNavLink.classList.add('active');
                }
            }
        });
    });

    // ----------------------------------------------------------------------
    // 3. Header Scroll Effect & Active Link Scroll Spy (Performance-Optimized)
    // ----------------------------------------------------------------------
    const handleHeaderScroll = () => {
        if (!siteHeader) return;
        if (window.scrollY > 20) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };

    const highlightActiveNav = () => {
        if (!navLinks.length || !sections.length) return;

        const headerHeight = siteHeader ? siteHeader.offsetHeight : 70;
        const scrollPosition = window.scrollY + headerHeight + 60;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Bottom of page: activate last nav link (Contact)
        if (window.scrollY + windowHeight >= documentHeight - 40) {
            navLinks.forEach(link => link.classList.remove('active'));
            const lastNavLink = navLinks[navLinks.length - 1];
            if (lastNavLink) lastNavLink.classList.add('active');
            return;
        }

        // Top of page: activate first nav link (Home)
        if (window.scrollY < 80) {
            navLinks.forEach(link => link.classList.remove('active'));
            const firstNavLink = document.querySelector('.nav-link[href="#home"]');
            if (firstNavLink) firstNavLink.classList.add('active');
            return;
        }

        // Check each section in viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const matchingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (matchingNavLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                matchingNavLink.classList.add('active');
            }
        });
    };

    // Single rAF-throttled scroll handler prevents layout thrashing & jitter
    let scrollTicking = false;
    const onScroll = () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                handleHeaderScroll();
                highlightActiveNav();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // ----------------------------------------------------------------------
    // 4. Product Customization Engine (Phase 2)
    // ----------------------------------------------------------------------
    const PRODUCTS = {
        'cappuccino': {
            id: 'cappuccino',
            name: 'Cappuccino',
            basePrice: 150,
            image: 'assets/images/02_alternate_cappuccino.jpg',
            alt: 'Cappuccino',
            groups: [
                {
                    id: 'milk',
                    title: 'Milk Selection',
                    desc: 'Choose your preferred dairy or plant-based blend',
                    options: [
                        { id: 'whole', name: 'Whole Milk (Standard)', desc: 'Rich, creamy and balanced froth', price: 0, default: true },
                        { id: 'oat', name: 'Oat Milk (Barista Blend)', desc: 'Silky, naturally sweet and plant-based', price: 30, default: false },
                        { id: 'almond', name: 'Almond Milk (Unsweetened)', desc: 'Light, nutty and low calorie', price: 40, default: false }
                    ]
                },
                {
                    id: 'strength',
                    title: 'Espresso Strength',
                    desc: 'Calibrate your espresso intensity and shot volume',
                    options: [
                        { id: 'single', name: 'Single Origin Shot', desc: 'Standard single shot extraction', price: 0, default: true },
                        { id: 'double', name: 'Double Shot Intensity', desc: 'Robust double shot with bold crema', price: 35, default: false },
                        { id: 'large-extra', name: 'Large Cup with Extra Shot', desc: 'Generous volume with extended pull', price: 40, default: false }
                    ]
                },
                {
                    id: 'packaging',
                    title: 'Packaging & Presentation',
                    desc: 'Select standard café takeaway or artisan gift packaging',
                    options: [
                        { id: 'cup-standard', name: 'Atelier Craft Cup', desc: 'Biodegradable double-wall craft cup', price: 0, default: true },
                        { id: 'gift-box', name: 'Artisan Gift Box & Ribbon', desc: 'Handcrafted box with satin ribbon', price: 50, default: false },
                        { id: 'tumbler', name: 'Insulated Stainless Tumbler', desc: 'Reusable thermal tumbler keepsake', price: 120, default: false }
                    ]
                }
            ]
        },
        'cold-coffee': {
            id: 'cold-coffee',
            name: 'Cold Coffee',
            basePrice: 180,
            image: 'assets/images/03_alternate_iced_coffee.jpg',
            alt: 'Cold Coffee',
            groups: [
                {
                    id: 'sweetness',
                    title: 'Sweetness Level',
                    desc: 'Tailor the sweetness to your personal taste',
                    options: [
                        { id: 'sweet-std', name: 'Standard Sweetness', desc: 'Signature balanced raw cane sugar', price: 0, default: true },
                        { id: 'sweet-less', name: 'Subtle / Less Sweet', desc: 'Half sweetness for roasted notes', price: 0, default: false },
                        { id: 'sweet-zero', name: 'Zero Added Sugar', desc: 'Pure chilled espresso & milk', price: 0, default: false }
                    ]
                },
                {
                    id: 'flavor',
                    title: 'Flavor Infusion',
                    desc: 'Enhance your brew with natural infused extracts',
                    options: [
                        { id: 'flavor-classic', name: 'Classic Brewed Roast', desc: 'Original cold-steeped coffee notes', price: 0, default: true },
                        { id: 'flavor-vanilla', name: 'Madagascar Vanilla', desc: 'Natural vanilla bean infusion', price: 25, default: false },
                        { id: 'flavor-hazelnut', name: 'Roasted Hazelnut', desc: 'Warm aromatic hazelnut extract', price: 30, default: false }
                    ]
                },
                {
                    id: 'packaging',
                    title: 'Packaging & Presentation',
                    desc: 'Select standard café takeaway or artisan gift packaging',
                    options: [
                        { id: 'cup-chilled', name: 'Chilled Craft Cup', desc: 'Insulated cold cup with paper straw', price: 0, default: true },
                        { id: 'gift-box', name: 'Artisan Gift Box & Ribbon', desc: 'Handcrafted box with satin ribbon', price: 50, default: false },
                        { id: 'tumbler', name: 'Insulated Stainless Tumbler', desc: 'Reusable thermal tumbler keepsake', price: 120, default: false }
                    ]
                }
            ]
        },
        'classic-sandwich': {
            id: 'classic-sandwich',
            name: 'Classic Sandwich',
            basePrice: 120,
            image: 'assets/images/04_alternate_sandwich.jpg',
            alt: 'Classic Sandwich',
            groups: [
                {
                    id: 'bread',
                    title: 'Artisan Bread',
                    desc: 'Baked fresh daily by local artisan bakers',
                    options: [
                        { id: 'bread-sourdough', name: 'Country White Sourdough', desc: 'Slow-fermented crisp artisan sourdough', price: 0, default: true },
                        { id: 'bread-multigrain', name: 'Ancient Multigrain', desc: 'Wholesome seed-crusted loaf', price: 20, default: false }
                    ]
                },
                {
                    id: 'preparation',
                    title: 'Preparation Style',
                    desc: 'Customize the grilling and cheese layer',
                    options: [
                        { id: 'prep-toasted', name: 'Golden Toasted & Crisp', desc: 'Panini pressed to golden perfection', price: 0, default: true },
                        { id: 'prep-cheese', name: 'Double Melted Cheese', desc: 'Layered with aged cheddar & mozzarella', price: 25, default: false }
                    ]
                },
                {
                    id: 'packaging',
                    title: 'Packaging & Presentation',
                    desc: 'Select standard café takeaway or artisan gift packaging',
                    options: [
                        { id: 'wrap-standard', name: 'Eco Kraft Bakery Wrap', desc: 'Foil-lined thermal kraft wrapper', price: 0, default: true },
                        { id: 'gift-box', name: 'Artisan Gift Box & Ribbon', desc: 'Handcrafted gift box with ribbon', price: 50, default: false }
                    ]
                }
            ]
        },
        'chocolate-brownie': {
            id: 'chocolate-brownie',
            name: 'Chocolate Brownie',
            basePrice: 100,
            image: 'assets/images/05_alternate_brownie.jpg',
            alt: 'Chocolate Brownie',
            groups: [
                {
                    id: 'serving',
                    title: 'Serving Temperature',
                    desc: 'How would you like your brownie served?',
                    options: [
                        { id: 'serve-warm', name: 'Warm & Gooey', desc: 'Gently warmed to soften rich fudge', price: 0, default: true },
                        { id: 'serve-room', name: 'Room Temperature Classic', desc: 'Firm, dense and chewy texture', price: 0, default: false }
                    ]
                },
                {
                    id: 'toppings',
                    title: 'Indulgent Toppings',
                    desc: 'Add a decadent finishing touch',
                    options: [
                        { id: 'top-dust', name: 'Pure Dark Chocolate Dust', desc: 'Dusted with Belgian cocoa powder', price: 0, default: true },
                        { id: 'top-drizzle', name: 'Warm Dark Chocolate Drizzle', desc: 'Decadent 70% molten ganache drizzle', price: 20, default: false },
                        { id: 'top-gelato', name: 'Artisan Vanilla Bean Gelato', desc: 'Single scoop of creamy Bourbon vanilla', price: 40, default: false }
                    ]
                },
                {
                    id: 'packaging',
                    title: 'Packaging & Presentation',
                    desc: 'Select standard café takeaway or artisan gift packaging',
                    options: [
                        { id: 'box-bakery', name: 'Bakery Kraft Box', desc: 'Eco-friendly vented pastry box', price: 0, default: true },
                        { id: 'gift-box', name: 'Artisan Gift Box & Ribbon', desc: 'Handcrafted gift box with ribbon', price: 50, default: false }
                    ]
                }
            ]
        }
    };

    // Modal DOM Elements
    const customizerBackdrop = document.getElementById('customizerBackdrop');
    const customizerModal = document.getElementById('customizerModal');
    const customizerCloseBtn = document.getElementById('customizerCloseBtn');
    const customizerCancelBtn = document.getElementById('customizerCancelBtn');
    const customizerContinueBtn = document.getElementById('customizerContinueBtn');
    const customizerBuyNowBtn = document.getElementById('customizerBuyNowBtn');
    const customizerForm = document.getElementById('customizerForm');
    const customizerOptions = document.getElementById('customizerOptions');
    const customizerTitle = document.getElementById('customizerTitle');
    const customizerImage = document.getElementById('customizerImage');
    const customizerBasePrice = document.getElementById('customizerBasePrice');
    const customizerLivePrice = document.getElementById('customizerLivePrice');
    const customizerDiffBadge = document.getElementById('customizerDiffBadge');
    const customizerToast = document.getElementById('customizerToast');
    const customizerToastMsg = document.getElementById('customizerToastMsg');
    const customizeButtons = document.querySelectorAll('.menu-customize-btn');

    let currentCustomizerProduct = null;
    let lastActiveCustomizeBtn = null;
    let toastTimeoutId = null;

    const renderCustomizerOptions = (product) => {
        if (!customizerOptions) return;
        customizerOptions.innerHTML = '';

        product.groups.forEach(group => {
            const fieldset = document.createElement('fieldset');
            fieldset.className = 'customizer-fieldset';

            const legend = document.createElement('legend');
            legend.className = 'customizer-legend';
            legend.textContent = group.title;
            fieldset.appendChild(legend);

            if (group.desc) {
                const descP = document.createElement('p');
                descP.className = 'customizer-fieldset-desc';
                descP.textContent = group.desc;
                fieldset.appendChild(descP);
            }

            const grid = document.createElement('div');
            grid.className = 'customizer-options-grid';

            group.options.forEach(option => {
                const inputId = `opt_${product.id}_${group.id}_${option.id}`;
                const label = document.createElement('label');
                label.className = `customizer-option-card ${option.default ? 'is-selected' : ''}`;
                label.setAttribute('for', inputId);

                const leftDiv = document.createElement('div');
                leftDiv.className = 'customizer-option-left';

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.className = 'customizer-radio-input';
                radio.id = inputId;
                radio.name = group.id;
                radio.value = option.id;
                radio.dataset.price = option.price;
                radio.dataset.name = option.name;
                if (option.default) {
                    radio.checked = true;
                }

                const textDiv = document.createElement('div');
                textDiv.className = 'customizer-option-text';

                const nameSpan = document.createElement('span');
                nameSpan.className = 'customizer-option-name';
                nameSpan.textContent = option.name;
                textDiv.appendChild(nameSpan);

                if (option.desc) {
                    const optDesc = document.createElement('span');
                    optDesc.className = 'customizer-option-desc';
                    optDesc.textContent = option.desc;
                    textDiv.appendChild(optDesc);
                }

                leftDiv.appendChild(radio);
                leftDiv.appendChild(textDiv);

                const priceSpan = document.createElement('span');
                priceSpan.className = `customizer-option-price ${option.price === 0 ? 'is-included' : ''}`;
                priceSpan.textContent = option.price === 0 ? 'Included' : `+₹${option.price}`;

                label.appendChild(leftDiv);
                label.appendChild(priceSpan);
                grid.appendChild(label);
            });

            fieldset.appendChild(grid);
            customizerOptions.appendChild(fieldset);
        });
    };

    const calculateCustomizerPrice = () => {
        if (!currentCustomizerProduct) return 0;
        let addOnsTotal = 0;
        const checkedRadios = customizerForm ? customizerForm.querySelectorAll('input[type="radio"]:checked') : [];

        // Update selected visual states on cards
        if (customizerForm) {
            const allCards = customizerForm.querySelectorAll('.customizer-option-card');
            allCards.forEach(card => card.classList.remove('is-selected'));
            checkedRadios.forEach(radio => {
                const parentCard = radio.closest('.customizer-option-card');
                if (parentCard) parentCard.classList.add('is-selected');
                addOnsTotal += Number(radio.dataset.price || 0);
            });
        }

        const totalPrice = currentCustomizerProduct.basePrice + addOnsTotal;

        if (customizerLivePrice) {
            customizerLivePrice.textContent = `₹${totalPrice}`;
        }

        if (customizerDiffBadge) {
            if (addOnsTotal > 0) {
                customizerDiffBadge.textContent = `+₹${addOnsTotal}`;
                customizerDiffBadge.style.opacity = '1';
                customizerDiffBadge.style.display = 'inline-block';
            } else {
                customizerDiffBadge.textContent = 'Base Price';
                customizerDiffBadge.style.opacity = '0.75';
                customizerDiffBadge.style.display = 'inline-block';
            }
        }

        return totalPrice;
    };

    const isCustomizerOpen = () => {
        return customizerModal && customizerModal.classList.contains('is-open');
    };

    const closeCustomizer = (restoreFocus = true) => {
        if (!isCustomizerOpen()) return;

        customizerModal.classList.remove('is-open');
        if (customizerBackdrop) customizerBackdrop.classList.remove('is-visible');
        customizerModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (customizerToast) {
            customizerToast.classList.remove('is-visible');
            customizerToast.setAttribute('aria-hidden', 'true');
        }
        if (toastTimeoutId) {
            clearTimeout(toastTimeoutId);
            toastTimeoutId = null;
        }

        if (restoreFocus && lastActiveCustomizeBtn) {
            lastActiveCustomizeBtn.focus();
        }
    };

    const openCustomizer = (productId, triggerBtn) => {
        const product = PRODUCTS[productId];
        if (!product || !customizerModal) return;

        currentCustomizerProduct = product;
        lastActiveCustomizeBtn = triggerBtn || null;

        if (customizerTitle) customizerTitle.textContent = `Customize ${product.name}`;
        if (customizerImage) {
            customizerImage.src = product.image;
            customizerImage.alt = product.alt;
        }
        if (customizerBasePrice) customizerBasePrice.textContent = `₹${product.basePrice}`;

        renderCustomizerOptions(product);
        calculateCustomizerPrice();

        if (customizerBackdrop) customizerBackdrop.classList.add('is-visible');
        customizerModal.classList.add('is-open');
        customizerModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Set initial focus to close button for keyboard accessibility
        setTimeout(() => {
            if (customizerCloseBtn) {
                customizerCloseBtn.focus();
            }
        }, 50);
    };

    // Event Listeners for Customize buttons
    customizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-product');
            openCustomizer(productId, btn);
        });
    });

    if (customizerCloseBtn) {
        customizerCloseBtn.addEventListener('click', () => closeCustomizer(true));
    }

    if (customizerCancelBtn) {
        customizerCancelBtn.addEventListener('click', () => closeCustomizer(true));
    }

    if (customizerBackdrop) {
        customizerBackdrop.addEventListener('click', () => closeCustomizer(true));
    }

    if (customizerForm) {
        customizerForm.addEventListener('change', () => {
            calculateCustomizerPrice();
        });
    }

    // Modal Focus Trap
    if (customizerModal) {
        customizerModal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            const focusableElements = customizerModal.querySelectorAll(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusableElements.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        });
    }

    // ----------------------------------------------------------------------
    // 5. Shopping Cart & Slide-out Drawer Engine (Phase 3)
    // ----------------------------------------------------------------------
    const cartTriggerBtn = document.getElementById('cartTriggerBtn');
    const cartCountBadge = document.getElementById('cartCountBadge');
    const cartBackdrop = document.getElementById('cartBackdrop');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartHeaderCount = document.getElementById('cartHeaderCount');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartEmptyState = document.getElementById('cartEmptyState');
    const cartExploreBtn = document.getElementById('cartExploreBtn');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartDrawerFooter = document.getElementById('cartDrawerFooter');
    const cartSubtotalAmount = document.getElementById('cartSubtotalAmount');
    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
    const cartContinueShoppingBtn = document.getElementById('cartContinueShoppingBtn');

    // Shopping Cart State
    let cart = [];
    let lastActiveCartTrigger = null;

    /**
     * Extracts configured product specifications and generates a unique composite key
     * to prevent accidental merging of products with different customizations.
     */
    const getSelectedCustomizerItem = () => {
        if (!currentCustomizerProduct || !customizerForm) return null;

        const checkedRadios = Array.from(customizerForm.querySelectorAll('input[type="radio"]:checked'));
        const customizations = [];
        let packagingOption = null;
        let addOnsTotal = 0;
        const optionKeys = [];

        checkedRadios.forEach(radio => {
            const price = Number(radio.dataset.price || 0);
            addOnsTotal += price;
            const groupName = radio.name;
            const optionId = radio.value;
            const optionName = radio.dataset.name || optionId;

            optionKeys.push(`${groupName}:${optionId}`);

            if (groupName === 'packaging') {
                packagingOption = {
                    groupId: groupName,
                    optionId: optionId,
                    optionName: optionName,
                    price: price
                };
            } else {
                customizations.push({
                    groupId: groupName,
                    optionId: optionId,
                    optionName: optionName,
                    price: price
                });
            }
        });

        optionKeys.sort();
        const itemKey = `${currentCustomizerProduct.id}__${optionKeys.join('__')}`;
        const unitPrice = currentCustomizerProduct.basePrice + addOnsTotal;

        return {
            key: itemKey,
            productId: currentCustomizerProduct.id,
            name: currentCustomizerProduct.name,
            image: currentCustomizerProduct.image,
            alt: currentCustomizerProduct.alt,
            basePrice: currentCustomizerProduct.basePrice,
            unitPrice: unitPrice,
            customizations: customizations,
            packaging: packagingOption || { optionName: 'Atelier Packaging', price: 0 }
        };
    };

    const getCartTotals = () => {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
        return { totalCount, subtotal };
    };

    const updateCartBadge = (animate = false) => {
        const { totalCount } = getCartTotals();
        if (cartCountBadge) {
            cartCountBadge.textContent = totalCount;
            if (animate) {
                cartCountBadge.classList.remove('cart-badge-bounce');
                void cartCountBadge.offsetWidth; // Force DOM reflow to retrigger CSS animation
                cartCountBadge.classList.add('cart-badge-bounce');
            }
        }
        if (cartTriggerBtn) {
            cartTriggerBtn.setAttribute('aria-label', `Shopping bag with ${totalCount} ${totalCount === 1 ? 'item' : 'items'}`);
        }
        if (cartHeaderCount) {
            cartHeaderCount.textContent = `(${totalCount})`;
        }
    };

    const renderCart = () => {
        const { totalCount, subtotal } = getCartTotals();

        if (cartSubtotalAmount) {
            cartSubtotalAmount.textContent = `₹${subtotal}`;
        }

        if (totalCount === 0) {
            if (cartEmptyState) cartEmptyState.style.display = 'flex';
            if (cartItemsList) {
                cartItemsList.style.display = 'none';
                cartItemsList.innerHTML = '';
            }
            if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
        } else {
            if (cartEmptyState) cartEmptyState.style.display = 'none';
            if (cartItemsList) {
                cartItemsList.style.display = 'flex';
                cartItemsList.innerHTML = '';

                cart.forEach(item => {
                    const card = document.createElement('article');
                    card.className = 'cart-item-card';
                    card.setAttribute('data-item-key', item.key);
                    card.setAttribute('role', 'listitem');

                    const customizationsHtml = item.customizations
                        .map(c => `<span class="cart-customization-pill">${c.optionName}</span>`)
                        .join('');

                    const packagingHtml = `<span class="cart-packaging-pill">${item.packaging.optionName}${item.packaging.price > 0 ? ` (+₹${item.packaging.price})` : ''}</span>`;

                    card.innerHTML = `
                        <div class="cart-item-main">
                            <div class="cart-item-thumb">
                                <img src="${item.image}" alt="${item.name}" width="66" height="66" loading="lazy">
                            </div>
                            <div class="cart-item-info">
                                <h4 class="cart-item-title">${item.name}</h4>
                                <div class="cart-item-customizations">
                                    ${customizationsHtml}
                                    ${packagingHtml}
                                </div>
                                <div class="cart-item-unit-price">₹${item.unitPrice} each</div>
                            </div>
                        </div>
                        <div class="cart-item-footer">
                            <div class="cart-qty-control" role="group" aria-label="Quantity for ${item.name}">
                                <button type="button" class="cart-qty-btn cart-qty-minus" data-item-key="${item.key}" aria-label="Decrease quantity of ${item.name}">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </button>
                                <span class="cart-qty-value" aria-label="Current quantity">${item.quantity}</span>
                                <button type="button" class="cart-qty-btn cart-qty-plus" data-item-key="${item.key}" aria-label="Increase quantity of ${item.name}">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </button>
                            </div>
                            <div class="cart-item-pricing-wrap">
                                <span class="cart-item-subtotal">₹${item.unitPrice * item.quantity}</span>
                                <button type="button" class="cart-item-remove-btn" data-item-key="${item.key}" aria-label="Remove ${item.name} from cart">Remove</button>
                            </div>
                        </div>
                    `;

                    cartItemsList.appendChild(card);
                });
            }
            if (cartDrawerFooter) cartDrawerFooter.style.display = 'block';
        }
    };

    const addToCart = (itemData) => {
        if (!itemData) return;
        const existing = cart.find(i => i.key === itemData.key);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...itemData, quantity: 1 });
        }
        updateCartBadge(true);
        renderCart();
    };

    const updateCartItemQty = (itemKey, delta) => {
        const item = cart.find(i => i.key === itemKey);
        if (!item) return;

        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.key !== itemKey);
        }
        updateCartBadge(false);
        renderCart();
    };

    const removeCartItem = (itemKey) => {
        cart = cart.filter(i => i.key !== itemKey);
        updateCartBadge(false);
        renderCart();
    };

    const isCartOpen = () => {
        return cartDrawer && cartDrawer.classList.contains('is-open');
    };

    const openCartDrawer = (triggerBtn = null) => {
        if (!cartDrawer) return;
        lastActiveCartTrigger = triggerBtn || cartTriggerBtn || null;

        renderCart();

        if (cartBackdrop) cartBackdrop.classList.add('is-visible');
        cartDrawer.classList.add('is-open');
        cartDrawer.setAttribute('aria-hidden', 'false');
        if (cartTriggerBtn) cartTriggerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            if (cartCloseBtn) cartCloseBtn.focus();
        }, 50);
    };

    const closeCartDrawer = (restoreFocus = true) => {
        if (!isCartOpen()) return;

        cartDrawer.classList.remove('is-open');
        if (cartBackdrop) cartBackdrop.classList.remove('is-visible');
        cartDrawer.setAttribute('aria-hidden', 'true');
        if (cartTriggerBtn) cartTriggerBtn.setAttribute('aria-expanded', 'false');

        // Only restore body scrolling if customizer modal is not open
        if (!isCustomizerOpen()) {
            document.body.style.overflow = '';
        }

        if (restoreFocus && lastActiveCartTrigger) {
            lastActiveCartTrigger.focus();
        }
    };

    // Event Delegation for Cart Quantity & Remove Controls
    if (cartItemsList) {
        cartItemsList.addEventListener('click', (e) => {
            const minusBtn = e.target.closest('.cart-qty-minus');
            if (minusBtn) {
                const key = minusBtn.getAttribute('data-item-key');
                updateCartItemQty(key, -1);
                return;
            }

            const plusBtn = e.target.closest('.cart-qty-plus');
            if (plusBtn) {
                const key = plusBtn.getAttribute('data-item-key');
                updateCartItemQty(key, 1);
                return;
            }

            const removeBtn = e.target.closest('.cart-item-remove-btn');
            if (removeBtn) {
                const key = removeBtn.getAttribute('data-item-key');
                removeCartItem(key);
                return;
            }
        });
    }

    // Modal Actions: Add to Cart (Continue) & Buy Now
    if (customizerContinueBtn) {
        customizerContinueBtn.addEventListener('click', () => {
            const itemData = getSelectedCustomizerItem();
            if (!itemData) return;

            addToCart(itemData);

            if (customizerToast && customizerToastMsg) {
                customizerToastMsg.textContent = `${itemData.name} (₹${itemData.unitPrice}) added to your bag!`;
                customizerToast.classList.add('is-visible');
                customizerToast.setAttribute('aria-hidden', 'false');

                if (toastTimeoutId) clearTimeout(toastTimeoutId);
                toastTimeoutId = setTimeout(() => {
                    closeCustomizer(true);
                }, 800);
            } else {
                closeCustomizer(true);
            }
        });
    }

    if (customizerBuyNowBtn) {
        customizerBuyNowBtn.addEventListener('click', () => {
            const itemData = getSelectedCustomizerItem();
            if (!itemData) return;

            addToCart(itemData);
            closeCustomizer(false); // Close customizer without restoring focus to trigger
            openCartDrawer(customizerBuyNowBtn); // Open cart drawer immediately
        });
    }

    // Header Trigger & Drawer Navigation
    if (cartTriggerBtn) {
        cartTriggerBtn.addEventListener('click', () => {
            openCartDrawer(cartTriggerBtn);
        });
    }

    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', () => {
            closeCartDrawer(true);
        });
    }

    if (cartBackdrop) {
        cartBackdrop.addEventListener('click', () => {
            closeCartDrawer(true);
        });
    }

    if (cartContinueShoppingBtn) {
        cartContinueShoppingBtn.addEventListener('click', () => {
            closeCartDrawer(true);
        });
    }

    if (cartExploreBtn) {
        cartExploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeCartDrawer(false);
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                const headerOffset = siteHeader ? siteHeader.offsetHeight : 70;
                const elementTop = menuSection.getBoundingClientRect().top;
                const targetPosition = elementTop + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    }

    if (cartCheckoutBtn) {
        cartCheckoutBtn.addEventListener('click', () => {
            openCheckoutModal(cartCheckoutBtn);
        });
    }

    // Focus Trap for Cart Drawer
    if (cartDrawer) {
        cartDrawer.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            const focusableElements = cartDrawer.querySelectorAll(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusableElements.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. Demo Checkout & Order Confirmation Engine (Phase 4)
    // ----------------------------------------------------------------------
    // Checkout DOM References
    const checkoutBackdrop = document.getElementById('checkoutBackdrop');
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
    const checkoutBackBtn = document.getElementById('checkoutBackBtn');
    const checkoutSubmitBtn = document.getElementById('checkoutSubmitBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutName = document.getElementById('checkoutName');
    const checkoutPhone = document.getElementById('checkoutPhone');
    const checkoutNameError = document.getElementById('checkoutNameError');
    const checkoutPhoneError = document.getElementById('checkoutPhoneError');
    const checkoutFulfillmentError = document.getElementById('checkoutFulfillmentError');
    const checkoutSummaryItems = document.getElementById('checkoutSummaryItems');
    const checkoutSummaryCount = document.getElementById('checkoutSummaryCount');
    const checkoutSummarySubtotal = document.getElementById('checkoutSummarySubtotal');
    const checkoutSummaryTotal = document.getElementById('checkoutSummaryTotal');

    // Confirmation DOM References
    const confirmationBackdrop = document.getElementById('confirmationBackdrop');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmationCloseBtn = document.getElementById('confirmationCloseBtn');
    const confirmationNewOrderBtn = document.getElementById('confirmationNewOrderBtn');
    const confirmationOrderId = document.getElementById('confirmationOrderId');
    const confirmationCustomerName = document.getElementById('confirmationCustomerName');
    const confirmationCustomerPhone = document.getElementById('confirmationCustomerPhone');
    const confirmationFulfillment = document.getElementById('confirmationFulfillment');
    const confirmationOrderTime = document.getElementById('confirmationOrderTime');
    const confirmationReceiptItems = document.getElementById('confirmationReceiptItems');
    const confirmationOrderTotal = document.getElementById('confirmationOrderTotal');

    let lastActiveCheckoutTrigger = null;

    /**
     * Generates a unique, professional demonstration order ID (e.g. TDB-2026-XXXX).
     */
    const generateOrderId = () => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `TDB-2026-${code}`;
    };

    const isCheckoutOpen = () => {
        return checkoutModal && checkoutModal.classList.contains('is-open');
    };

    const isConfirmationOpen = () => {
        return confirmationModal && confirmationModal.classList.contains('is-open');
    };

    const renderCheckoutSummary = () => {
        const { totalCount, subtotal } = getCartTotals();
        if (checkoutSummaryCount) checkoutSummaryCount.textContent = totalCount;
        if (checkoutSummarySubtotal) checkoutSummarySubtotal.textContent = `₹${subtotal}`;
        if (checkoutSummaryTotal) checkoutSummaryTotal.textContent = `₹${subtotal}`;

        if (!checkoutSummaryItems) return;
        checkoutSummaryItems.innerHTML = '';

        cart.forEach(item => {
            const row = document.createElement('div');
            row.className = 'checkout-summary-item';
            row.setAttribute('role', 'listitem');

            const pills = [
                ...item.customizations.map(c => c.optionName),
                `${item.packaging.optionName}${item.packaging.price > 0 ? ` (+₹${item.packaging.price})` : ''}`
            ].join(', ');

            row.innerHTML = `
                <div class="summary-item-left">
                    <div class="summary-item-thumb">
                        <img src="${item.image}" alt="${item.name}" width="44" height="44" loading="lazy">
                    </div>
                    <div class="summary-item-info">
                        <span class="summary-item-title">${item.name} × ${item.quantity}</span>
                        <span class="summary-item-meta">${pills}</span>
                    </div>
                </div>
                <span class="summary-item-calc">₹${item.unitPrice * item.quantity}</span>
            `;

            checkoutSummaryItems.appendChild(row);
        });
    };

    const clearFormErrors = () => {
        if (checkoutNameError) checkoutNameError.textContent = '';
        if (checkoutPhoneError) checkoutPhoneError.textContent = '';
        if (checkoutFulfillmentError) checkoutFulfillmentError.textContent = '';
        if (checkoutName) checkoutName.classList.remove('has-error');
        if (checkoutPhone) {
            const wrap = checkoutPhone.closest('.phone-input-wrap');
            if (wrap) wrap.classList.remove('has-error');
        }
    };

    const openCheckoutModal = (triggerBtn = null) => {
        if (cart.length === 0) {
            if (customizerToast && customizerToastMsg) {
                customizerToastMsg.textContent = 'Your bag is empty. Please add items before checkout!';
                customizerToast.classList.add('is-visible');
                customizerToast.setAttribute('aria-hidden', 'false');
                setTimeout(() => {
                    customizerToast.classList.remove('is-visible');
                    customizerToast.setAttribute('aria-hidden', 'true');
                }, 2000);
            }
            return;
        }

        lastActiveCheckoutTrigger = triggerBtn || cartCheckoutBtn || null;

        // Close cart drawer without unsetting body scroll lock
        closeCartDrawer(false);

        renderCheckoutSummary();
        clearFormErrors();

        if (checkoutBackdrop) checkoutBackdrop.classList.add('is-visible');
        if (checkoutModal) {
            checkoutModal.classList.add('is-open');
            checkoutModal.setAttribute('aria-hidden', 'false');
        }
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            if (checkoutCloseBtn) checkoutCloseBtn.focus();
        }, 50);
    };

    const closeCheckoutModal = (restoreFocus = true) => {
        if (!isCheckoutOpen()) return;

        if (checkoutModal) {
            checkoutModal.classList.remove('is-open');
            checkoutModal.setAttribute('aria-hidden', 'true');
        }
        if (checkoutBackdrop) checkoutBackdrop.classList.remove('is-visible');

        if (!isConfirmationOpen() && !isCartOpen() && !isCustomizerOpen()) {
            document.body.style.overflow = '';
        }

        if (restoreFocus && lastActiveCheckoutTrigger) {
            lastActiveCheckoutTrigger.focus();
        }
    };

    const validateCheckoutForm = () => {
        clearFormErrors();
        let isValid = true;
        let firstInvalidField = null;

        // 1. Name Validation (at least 2 non-whitespace characters)
        const rawName = checkoutName ? checkoutName.value.trim() : '';
        if (!rawName || rawName.length < 2) {
            if (checkoutNameError) checkoutNameError.textContent = 'Please enter your full name (at least 2 characters).';
            if (checkoutName) checkoutName.classList.add('has-error');
            isValid = false;
            if (!firstInvalidField) firstInvalidField = checkoutName;
        }

        // 2. Mobile Phone Validation (10 digits, starting with 6, 7, 8, or 9)
        const rawPhone = checkoutPhone ? checkoutPhone.value.trim().replace(/\D/g, '') : '';
        let normalizedPhone = rawPhone;
        if (rawPhone.length === 12 && rawPhone.startsWith('91')) {
            normalizedPhone = rawPhone.substring(2);
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(normalizedPhone)) {
            if (checkoutPhoneError) checkoutPhoneError.textContent = 'Please enter a valid 10-digit Indian mobile number.';
            if (checkoutPhone) {
                const wrap = checkoutPhone.closest('.phone-input-wrap');
                if (wrap) wrap.classList.add('has-error');
            }
            isValid = false;
            if (!firstInvalidField) firstInvalidField = checkoutPhone;
        }

        // 3. Fulfillment Preference Validation
        const selectedFulfillment = checkoutForm ? checkoutForm.querySelector('input[name="fulfillment"]:checked') : null;
        if (!selectedFulfillment) {
            if (checkoutFulfillmentError) checkoutFulfillmentError.textContent = 'Please select your fulfillment preference.';
            isValid = false;
        }

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return {
            isValid,
            customerName: rawName,
            customerPhone: normalizedPhone,
            fulfillment: selectedFulfillment ? selectedFulfillment.value : 'dine-in'
        };
    };

    const openConfirmationModal = (orderData) => {
        if (!confirmationModal) return;

        if (confirmationOrderId) confirmationOrderId.textContent = orderData.orderId;
        if (confirmationCustomerName) confirmationCustomerName.textContent = orderData.customerName;
        if (confirmationCustomerPhone) confirmationCustomerPhone.textContent = `+91 ${orderData.customerPhone}`;
        if (confirmationFulfillment) {
            confirmationFulfillment.textContent = orderData.fulfillment === 'dine-in' ? 'Café Dine-In' : 'Counter Pickup';
        }
        if (confirmationOrderTime) confirmationOrderTime.textContent = orderData.timestamp;
        if (confirmationOrderTotal) confirmationOrderTotal.textContent = `₹${orderData.totalAmount}`;

        if (confirmationReceiptItems) {
            confirmationReceiptItems.innerHTML = '';
            orderData.items.forEach(item => {
                const row = document.createElement('div');
                row.className = 'receipt-item-row';
                row.setAttribute('role', 'listitem');

                const pills = [
                    ...item.customizations.map(c => c.optionName),
                    `${item.packaging.optionName}${item.packaging.price > 0 ? ` (+₹${item.packaging.price})` : ''}`
                ].join(', ');

                row.innerHTML = `
                    <div class="receipt-item-details">
                        <span class="receipt-item-name">${item.name} × ${item.quantity}</span>
                        <span class="receipt-item-pills">${pills}</span>
                    </div>
                    <span class="receipt-item-math">₹${item.unitPrice * item.quantity}</span>
                `;
                confirmationReceiptItems.appendChild(row);
            });
        }

        if (confirmationBackdrop) confirmationBackdrop.classList.add('is-visible');
        confirmationModal.classList.add('is-open');
        confirmationModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            if (confirmationNewOrderBtn) confirmationNewOrderBtn.focus();
        }, 50);
    };

    const closeConfirmationModal = (restoreFocus = true) => {
        if (!isConfirmationOpen()) return;

        if (confirmationModal) {
            confirmationModal.classList.remove('is-open');
            confirmationModal.setAttribute('aria-hidden', 'true');
        }
        if (confirmationBackdrop) confirmationBackdrop.classList.remove('is-visible');

        // Reset cart and checkout form on confirmation close
        cart = [];
        updateCartBadge(false);
        renderCart();
        if (checkoutForm) checkoutForm.reset();
        clearFormErrors();

        // Reset fulfillment visual selection
        const fulfillmentCards = document.querySelectorAll('.fulfillment-card');
        fulfillmentCards.forEach(c => {
            const radio = c.querySelector('input[type="radio"]');
            if (radio && radio.value === 'dine-in') {
                c.classList.add('is-selected');
                radio.checked = true;
            } else {
                c.classList.remove('is-selected');
            }
        });

        document.body.style.overflow = '';

        if (restoreFocus) {
            const menuBtn = document.querySelector('.hero-btn') || siteHeader;
            if (menuBtn) menuBtn.focus();
        }
    };

    const handleCheckoutSubmit = (e) => {
        if (e) e.preventDefault();

        if (cart.length === 0) {
            closeCheckoutModal(false);
            openCartDrawer();
            return;
        }

        const validation = validateCheckoutForm();
        if (!validation.isValid) return;

        const { subtotal } = getCartTotals();
        const now = new Date();
        const formattedTime = now.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }) + ', ' + now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const orderReceipt = {
            orderId: generateOrderId(),
            customerName: validation.customerName,
            customerPhone: validation.customerPhone,
            fulfillment: validation.fulfillment,
            timestamp: formattedTime,
            items: JSON.parse(JSON.stringify(cart)),
            totalAmount: subtotal
        };

        // Close checkout and open confirmation receipt
        closeCheckoutModal(false);
        openConfirmationModal(orderReceipt);
    };

    // Fulfillment Radio Visual State
    const fulfillmentCards = document.querySelectorAll('.fulfillment-card');
    fulfillmentCards.forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener('change', () => {
                fulfillmentCards.forEach(c => c.classList.remove('is-selected'));
                if (radio.checked) {
                    card.classList.add('is-selected');
                }
            });
        }
    });

    // Realtime Error Clearing on Input
    if (checkoutName) {
        checkoutName.addEventListener('input', () => {
            if (checkoutName.value.trim().length >= 2) {
                checkoutName.classList.remove('has-error');
                if (checkoutNameError) checkoutNameError.textContent = '';
            }
        });
    }

    if (checkoutPhone) {
        checkoutPhone.addEventListener('input', () => {
            const digits = checkoutPhone.value.replace(/\D/g, '');
            if (digits.length === 10) {
                const wrap = checkoutPhone.closest('.phone-input-wrap');
                if (wrap) wrap.classList.remove('has-error');
                if (checkoutPhoneError) checkoutPhoneError.textContent = '';
            }
        });
    }

    // Checkout Event Handlers
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }

    if (checkoutSubmitBtn) {
        checkoutSubmitBtn.addEventListener('click', handleCheckoutSubmit);
    }

    if (checkoutCloseBtn) {
        checkoutCloseBtn.addEventListener('click', () => closeCheckoutModal(true));
    }

    if (checkoutBackBtn) {
        checkoutBackBtn.addEventListener('click', () => {
            closeCheckoutModal(false);
            openCartDrawer(checkoutBackBtn);
        });
    }

    if (checkoutBackdrop) {
        checkoutBackdrop.addEventListener('click', () => closeCheckoutModal(true));
    }

    // Confirmation Event Handlers
    if (confirmationCloseBtn) {
        confirmationCloseBtn.addEventListener('click', () => closeConfirmationModal(true));
    }

    if (confirmationNewOrderBtn) {
        confirmationNewOrderBtn.addEventListener('click', () => {
            closeConfirmationModal(false);
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                const headerOffset = siteHeader ? siteHeader.offsetHeight : 70;
                const elementTop = menuSection.getBoundingClientRect().top;
                const targetPosition = elementTop + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    }

    if (confirmationBackdrop) {
        confirmationBackdrop.addEventListener('click', () => closeConfirmationModal(true));
    }

    // Focus Traps for Checkout & Confirmation Modals
    if (checkoutModal) {
        checkoutModal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            const focusableElements = checkoutModal.querySelectorAll(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusableElements.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        });
    }

    if (confirmationModal) {
        confirmationModal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            const focusableElements = confirmationModal.querySelectorAll(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusableElements.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        });
    }

    // Unified Global Escape Handler (Confirmation -> Checkout -> Customizer -> Cart Drawer -> Mobile Nav)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (isConfirmationOpen()) {
                closeConfirmationModal(true);
            } else if (isCheckoutOpen()) {
                closeCheckoutModal(true);
            } else if (isCustomizerOpen()) {
                closeCustomizer(true);
            } else if (isCartOpen()) {
                closeCartDrawer(true);
            } else {
                closeMobileMenu(true);
            }
        }
    });

    // ----------------------------------------------------------------------
    // 7. Clickable Brand Logo & Return Home Overlay Dismissal
    // ----------------------------------------------------------------------
    const brandLink = document.querySelector('.brand');
    if (brandLink) {
        brandLink.addEventListener('click', () => {
            if (isConfirmationOpen()) closeConfirmationModal(false);
            if (isCheckoutOpen()) closeCheckoutModal(false);
            if (isCustomizerOpen()) closeCustomizer(false);
            if (isCartOpen()) closeCartDrawer(false);
            closeMobileMenu(false);
        });
    }

    // Initial check on page load
    handleHeaderScroll();
    highlightActiveNav();
});
