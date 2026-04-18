document.addEventListener('DOMContentLoaded', function() {
    const modalContactForm = document.getElementById('modalContactForm');
    const submitButton = document.getElementById('modalSubmitButton');
    const recaptchaContainer = document.getElementById('recaptcha-container');
    const serviceOfInterestField = document.getElementById('serviceOfInterest');
    
    // Get form fields
    const nombreInput = document.getElementById('modalNombre');
    const emailInput = document.getElementById('modalEmail');
    const telefonoInput = document.getElementById('modalTelefono');
    const mensajeInput = document.getElementById('modalMensaje');
    
    const formFields = [nombreInput, emailInput, telefonoInput, mensajeInput];
    
    // Handle service buttons click to set service interest
    document.querySelectorAll('.btn-solicitar-info').forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            if (serviceOfInterestField) {
                serviceOfInterestField.value = serviceName;
                console.log('Service of interest set to:', serviceName);
            }
        });
    });
    
    // Initialize EmailJS
    emailjs.init("9n8yrvyLIsxJBXBDx");
    
    // Function to check if all fields are filled
    function areAllFieldsFilled() {
        return formFields.every(field => field.value.trim() !== '');
    }
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to validate phone format
    function isValidPhone(phone) {
        return phone.length >= 8 && /^\d+$/.test(phone);
    }
    
    // Function to enable/disable captcha
    function toggleCaptcha() {
        if (areAllFieldsFilled()) {
            recaptchaContainer.style.opacity = '1';
            recaptchaContainer.style.pointerEvents = 'auto';
            
            // Add animation effect
            recaptchaContainer.style.transition = 'opacity 0.5s ease-in-out';
            
            // Remove the hint text
            const hintText = recaptchaContainer.parentElement.querySelector('small');
            if (hintText) {
                hintText.style.opacity = '0';
                setTimeout(() => hintText.remove(), 500);
            }
            
            submitButton.disabled = false;
        } else {
            recaptchaContainer.style.opacity = '0.5';
            recaptchaContainer.style.pointerEvents = 'none';
            submitButton.disabled = true;
        }
    }
    
    // Add listeners to all form fields
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            // Add validation feedback
            if (field.value.trim() !== '') {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            } else {
                field.classList.remove('is-valid');
            }
            
            toggleCaptcha();
        });
        
        field.addEventListener('blur', function() {
            const value = field.value.trim();
            
            // Remove previous error messages
            const errorDiv = field.parentElement.querySelector('.text-danger');
            if (errorDiv) errorDiv.remove();
            
            // Validate specific fields
            if (value) {
                if (field.id === 'modalEmail' && !isValidEmail(value)) {
                    showFieldError(field, 'El formato del correo electrónico no es válido');
                } else if (field.id === 'modalTelefono' && !isValidPhone(value)) {
                    showFieldError(field, 'El número de teléfono debe tener al menos 8 dígitos');
                } else if (field.id === 'modalMensaje' && value.length < 10) {
                    showFieldError(field, 'El mensaje debe tener al menos 10 caracteres');
                }
            }
            
            toggleCaptcha();
        });
    });
    
    // Function to show field error
    function showFieldError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-danger small mt-1';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
        field.classList.add('is-invalid');
    }
    
    // Function to show success message
    function showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success mt-3';
        successDiv.innerHTML = `
            <i class="bi bi-check-circle-fill me-2"></i>
            ¡Mensaje enviado exitosamente! Te responderemos pronto.
        `;
        
        modalContactForm.appendChild(successDiv);
        modalContactForm.reset();
        
        // Remove validation classes
        formFields.forEach(field => {
            field.classList.remove('is-valid');
        });
        
        // Reset captcha
        grecaptcha.reset();
        
        // Disable submit button and captcha
        submitButton.disabled = true;
        toggleCaptcha();
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Function to show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mt-3';
        errorDiv.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            ${message}
        `;
        
        modalContactForm.appendChild(errorDiv);
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    // Handle form submission
    modalContactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        const errors = [];
        
        formFields.forEach(field => {
            const value = field.value.trim();
            
            if (!value) {
                isValid = false;
                errors.push({ field, message: 'Este campo es obligatorio' });
            } else if (field.id === 'modalEmail' && !isValidEmail(value)) {
                isValid = false;
                errors.push({ field, message: 'El formato del correo electrónico no es válido' });
            } else if (field.id === 'modalTelefono' && !isValidPhone(value)) {
                isValid = false;
                errors.push({ field, message: 'El número de teléfono debe tener al menos 8 dígitos' });
            } else if (field.id === 'modalMensaje' && value.length < 10) {
                isValid = false;
                errors.push({ field, message: 'El mensaje debe tener al menos 10 caracteres' });
            }
        });
        
        if (!isValid) {
            errors.forEach(error => showFieldError(error.field, error.message));
            return;
        }
        
        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showError('Por favor, completa el reCAPTCHA para verificar que no eres un robot.');
            return;
        }
        
        // Get form data
        const formData = {
            nombre: nombreInput.value.trim(),
            email: emailInput.value.trim(),
            telefono: telefonoInput.value.trim(),
            mensaje: mensajeInput.value.trim()
        };
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        const originalButtonText = submitButton.textContent;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
        
        try {
            // Enviar email usando EmailJS
            const templateParams = {
                to_email: 'lawderrthym@gmail.com',
                from_name: formData.nombre,
                from_email: formData.email,
                from_phone: formData.telefono,
                message: formData.mensaje,
                service_of_interest: serviceOfInterestField ? serviceOfInterestField.value : 'No especificado',
                reply_to: formData.email,
                'g-recaptcha-response': recaptchaResponse
            };
            
            const response = await emailjs.send(
                'service_9it7dn6',
                'template_thdydxz',
                templateParams
            );
            
            if (response.status === 200) {
                showSuccess();
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
    
    // Reset form when modal is closed
    const contactModal = document.getElementById('contactModal');
    contactModal.addEventListener('hidden.bs.modal', function() {
        modalContactForm.reset();
        
        // Reset service of interest
        if (serviceOfInterestField) {
            serviceOfInterestField.value = '';
        }
        
        // Remove validation classes
        formFields.forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');
        });
        
        // Remove error messages
        const errorMessages = modalContactForm.querySelectorAll('.text-danger');
        errorMessages.forEach(msg => msg.remove());
        
        // Reset alert messages
        const alerts = modalContactForm.querySelectorAll('.alert');
        alerts.forEach(alert => alert.remove());
        
        // Reset captcha
        grecaptcha.reset();
        
        // Disable submit button and captcha
        submitButton.disabled = true;
        toggleCaptcha();
    });
    
    // Initialize captcha state
    toggleCaptcha();
});

