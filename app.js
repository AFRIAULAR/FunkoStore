//obtengo todos los elementos con clase ".cart-item-count"
const elementos = document.querySelectorAll('.cart-item-count');
const aumentarButtons = document.querySelectorAll('.aumentar');
const disminuirButtons = document.querySelectorAll('.disminuir');



function calcularResumen() {
    let suma = 0;
    let subtotal = 0;
    elementos.forEach(elemento => {
        const row = elemento.closest('.tr-detail');
        const total_item = row.querySelector('.cart-item-price');
        subtotal += parseFloat(total_item.textContent);
        suma += parseFloat(elemento.value);
    });
    return {
        suma: suma,
        subtotal: subtotal
    };
}

document.addEventListener('DOMContentLoaded', function () {



    elementos.forEach(elemento => {
        elemento.addEventListener('change', (event) => {
            // Encuentra el elemento padre mas cercano con la clase "tr-detail"
            const row = elemento.closest('.tr-detail');
            //Encuentra el item donde esta el precio
            const total_item = row.querySelector('.cart-item-price');
            //Encuentra el elemento "p-td-price" dentro de la fila
            const priceElement = row.querySelector('.p-td-price');
            const price = parseFloat(priceElement.textContent);
            const count_items = parseFloat(elemento.value);
            total_item.textContent = (price * count_items);


            //actualizo resumen
            const quant = document.getElementById('quant');
            const total = document.getElementById('total');
            const subtotal = document.getElementById('subtotal');
            const envio = document.getElementById('envio');

            let total_value = parseFloat(total.textContent);
            let subtotal_value = parseFloat(subtotal.textContent);
            let envio_value = parseFloat(envio.textContent)
            let resumen = calcularResumen();
            quant.textContent = resumen.suma;
            subtotal_value = resumen.subtotal;
            subtotal.textContent = subtotal_value;
            total_value = subtotal_value + envio_value;
            total.textContent = total_value;
        });
    });


    aumentarButtons.forEach(aumentarButton => {
        aumentarButton.addEventListener('click', function () {
            const cartItemCountElement = aumentarButton.closest('.input-group').querySelector('.cart-item-count');
            let valor = parseInt(cartItemCountElement.value);
    
            if (valor < parseInt(cartItemCountElement.getAttribute('max'))) {
                valor++;
                cartItemCountElement.value = valor;
                // Llamo manualmente al evento change! No se si es correcto
                cartItemCountElement.dispatchEvent(new Event('change'));
            }
        });
    });
    
    disminuirButtons.forEach(disminuirButton => {
        disminuirButton.addEventListener('click', function () {
            const cartItemCountElement = disminuirButton.closest('.input-group').querySelector('.cart-item-count');
            let valor = parseInt(cartItemCountElement.value);
    
            if (valor > parseInt(cartItemCountElement.getAttribute('min'))) {
                valor--;
                cartItemCountElement.value = valor;
                // Llamo manualmente al evento change! No se si es correcto
                cartItemCountElement.dispatchEvent(new Event('change'));
            }
        });
    });
});



