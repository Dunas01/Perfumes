document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');
            
            // Close other open items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
            this.reset();
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Payment form submission
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Payment successful! Thank you for your purchase.');
            
        });
    }
    
    // Quantity buttons in checkout
    const minusBtns = document.querySelectorAll('.quantity-btn.minus');
    const plusBtns = document.querySelectorAll('.quantity-btn.plus');
    
    minusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quantityElement = this.nextElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                updateTotals();
            }
        });
    });
    
    plusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quantityElement = this.previousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateTotals();
        });
    });
    
    // Update order totals
    function updateTotals() {
        
        console.log('Totals updated');
    }
    
    // Catalog filtering
    const brandFilter = document.getElementById('brand-filter');
    const priceFilter = document.getElementById('price-filter');
    const genderFilter = document.getElementById('gender-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    if (brandFilter && priceFilter && genderFilter) {
        const fragranceCards = document.querySelectorAll('.fragrance-card');
        const fragranceRows = document.querySelectorAll('.fragrance-table tbody tr');
        
        function applyFilters() {
            const brandValue = brandFilter.value;
            const priceValue = priceFilter.value;
            const genderValue = genderFilter.value;
            
            // Filter table rows
            fragranceRows.forEach(row => {
                const brand = row.getAttribute('data-brand');
                const price = parseFloat(row.getAttribute('data-price'));
                const gender = row.getAttribute('data-gender');
                
                const brandMatch = brandValue === 'all' || brand === brandValue;
                const genderMatch = genderValue === 'all' || gender === genderValue;
                let priceMatch = true;
                
                if (priceValue !== 'all') {
                    const [min, max] = priceValue.split('-').map(val => {
                        if (val.endsWith('+')) {
                            return parseFloat(val);
                        }
                        return val ? parseFloat(val) : null;
                    });
                    
                    if (max !== null && !isNaN(max)) {
                        priceMatch = price >= min && price <= max;
                    } else {
                        priceMatch = price >= min;
                    }
                }
                
                if (brandMatch && priceMatch && genderMatch) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Filter cards
            fragranceCards.forEach(card => {
                const brand = card.getAttribute('data-brand');
                const price = parseFloat(card.getAttribute('data-price'));
                const gender = card.getAttribute('data-gender');
                
                const brandMatch = brandValue === 'all' || brand === brandValue;
                const genderMatch = genderValue === 'all' || gender === genderValue;
                let priceMatch = true;
                
                if (priceValue !== 'all') {
                    const [min, max] = priceValue.split('-').map(val => {
                        if (val.endsWith('+')) {
                            return parseFloat(val);
                        }
                        return val ? parseFloat(val) : null;
                    });
                    
                    if (max !== null && !isNaN(max)) {
                        priceMatch = price >= min && price <= max;
                    } else {
                        priceMatch = price >= min;
                    }
                }
                
                if (brandMatch && priceMatch && genderMatch) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        brandFilter.addEventListener('change', applyFilters);
        priceFilter.addEventListener('change', applyFilters);
        genderFilter.addEventListener('change', applyFilters);
        
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', function() {
                brandFilter.value = 'all';
                priceFilter.value = 'all';
                genderFilter.value = 'all';
                applyFilters();
            });
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});