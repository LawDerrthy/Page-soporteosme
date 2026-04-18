document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    let errores = [];

    if (nombre.length === 0) {
      errores.push("El nombre o empresa es obligatorio.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errores.push("El correo electrónico no es válido.");
    }

    if (telefono.length < 8 || isNaN(telefono)) {
      errores.push("El número de contacto debe tener al menos 8 dígitos.");
    }

    if (mensaje.length < 10) {
      errores.push("El mensaje debe tener al menos 10 caracteres.");
    }

    if (errores.length > 0) {
      e.preventDefault();
      alert("Por favor corrige los siguientes errores:\n\n" + errores.join("\n"));
    }
  });
});
