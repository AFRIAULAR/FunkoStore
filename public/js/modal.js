// Capturar el evento de apertura del modal y mostrar los datos del producto
document.addEventListener('DOMContentLoaded', function () {
    var myModal = document.getElementById('staticBackdrop');
    myModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var productId = button.getAttribute('data-product-id');
        var productName = button.getAttribute('data-product-name');
        var productNameToDelete = document.getElementById('productNameToDelete');
        productNameToDelete.innerText = productName;
    });
    
    // Eliminar el producto cuando se confirme desde el modal
    var confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    confirmDeleteBtn.addEventListener('click', function () {
        var productId = document.querySelector('#modalbutton').getAttribute('data-product-id');
        // Realizar una solicitud al servidor para eliminar el producto con el ID correspondiente
        // Puedes usar fetch o AJAX para enviar la solicitud DELETE al servidor
        // fetch(`/ruta-eliminar-producto/${productId}`, { method: 'DELETE' })
        //   .then(response => {
        //       // Manejar la respuesta del servidor (p. ej. actualizar la interfaz)
        //   })
        //   .catch(error => {
        //       // Manejar cualquier error
        //   });
        console.log(`Eliminar el producto con ID: ${productId}`);
        // Una vez confirmado, puedes recargar la página o actualizar la interfaz para reflejar el cambio.
    });
});
