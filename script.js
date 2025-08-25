class DashboardApp {
    constructor() {
        this.currentType = null;
        this.apiUrl = "https://www.dolarbluebolivia.click/proxy/gsheet2"; // o el dominio real donde despliegues el Flask


        this.init();
    }

    init() {
        this.setCurrentDate();
        this.bindEvents();
    }

    // Establecer fecha automática al cargar
    setCurrentDate() {
        const today = new Date();
        // Formato MM/DD/YYYY
        const formattedDate = String(today.getMonth() + 1).padStart(2, '0') + '/' +
            String(today.getDate()).padStart(2, '0') + '/' +
            today.getFullYear();

        // Mostrar la fecha en los campos de fecha (como texto)
        const incomeFecha = document.getElementById("income-fecha");
        const expenseFecha = document.getElementById("expense-fecha");
        if (incomeFecha) {
            incomeFecha.type = 'text';
            incomeFecha.value = formattedDate;
            incomeFecha.readOnly = true;
        }
        if (expenseFecha) {
            expenseFecha.type = 'text';
            expenseFecha.value = formattedDate;
            expenseFecha.readOnly = true;
        }
    }

    bindEvents() {
        // Bind type selector buttons
        document.getElementById('income-btn').addEventListener('click', () => this.selectType('income'));
        document.getElementById('expense-btn').addEventListener('click', () => this.selectType('expense'));

        // Bind submit buttons
        document.querySelector('.btn-income').addEventListener('click', () => this.enviarIngreso());
        document.querySelector('.btn-expense').addEventListener('click', () => this.enviarEgreso());
    }

    // Selector de tipo (Ingreso/Egreso)
    selectType(type) {
        this.currentType = type;

        // Reset buttons
        document.getElementById('income-btn').classList.remove('active');
        document.getElementById('expense-btn').classList.remove('active');

        // Reset forms
        document.getElementById('income-form').classList.remove('active');
        document.getElementById('expense-form').classList.remove('active');

        // Activate selected type
        if (type === 'income') {
            document.getElementById('income-btn').classList.add('active');
            document.getElementById('income-form').classList.add('active');
            this.setupIncomeCalculators();
        } else {
            document.getElementById('expense-btn').classList.add('active');
            document.getElementById('expense-form').classList.add('active');
            this.setupExpenseCalculators();
        }
    }

    // Setup calculadoras para ingresos
    setupIncomeCalculators() {
        const cantidadInput = document.getElementById("income-cantidad");
        const precioInput = document.getElementById("income-precio");
        const totalInput = document.getElementById("income-total");
        const totalDisplay = document.getElementById("income-total-display");

        const actualizarTotal = () => {
            const c = parseFloat(cantidadInput.value || 0);
            const p = parseFloat(precioInput.value || 0);
            const total = (c * p).toFixed(2);
            totalInput.value = total;
            totalDisplay.textContent = total;
        };

        // Remove existing event listeners to avoid duplicates
        cantidadInput.removeEventListener("input", actualizarTotal);
        precioInput.removeEventListener("input", actualizarTotal);

        cantidadInput.addEventListener("input", actualizarTotal);
        precioInput.addEventListener("input", actualizarTotal);

        const productoSelect = document.getElementById("income-producto");
        productoSelect.removeEventListener("change", this.handleProductChange);
        productoSelect.addEventListener("change", (event) => this.handleProductChange(event, actualizarTotal));
    }

    async handleProductChange(event, actualizarTotal) {
        const producto = event.target.value;
        if (producto === "Seleccione" || !producto) return;

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tipo: "precio",
                    nombreProducto: producto,
                }),
            });

            const json = await response.json();
            const precio = json.precio;
            document.getElementById("income-precio").value = precio;

            actualizarTotal();
        } catch (error) {
            console.error("Error al obtener precio:", error);
            this.showAlert("Error al obtener el precio del producto", "error");
        }
    }

    // Setup calculadoras para egresos
    setupExpenseCalculators() {
        const cantidadInput = document.getElementById("expense-cantidad");
        const precioInput = document.getElementById("expense-precio");
        const totalInput = document.getElementById("expense-total");
        const totalDisplay = document.getElementById("expense-total-display");

        const actualizarTotal = () => {
            const c = parseFloat(cantidadInput.value || 0);
            const p = parseFloat(precioInput.value || 0);
            const total = (c * p).toFixed(2);
            totalInput.value = total;
            totalDisplay.textContent = total;
        };

        // Remove existing event listeners to avoid duplicates
        cantidadInput.removeEventListener("input", actualizarTotal);
        precioInput.removeEventListener("input", actualizarTotal);

        cantidadInput.addEventListener("input", actualizarTotal);
        precioInput.addEventListener("input", actualizarTotal);
    }

    // Validar campos requeridos
    validateFields(datos) {
        const invalidFields = Object.entries(datos)
            .filter(([key, value]) => value === "" || value === "Seleccione" || value === null)
            .map(([key]) => key);

        if (invalidFields.length > 0) {
            this.showAlert("Por favor, complete todos los campos.", "warning");
            return false;
        }
        return true;
    }

    // Enviar ingreso
    async enviarIngreso() {
        const datos = {
            fecha: document.getElementById("income-fecha").value,
            producto: document.getElementById("income-producto").value,
            cantidad: document.getElementById("income-cantidad").value,
            precio: document.getElementById("income-precio").value,
            medio: document.getElementById("income-medio").value,
            total: document.getElementById("income-total").value,
        };

        if (!this.validateFields(datos)) return;

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tipo: "ingreso",
                    fecha: datos.fecha,
                    producto: datos.producto,
                    cantidad: datos.cantidad,
                    precio: datos.precio,
                    medio: datos.medio,
                    total: datos.total,
                }),
            });

            const json = await response.json();
            this.showAlert("✅ " + json.message, "success");
            this.resetForm('income');
        } catch (error) {
            console.error("Error:", error);
            this.showAlert("Error al registrar el ingreso", "error");
        }
    }

    // Enviar egreso
    async enviarEgreso() {
        const datos = {
            fecha: document.getElementById("expense-fecha").value,
            producto: document.getElementById("expense-producto").value,
            cantidad: document.getElementById("expense-cantidad").value,
            precio: document.getElementById("expense-precio").value,
            medio: document.getElementById("expense-medio").value,
            total: document.getElementById("expense-total").value,
        };

        if (!this.validateFields(datos)) return;

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tipo: "egreso",
                    fecha: datos.fecha,
                    producto: datos.producto,
                    cantidad: datos.cantidad,
                    precio: datos.precio,
                    medio: datos.medio,
                    total: datos.total,
                }),
            });

            const message = await response.text();
            this.showAlert("✅ " + message, "success");
            this.resetForm('expense');
        } catch (error) {
            console.error("Error:", error);
            this.showAlert("Error al registrar el egreso", "error");
        }
    }

    // Resetear formulario después del envío
    resetForm(type) {
        const form = document.getElementById(`${type}-form`).querySelector('form');
        const inputs = form.querySelectorAll('input, select');

        inputs.forEach(input => {
            if (input.type !== 'date') {
                input.value = '';
                if (input.tagName === 'SELECT') {
                    input.selectedIndex = 0;
                }
            }
        });

        // Reset total display
        document.getElementById(`${type}-total-display`).textContent = '0.00';
        document.getElementById(`${type}-total`).value = '';
    }

    // Mostrar alertas mejoradas
    showAlert(message, type = 'info') {
        // Simple alert for now, can be enhanced with custom modal later
        alert(message);
    }
}

// Funciones globales para mantener compatibilidad (se pueden remover gradualmente)
let app;

function selectType(type) {
    if (app) {
        app.selectType(type);
    }
}

function enviarIngreso() {
    if (app) {
        app.enviarIngreso();
    }
}

function enviarEgreso() {
    if (app) {
        app.enviarEgreso();
    }
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    app = new DashboardApp();
});
