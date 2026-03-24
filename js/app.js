document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.sr, .sr-delay, .sr-delay-2');
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 2. Navbar Glass Effect
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '15px 0';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.borderBottom = '1px solid rgba(212, 175, 55, 0.1)';
        } else {
            nav.style.padding = '24px 0';
            nav.style.background = 'rgba(10, 10, 10, 0.6)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        }
    });
});

// 3. Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// 4. Smart Dynamic Modal Engine
// type = 'pdf' or 'image'
function openModal(name, category, type, sourceLink) {
    // Set Header Info
    document.getElementById('modalName').innerText = name;
    document.getElementById('modalCat').innerText = category;
    
    const bodyContainer = document.getElementById('modalDynamicBody');
    const modalContentBlock = document.getElementById('modalContentBlock');

    // If PDF, inject a full-size iFrame
    if (type === 'pdf') {
        bodyContainer.innerHTML = `
            <iframe class="modal-iframe" src="${sourceLink}#toolbar=0&navpanes=0" title="${name}">
                <p style="color: #fff; padding: 20px;">Your browser does not support PDFs. <a href="${sourceLink}" style="color: var(--gold-solid)">Download the PDF instead.</a></p>
            </iframe>
        `;
        modalContentBlock.style.maxWidth = '1000px'; // Wider for documents
    } 
    // If Image, inject a standard image tag
    else if (type === 'image') {
        bodyContainer.innerHTML = `
            <img src="${sourceLink}" alt="${name}" class="modal-img-view" />
        `;
        modalContentBlock.style.maxWidth = '600px'; // Thinner for photos
    }

    // Show Modal
    document.getElementById('quickViewModal').classList.add('show');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
}

// Close Modal Logic
function closeModal(event, forceClose = false) {
    if (forceClose || event.target.id === 'quickViewModal') {
        document.getElementById('quickViewModal').classList.remove('show');
        document.body.style.overflow = ''; // Unlock scrolling
        
        // Clear iframe to stop audio/downloads if user clicks away fast
        setTimeout(() => {
            document.getElementById('modalDynamicBody').innerHTML = '';
        }, 400);
    }
}