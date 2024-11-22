export function Home(){
    const user = JSON.parse(localStorage.getItem('user'));

    return(
        <div className="card m-4 p-3 border-0">
            <h2>HOLA {user.empleado.persona.nombre}</h2>
            <small>En este sistema puedes gestioanr tu empresa.</small>
        </div>
    );
}