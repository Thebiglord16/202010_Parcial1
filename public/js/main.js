let socket = io.connect("http://localhost:3000")

socket.on('messages', data =>{
    console.log(data);
    render(data);
});

function render(data){
    let html = data.map((e, i) =>{
        if(e.aceptada){
            return(`<p>
                        ${e.razon} [<strong>Oferta aceptada. Valor: $ ${e.oferta} </strong>]
                    </p>
            `);
        }
        else {
            return(`<p>
                        ${e.razon} [Oferta no aceptada]
                    </p>
            `);
        }
    }).join("");

    document.getElementById("ofertas").innerHTML = html;
}

function addPropuesta(){
    aceptada = Math.random() * 0.5 + 0.3 > Math.random() * 0.5 + 0.3
    console.log(aceptada)
    let propuesta = {
        nit: document.getElementById("nit").value,
        razon: document.getElementById("razonsocial").value,
        aceptada: aceptada
    };
    console.log("nueva oferta :" + propuesta);
    socket.emit("new-message", propuesta);
    return false

}

function disableForm(){
    document.getElementById("registro").disabled = true;
    document.getElementById("ofertar").disabled = false;
}

function thirtySec(){
    document.getElementById("ofertar").disabled = true;
    setTimeout(function(){
        document.getElementById("ofertar").disabled = false;
    }, 30000);
}