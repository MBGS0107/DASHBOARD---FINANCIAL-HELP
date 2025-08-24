# Sweet Dreams Bakery - Dashboard Móvil

## Descripción
Dashboard móvil para el registro de ingresos (ventas) y egresos (gastos) de Sweet Dreams Bakery.

## Estructura del Proyecto

```
├── index.html      # Archivo HTML principal (estructura)
├── styles.css      # Estilos CSS (presentación)
├── script.js       # Lógica JavaScript (funcionalidad)
└── README.md       # Documentación
```

## Características de la Refactorización

### ✅ Separación de Responsabilidades
- **HTML**: Solo estructura y contenido semántico
- **CSS**: Todos los estilos en archivo separado
- **JavaScript**: Lógica de aplicación modularizada en clase

### ✅ Mejoras en JavaScript
- **Arquitectura orientada a objetos**: Clase `DashboardApp` 
- **Event listeners modernos**: Reemplazó `onclick` inline
- **Async/await**: Para manejo de APIs más limpio
- **Validación mejorada**: Función centralizada de validación
- **Reset de formularios**: Limpieza automática después de envío
- **Manejo de errores**: Try/catch para operaciones asíncronas

### ✅ Mejoras en CSS
- **Variables CSS**: Para colores y valores reutilizables
- **Organización lógica**: Estilos agrupados por componente
- **Comentarios descriptivos**: Para mejor mantenimiento

### ✅ Mejoras en HTML
- **HTML semántico**: Estructura más limpia
- **Separación clara**: Sin estilos o scripts inline
- **Referencias externas**: Links a archivos CSS y JS

## Funcionalidades

### 📊 Registro de Ingresos (Ventas)
- Selección de productos predefinidos
- Cálculo automático de precios desde API
- Cálculo automático de totales
- Envío a Google Sheets

### 📉 Registro de Egresos (Gastos)  
- Entrada libre de productos/conceptos
- Cálculo manual de precios
- Cálculo automático de totales
- Envío a Google Sheets

### 💳 Medios de Pago
- Efectivo
- Transferencia QR

## API Integration
La aplicación se conecta a Google Apps Script para:
- Obtener precios de productos
- Registrar ingresos y egresos en Google Sheets

## Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **Vanilla JavaScript**: ES6+ con clases y async/await
- **Bootstrap 5**: Framework CSS para responsive design
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía (Poppins)

## Cómo usar
1. Abrir `index.html` en cualquier navegador
2. Seleccionar tipo de registro (Ingreso/Egreso)
3. Completar el formulario
4. Hacer clic en registrar

## Compatibilidad
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles (responsive design)
- ✅ Prevención de zoom en iOS
- ✅ Soporte para touch interfaces
