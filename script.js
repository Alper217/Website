document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    function switchSection(targetId) {
        // Remove active class from all links and sections
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to target
        const activeLink = document.querySelector(`nav a[href="#${targetId}"]`);
        const activeSection = document.getElementById(targetId);

        if (activeLink) activeLink.classList.add('active');
        if (activeSection) activeSection.classList.add('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            history.pushState(null, null, `#${targetId}`);
            switchSection(targetId);
        });
    });

    // Handle initial load and back/forward
    function handleRouting() {
        const hash = window.location.hash.substring(1) || 'home';
        switchSection(hash);
    }

    window.addEventListener('popstate', handleRouting);
    handleRouting(); // Initial call
});
