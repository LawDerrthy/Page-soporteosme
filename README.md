# Soporte OSME - Sitio Web

Sitio web minimalista para el despacho contable Soporte OSME.

## 🚀 Características

- Diseño minimalista con fondo blanco y acentos rojos
- Formulario de contacto con API REST
- Sección de redes sociales
- Código QR de WhatsApp
- Diseño responsive
- Animaciones suaves

## 📱 Configuración de WhatsApp

### Generar Código QR

1. Ve a [WhatsApp Web](https://web.whatsapp.com/)
2. Escanea el código QR con tu WhatsApp
3. Ve a **Configuración > Dispositivos vinculados**
4. Haz clic en **"Vincular un dispositivo"**
5. Escanea el código QR que aparece
6. Toma una captura de pantalla del código QR
7. Guarda la imagen como `img/whatsapp-qr.png`

### Configurar Número de WhatsApp

1. Abre el archivo `index.html`
2. Busca la línea: `<a href="https://wa.me/528111234567"`
3. Reemplaza `528111234567` con tu número de WhatsApp
4. El formato debe ser: código de país + número (sin espacios ni guiones)

**Ejemplo:**
- México: `528111234567`
- España: `34612345678`
- Argentina: `5491112345678`

## 📱 Configuración de Redes Sociales

### Actualizar Enlaces

En el archivo `index.html`, actualiza los enlaces de las redes sociales:

```html
<!-- Facebook -->
<a href="https://facebook.com/tu-pagina" class="social-card">

<!-- Instagram -->
<a href="https://instagram.com/tu-usuario" class="social-card">

<!-- LinkedIn -->
<a href="https://linkedin.com/company/tu-empresa" class="social-card">

<!-- YouTube -->
<a href="https://youtube.com/@tu-canal" class="social-card">
```

### Actualizar Usuarios

Cambia los nombres de usuario en las tarjetas:

```html
<small class="text-secondary">@TuUsuarioReal</small>
```

## 📧 Configuración del Email

1. Abre el archivo `php/api/contact.php`
2. Busca la línea: `$to = "antonymendez.esp@gmail.com";`
3. Cambia por tu dirección de email real

## 🎨 Personalización

### Colores

Los colores se pueden modificar en `css/custom.css`:

```css
:root {
  --primary-red: #dc3545;    /* Rojo principal */
  --light-red: #f8d7da;      /* Rojo claro */
  --gray-light: #f8f9fa;     /* Gris claro */
  --gray-medium: #6c757d;    /* Gris medio */
  --gray-dark: #495057;      /* Gris oscuro */
}
```

### Logo

Reemplaza `img/Logo.jpg` con tu logo real.

## 📁 Estructura de Archivos

```
PageOSME/
├── css/
│   └── custom.css
├── img/
│   ├── Logo.jpg
│   └── whatsapp-qr.png
├── js/
│   ├── contact-api.js
│   └── smooth-scroll.js
├── php/
│   ├── api/
│   │   └── contact.php
│   └── logs/
├── index.html
└── README.md
```

## 🔧 Requisitos del Servidor

- PHP 7.4 o superior
- Función `mail()` habilitada
- Servidor web (Apache, Nginx, etc.)

## 📞 Soporte

Para cualquier duda o problema, contacta al equipo de desarrollo.

---

**Soporte OSME** - Despacho de contaduría en Santa Catarina, Nuevo León 