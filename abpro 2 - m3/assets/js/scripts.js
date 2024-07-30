function obtenerDatosPersona(anioNacimiento, mesNacimiento, esCargaFamiliar, esTrabajadorActivo, anioIngreso, mesIngreso) {
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;

    // Validaciones
    if (anioNacimiento > anioActual || (esTrabajadorActivo && anioIngreso > anioActual)) {
        return "Error: El año de nacimiento o de ingreso no puede ser mayor al año actual.";
    }
    if (mesNacimiento < 1 || mesNacimiento > 12 || (esTrabajadorActivo && (mesIngreso < 1 || mesIngreso > 12))) {
        return "Error: Los meses deben estar comprendidos entre 1 y 12.";
    }

    // Calcular Edad
    let edad = anioActual - anioNacimiento;
    let mesesEdad = mesActual - mesNacimiento;
    if (mesesEdad < 0) {
        edad -= 1;
        mesesEdad += 12;
    }

    // Calcular Permanencia
    let aniosPermanencia = 0;
    let mesesPermanencia = 0;
    if (esTrabajadorActivo) {
        aniosPermanencia = anioActual - anioIngreso;
        mesesPermanencia = mesActual - mesIngreso;
        if (mesesPermanencia < 0) {
            aniosPermanencia -= 1;
            mesesPermanencia += 12;
        }
    }

    // Determinar Rango Etario
    function rangoEtario(edad, meses) {
        if (edad < 0 || (edad === 0 && meses < 0)) {
            return "Nonato";
        } else if (edad < 2) {
            return "Infante";
        } else if (edad < 12) {
            return "Niño";
        } else if (edad < 18) {
            return "Adolescente";
        } else if (edad < 65) {
            return "Adulto";
        } else if (edad < 85) {
            return "Adulto Mayor";
        } else {
            return "Años Dorados";
        }
    }

    // Mensajes
    if (esTrabajadorActivo) {
        const mesesParaProximoAnio = 12 - mesesPermanencia;
        return `La Persona es un trabajador activo con ${aniosPermanencia} años y ${mesesPermanencia} meses en la organización y en ${mesesParaProximoAnio} meses cumple el próximo año`;
    } else {
        const esCarga = esCargaFamiliar ? "carga familiar" : "No carga familiar";
        return `La persona es un ${rangoEtario(edad, mesesEdad)}, ${esCarga} con ${edad} años y ${mesesEdad} meses`;
    }
}

function actualizarRangoEtario() {
    const anioNacimiento = parseInt(document.getElementById('anioNacimiento').value);
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const edad = anioActual - anioNacimiento;
    
    let rango;
    if (edad < 0) {
        rango = "Nonato";
    } else if (edad < 2) {
        rango = "Infante";
    } else if (edad < 12) {
        rango = "Niño";
    } else if (edad < 18) {
        rango = "Adolescente";
    } else if (edad < 65) {
        rango = "Adulto";
    } else if (edad < 85) {
        rango = "Adulto Mayor";
    } else {
        rango = "Años Dorados";
    }

    document.getElementById('rangoEtarioLabel').innerText = rango;
}

function generarInforme() {
    const esCargaFamiliar = document.getElementById('esCargaFamiliar').value === 'si';
    const anioNacimiento = parseInt(document.getElementById('anioNacimiento').value);
    const mesNacimiento = parseInt(document.getElementById('mesNacimiento').value);
    const anioIngreso = parseInt(document.getElementById('anioIngreso').value);
    const mesIngreso = parseInt(document.getElementById('mesIngreso').value);
    const esTrabajadorActivo = !isNaN(anioIngreso) && !isNaN(mesIngreso);

    const resultado = obtenerDatosPersona(anioNacimiento, mesNacimiento, esCargaFamiliar, esTrabajadorActivo, anioIngreso, mesIngreso);
    document.getElementById('resultado').innerText = resultado;
}

// Pruebas
console.log(obtenerDatosPersona(2024, 6, false, false, 0, 0)); // Nonato
console.log(obtenerDatosPersona(1953, 4, false, false, 0, 0)); // Adulto Mayor, No carga familiar con 70 años y 0 meses
console.log(obtenerDatosPersona(1985, 9, false, true, 1999, 9)); // La Persona es un trabajador activo con 23 años y 7 meses en la organización y en 5 meses cumple el próximo año