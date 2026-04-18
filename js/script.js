/**
 * Soporte OSME - Authentication Logic
 */

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');

    // Desktop/Overlay Toggle
    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }

    // Insert Mobile Toggle Buttons dynamically if strict HTML edits are tricky, 
    // or rely on user to add them. 
    // BUT since I want this to work "out of the box" with the provided HTML,
    // I will try to inject toggle links if they don't exist, OR 
    // better yet, just let the user know they might need a toggle button if the HTML is strict.
    // However, I can inject a "Switch to Register" link into the DOM for mobile.

    if (window.innerWidth <= 768) {
        addMobileToggles();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            addMobileToggles();
        }
    });

    function addMobileToggles() {
        // Prevent duplicate buttons
        if (document.getElementById('mobile-to-register')) return;

        const signInForm = document.querySelector('.sign-in-container form');
        const signUpForm = document.querySelector('.sign-up-container form');

        if (signInForm) {
            const toRegisterBtn = document.createElement('button');
            toRegisterBtn.id = 'mobile-to-register';
            toRegisterBtn.type = 'button';
            toRegisterBtn.className = 'ghost mobile-toggle-btn';
            toRegisterBtn.style.marginTop = '10px';
            toRegisterBtn.style.color = '#D32F2F';
            toRegisterBtn.style.borderColor = '#D32F2F';
            toRegisterBtn.innerText = '¿No tienes cuenta? Regístrate';

            toRegisterBtn.addEventListener('click', () => {
                container.classList.add("right-panel-active");
            });

            signInForm.appendChild(toRegisterBtn);
        }

        if (signUpForm) {
            const toLoginBtn = document.createElement('button');
            toLoginBtn.id = 'mobile-to-login';
            toLoginBtn.type = 'button';
            toLoginBtn.className = 'ghost mobile-toggle-btn';
            toLoginBtn.style.marginTop = '10px';
            toLoginBtn.style.color = '#D32F2F';
            toLoginBtn.style.borderColor = '#D32F2F';
            toLoginBtn.innerText = '¿Ya tienes cuenta? Ingresa';

            toLoginBtn.addEventListener('click', () => {
                container.classList.remove("right-panel-active");
            });

            signUpForm.appendChild(toLoginBtn);
        }
    }
});
