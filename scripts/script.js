const url = 'https://6544f2a15a0b4b04436d4b7f.mockapi.io/users/';

document.addEventListener("DOMContentLoaded", function(){
    const btnBuscar = document.getElementById("btnGet1");
    const btnPost = document.getElementById("btnPost");
    const btnPut = document.getElementById("btnPut");
    const btnEliminar = document.getElementById("btnDelete");
    const postName = document.getElementById("inputPostNombre");
    const postLastname = document.getElementById("inputPostApellido");
    const postEliminar = document.getElementById("inputDelete");
    const postModificar = document.getElementById("inputPutId");
    const results = document.getElementById("results");

    document.addEventListener('input', function () {
        // Habilitar boton al llenar campos
        if (postName.value !== "" && postLastname.value !== "") {
            btnPost.disabled = false;
        };
    });

    //Evento buscar por ID
    function buscar(id){
        const urlID = url + id;
        console.log(urlID);

        // Realizar la solicitud GET a la API
        fetch(urlID)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Error de red.");
            }
            return response.json();
        })
            .then(data => {
                console.log(data)
                results.innerHTML = '';
                if (id === '') {
                    // Mostrar todos los elementos en la interfaz
                    data.forEach(element => {
                        results.innerHTML += `
                        <label>ID: ${element.id}</label>
                        <label>NAME: ${element.name}</label>
                        <label>LASTNAME: ${element.lastname}</label>
                        <br>
                        `;

                    });
                } else {
                    // Mostrar solo el elemento ingresado por el usuario
                    results.innerHTML += `
                        <label>ID: ${data.id}</label>
                        <label>NAME: ${data.name}</label>
                        <label>LASTNAME: ${data.lastname}</label>
                        <br>
                        `;
                }
    
        })
            .catch(error => {
            console.error(error);
        });
    }

    // Evento clic en el botón buscar
    btnBuscar.addEventListener("click", function(){
        const input = document.getElementById("inputGet1Id").value;
        buscar(input);
    })

    //Evento agregar por ID
    btnPost.addEventListener("click", function(e){
        const nombre = postName.value;
        const apellido = postLastname.value;

        // Crear objeto con los datos a agregar
        const nuevoElemento = {
            name: nombre,
            lastname: apellido,
        };

        const opciones = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(nuevoElemento),
        };

        // Realizar la solicitud POST a la API
         fetch(url, opciones)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Error de red.");
            }
            return response.json();
         })
            .then(data => {
                console.log(data)
                // Ejecutamos buscar() para que muestre todos los elementos en pantalla
                buscar("");   
                    
            })
            .catch(error => {
            console.error(error);
        });

        e.preventDefault();
    })

    // Habilitar boton al llenar campos
    document.addEventListener('input', function () {
        if (postModificar.value !== "" ){
            btnPut.disabled = false;
        };
    });

    // Evento Eliminar por ID
    btnEliminar.addEventListener("click", function(e){
        // Obtener el valor del campo de ID a eliminar
        const input = document.getElementById("inputDelete").value;
        const urlID = url + input;
    
        const opciones = {
            method: "DELETE",
        };

        // Realizar la solicitud DELETE a la API
        fetch(urlID, opciones)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red.");
                }
                return response.json();
            })
            .then(data => {
                console.log("Elemento eliminado exitosamente");
                results.innerHTML = ''; 
            })
            .catch(error => {
                console.error(error);
            });
    
        e.preventDefault();

    });


    // Evento Modificar por ID
    // Habilitar boton al llenar campos
        document.addEventListener('input', function () {
        if (postEliminar.value !== "" ){
            btnPut.disabled = false;
        };
    });
    
    // Evento para abrir el modal de modificación
    btnPut.addEventListener("click", function () {
        abrirModalModificar();
    });

    // Evento para habilitar/deshabilitar el botón "Guardar" en el modal
    document.getElementById("inputPutNombre").addEventListener("input", function () {
        document.getElementById("btnSendChanges").disabled = this.value === "";
    });

    // Evento para realizar la modificación al hacer clic en "Guardar" en el modal
    document.getElementById("btnSendChanges").addEventListener("click", function () {
        guardarCambios();
    });

    // Función para abrir el modal de modificación
    function abrirModalModificar() {
        const inputPutId = document.getElementById("inputPutId").value;
        if (inputPutId === "") {
            alert("Por favor, ingrese un ID válido para modificar.");
            return;
        }

        // Llamamos a la función buscar para obtener los datos del registro
        buscar(inputPutId);

        // Mostrar el modal
        const dataModal = new bootstrap.Modal(document.getElementById("dataModal"));
        dataModal.show();
    }

    // Función para realizar la modificación
    function guardarCambios() {
        // Obtener los valores modificados del modal
        const nuevoNombre = document.getElementById('inputPutNombre').value;
        const nuevoApellido = document.getElementById('inputPutApellido').value;

        // Obtener el ID del registro que se está modificando
        const id = parseInt(document.getElementById('inputPutId').value);

        // Crear objeto con los datos actualizados
        const datosActualizados = {
            name: nuevoNombre,
            lastname: nuevoApellido
        };

        // Realizar la solicitud PUT a la API
        const urlID = url + id;
        fetch(urlID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosActualizados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el registro');
            }
            // Cerrar el modal
            $('#dataModal').modal('hide');
            // Actualizar la lista en la interfaz de usuario
            buscar("");
        })
        .catch(error => {
            console.error(error);
        });
    }
});

