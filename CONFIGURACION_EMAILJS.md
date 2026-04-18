# Configuración de EmailJS para el formulario de contacto

## Problema identificado
El formulario de contacto no estaba funcionando porque intentaba enviar datos a un archivo PHP (`php/api/contact.php`) que no existe en el proyecto.

## Solución implementada
Se ha configurado EmailJS, un servicio gratuito que permite enviar emails directamente desde JavaScript sin necesidad de un servidor backend.

## Pasos para configurar EmailJS

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate para una cuenta gratuita
3. Confirma tu correo electrónico

### 2. Configurar el servicio de email
1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona "Gmail" (o el proveedor de email que uses)
4. Conecta tu cuenta de Gmail (lawderrthym@gmail.com)
5. Anota el **Service ID** que se genera

### 3. Crear una plantilla de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa esta plantilla:

**Asunto:**
```
Nuevo mensaje de contacto - Soporte OSME
```

**Contenido:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Nuevo mensaje de contacto</title>
</head>
<body>
    <h2>Nuevo mensaje de contacto recibido</h2>
    
    <p><strong>Nombre/Empresa:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Teléfono:</strong> {{from_phone}}</p>
    <p><strong>Mensaje:</strong></p>
    <p>{{message}}</p>
    
    <hr>
    <p><small>Este mensaje fue enviado desde el formulario de contacto de Soporte OSME</small></p>
</body>
</html>
```

4. Guarda la plantilla y anota el **Template ID**

### 4. Obtener la clave pública
1. Ve a "Account" → "API Keys"
2. Copia tu **Public Key**

### 5. Actualizar el código JavaScript
Reemplaza los siguientes valores en el archivo `js/contact-api.js`:

```javascript
// Línea 6: Reemplaza YOUR_PUBLIC_KEY con tu clave pública
emailjs.init("TU_CLAVE_PUBLICA_AQUI");

// Líneas 147-149: Reemplaza con tus IDs
const response = await emailjs.send(
    'TU_SERVICE_ID_AQUI', // Service ID de EmailJS
    'TU_TEMPLATE_ID_AQUI', // Template ID de EmailJS
    templateParams
);
```

### 6. Probar el formulario
1. Abre tu página web
2. Llena el formulario de contacto
3. Envía un mensaje de prueba
4. Verifica que recibas el email en lawderrthym@gmail.com

## Notas importantes
- La cuenta gratuita de EmailJS permite hasta 200 emails por mes
- Los emails se enviarán desde tu cuenta de Gmail conectada
- Puedes responder directamente a los emails recibidos
- El formulario incluye validación completa de campos

## Solución alternativa (si prefieres no usar EmailJS)
Si prefieres una solución más simple, también puedes:
1. Usar servicios como Formspree o Netlify Forms
2. Configurar un servidor backend con PHP/Node.js
3. Usar servicios de formularios como Google Forms

¿Necesitas ayuda con algún paso específico de la configuración? 