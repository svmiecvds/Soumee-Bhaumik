// Mailbox Contact Form — EmailJS Integration
(function () {
    const SERVICE_ID = 'service_go8zt3r';
    const TEMPLATE_ID = 'template_x748bxb'; // Replace with your actual EmailJS template ID // Replace with your actual EmailJS template ID
    const PUBLIC_KEY = 'YdjjgOG2FlSkPhEWc';   // Replace with your actual EmailJS public key   // Replace with your actual EmailJS public key

    const mailboxBtn = document.getElementById('mailbox-btn');
    const mailboxModal = document.getElementById('mailbox-modal');
    const mailboxOverlay = document.getElementById('mailbox-overlay');
    const mailboxClose = document.getElementById('mailbox-close');
    const mailboxForm = document.getElementById('mailbox-form');
    const mailboxStatus = document.getElementById('mailbox-status');

    if (!mailboxBtn || !mailboxModal) return;

    // Toggle modal open
    mailboxBtn.addEventListener('click', () => {
        mailboxModal.classList.add('active');
        mailboxOverlay.classList.add('active');
        // Focus the first input for accessibility
        setTimeout(() => {
            const firstInput = mailboxForm.querySelector('input, textarea');
            if (firstInput) firstInput.focus();
        }, 300);
    });

    // Close modal
    function closeModal() {
        mailboxModal.classList.remove('active');
        mailboxOverlay.classList.remove('active');
    }

    mailboxClose.addEventListener('click', closeModal);
    mailboxOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mailboxModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission via EmailJS
    mailboxForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = mailboxForm.querySelector('.mailbox-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const templateParams = {
            from_name: mailboxForm.querySelector('#mail-name').value,
            from_email: mailboxForm.querySelector('#mail-email').value,
            message: mailboxForm.querySelector('#mail-message').value,
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                mailboxStatus.textContent = 'Message sent successfully!';
                mailboxStatus.className = 'mailbox-status success';
                mailboxForm.reset();
                setTimeout(() => {
                    mailboxStatus.textContent = '';
                    mailboxStatus.className = 'mailbox-status';
                    closeModal();
                }, 2500);
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                mailboxStatus.textContent = 'Failed to send. Please try again.';
                mailboxStatus.className = 'mailbox-status error';
                setTimeout(() => {
                    mailboxStatus.textContent = '';
                    mailboxStatus.className = 'mailbox-status';
                }, 4000);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
})();
