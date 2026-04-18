document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const originalButtonText = submitButton.textContent;
    
    // Inicializar EmailJS
    emailjs.init("9n8yrvyLIsxJBXBDx"); // Reemplaza con tu clave pública de EmailJS (aqui)
    
    // Form validation function
    function validateForm() {
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        const errors = [];
        
        // Clear previous error states
        clearErrors();
        
        // Validate required fields
        if (!nombre) {
            errors.push({ field: 'nombre', message: 'El nombre o empresa es obligatorio' });
        }
        
        if (!email) {
            errors.push({ field: 'email', message: 'El correo electrónico es obligatorio' });
        } else if (!isValidEmail(email)) {
            errors.push({ field: 'email', message: 'El formato del correo electrónico no es válido' });
        }
        
        if (!telefono) {
            errors.push({ field: 'telefono', message: 'El número de contacto es obligatorio' });
        } else if (!isValidPhone(telefono)) {
            errors.push({ field: 'telefono', message: 'El número de teléfono debe tener al menos 8 dígitos' });
        }
        
        if (!mensaje) {
            errors.push({ field: 'mensaje', message: 'El mensaje es obligatorio' });
        } else if (mensaje.length < 10) {
            errors.push({ field: 'mensaje', message: 'El mensaje debe tener al menos 10 caracteres' });
        }
        
        // Display errors if any
        if (errors.length > 0) {
            errors.forEach(error => {
                showFieldError(error.field, error.message);
            });
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation
    function isValidPhone(phone) {
        return phone.length >= 8 && /^\d+$/.test(phone);
    }
    
    // Show field error
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-danger small mt-1';
        errorDiv.id = `${fieldId}-error`;
        errorDiv.textContent = message;
        
        field.classList.add('is-invalid');
        field.parentNode.appendChild(errorDiv);
    }
    
    // Clear all errors
    function clearErrors() {
        const errorDivs = document.querySelectorAll('.text-danger.small');
        const invalidFields = document.querySelectorAll('.is-invalid');
        
        errorDivs.forEach(div => div.remove());
        invalidFields.forEach(field => field.classList.remove('is-invalid'));
    }
    
    // Show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success mt-3 fade-in-up';
        successDiv.innerHTML = `
            <i class="bi bi-check-circle-fill me-2"></i>
            ${message}
        `;
        
        contactForm.appendChild(successDiv);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Clear form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mt-3 fade-in-up';
        errorDiv.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            ${message}
        `;
        
        contactForm.appendChild(errorDiv);
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            mensaje: document.getElementById('mensaje').value.trim()
        };
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
        
        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showError('Por favor, completa el reCAPTCHA para verificar que no eres un robot.');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            return;
        }

        try {
            // Enviar email usando EmailJS
            const templateParams = {
                to_email: 'lawderrthym@gmail.com', // Reemplaza con tu correo electrónico de destino (aqui)
                from_name: formData.nombre,
                from_email: formData.email,
                from_phone: formData.telefono,
                message: formData.mensaje,
                reply_to: formData.email,
                'g-recaptcha-response': recaptchaResponse
            };
            
            const response = await emailjs.send(
                'service_9it7dn6', // Reemplaza con tu Service ID de EmailJS (aqui)
                'template_thdydxz', // Reemplaza con tu Template ID de EmailJS (aqui)
                templateParams
            );
            
            if (response.status === 200) {
                showSuccess('¡Mensaje enviado exitosamente! Te responderemos pronto.');
                grecaptcha.reset();
            } else {
                showError('Error al enviar el mensaje. Por favor, intenta nuevamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
    
    // Real-time validation on input
    const formFields = ['nombre', 'email', 'telefono', 'mensaje'];
    
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('blur', function() {
            const value = this.value.trim();
            const errorDiv = document.getElementById(`${fieldId}-error`);
            
            if (errorDiv) {
                errorDiv.remove();
                this.classList.remove('is-invalid');
            }
            
            // Validate specific field
            if (value) {
                if (fieldId === 'email' && !isValidEmail(value)) {
                    showFieldError(fieldId, 'El formato del correo electrónico no es válido');
                } else if (fieldId === 'telefono' && !isValidPhone(value)) {
                    showFieldError(fieldId, 'El número de teléfono debe tener al menos 8 dígitos');
                } else if (fieldId === 'mensaje' && value.length < 10) {
                    showFieldError(fieldId, 'El mensaje debe tener al menos 10 caracteres');
                }
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 40;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add fade-in animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections and service cards
    document.querySelectorAll('section, .service-card').forEach(el => {
        observer.observe(el);
    });
}); 