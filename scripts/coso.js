const inputNombre = document.getElementById("inputPostNombre");
const inputApellido = document.getElementById("inputPostApellido");
const btnPost = document.getElementById("btnPost");


btnPost.addEventListener("click", function () {
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;


    const nuevoElemento = {
        name: nombre,
        lastname: apellido
    };


    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoElemento)
    };


    fetch(url, opciones)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error de red.");
            }
            return response.json();
        })
        .then(data => {

            console.log("Elemento agregado exitosamente:", data);


            inputNombre.value = "";
            inputApellido.value = "";
        })
        .catch(error => {
            console.error(error);
        });
});