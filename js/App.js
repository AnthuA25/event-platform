function NavBarComponent() {
    return (
        <nav className="flex justify-between rounded-lg items-center p-5 bg-dark-blue text-white max-w-3xl navbar">
            <h1 className="navbar-title">FlowTicket</h1>
            <ul className="navitems flex">
                <li>
                    <a href="#">Inicio</a>
                </li>
                <li>
                    <a href="#">Eventos</a>
                </li>
                <li>
                    <a href="#">¿Cómo comprar?</a>
                </li>
                <li>
                    <a href="contacto.html">Contacto</a>
                </li>
            </ul>
        </nav>
    );
}


function FooterComponent() {
    return (
        <footer>
            <section>
                <article>
                    <h5>Plataforma</h5>
                    <p>Inicio</p>
                    <p>Inicio</p>
                    <p>Inicio</p>
                    <p>Inicio</p>
                </article>
            </section>
            <section>
                <p>Todos los derechos resrvados &copy; Aylin - Diego</p>
            </section>
        </footer>
    );
}

ReactDOM.render(
    <NavBarComponent />,
    document.getElementById("navbarcomponent")
);
ReactDOM.render(
    <FooterComponent />,
    document.getElementById("footercomponent")
);