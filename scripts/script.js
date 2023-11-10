const url = 'https://6544f2a15a0b4b04436d4b7f.mockapi.io/users/';

document.addEventListener("DOMContentLoaded", function(){
    const btnBuscar = document.getElementById("btnGet1");
    const btnPost = document.getElementById("btnPost");
    const postName = document.getElementById("inputPostNombre");
    const postLastname = document.getElementById("inputPostApellido");
    const results = document.getElementById("results");

    document.addEventListener('input', function () {
        if (postName.value !== "" && postLastname.value !== "") {
            btnPost.disabled = false;
        };
    });

    //Evento buscar por ID\\\\
    function buscar(id){
        const urlID = url + id;
        console.log(urlID);
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
                    data.forEach(element => {
                        results.innerHTML += `
                        <label>ID: ${element.id}</label>
                        <label>NAME: ${element.name}</label>
                        <label>LASTNAME: ${element.lastname}</label>
                        <br>
                        `;

                    });
                } else {
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


    btnBuscar.addEventListener("click", function(){
        const input = document.getElementById("inputGet1Id").value;
        buscar(input);
    })

    //Evento agregar por ID
    btnPost.addEventListener("click", function(e){
        const nombre = postName.value;
        const apellido = postLastname.value;
            //const urlID = url + input;
            //console.log(urlID);

        const nuevoElemento = {
            name: nombre,
            lastname: apellido,
        };

        const opciones = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(nuevoElemento),
        };

         fetch(url, opciones)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Error de red.");
            }
            return response.json();
         })
            .then(data => {
                console.log(data)
                buscar("");
                 // No funciona entonces se me ocurre sacara la funcion de buscar 
                 //del addEventL3istener y usarla para esto tambien onda asi:  
                //input = "";
                //buscar(); 
                                    
                    
            })
            .catch(error => {
            console.error(error);
        });

        e.preventDefault();
    })
    
});




