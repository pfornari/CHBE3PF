document.getElementById('deleteInactiveUsersButton').addEventListener('click', () => {
    fetch('/users/inactive', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Usuarios inactivos eliminados con éxito.');
            // Realizar alguna acción adicional si es necesario
        } else {
            console.error('Error al eliminar usuarios inactivos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function deleteUser(userId) {
    fetch(`/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Usuario eliminado con éxito.');
            // Realizar alguna acción adicional si es necesario, como recargar la lista de usuarios
        } else {
            console.error('Error al eliminar usuario');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
