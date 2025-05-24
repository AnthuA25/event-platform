function NavBarComponent() {
  const [menuAbierto, setMenuAbierto] = React.useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  return (
    <nav className="bg-gray-900 text-blue-200 p-4">
      <div className="flex justify-between items-center">
        <a href="/index.html" className="font-bold text-xl hover:text-white transition-colors">
          FlowTicket
        </a>
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          <i className="fas fa-bars"></i>
        </button>

        <ul className="hidden md:flex gap-4">
          <li><a href="/index.html" className="hover:bg-[#414352] py-1 rounded px-2 hover:text-white transition-colors">Inicio</a></li>
          <li><a href="/pages/events.html" className="hover:bg-[#414352] py-1 rounded px-2 hover:text-white transition-colors">Eventos</a></li>
          <li><a href="#" className="hover:bg-[#414352] py-1 rounded px-2 hover:text-white transition-colors">¿Cómo comprar?</a></li>
          <li><a href="#" className="hover:bg-[#414352] py-1 rounded px-2 hover:text-white transition-colors">Contacto</a></li>
        </ul>
      </div>
      {menuAbierto && (
        <ul className="flex flex-col mt-4 gap-2 md:hidden">
          <li><a href="/index.html" className="hover:bg-[#414352] py-1 rounded px-2 hover:text-white transition-colors">Inicio</a></li>
          <li><a href="../pages/events.html" className="hover:bg-[#414352] py-1 rounded px-2 hover:text-white transition-colors">Eventos</a></li>
          <li><a href="#" className="hover:bg-[#414352] py-1 rounded px-2 hover:text-white transition-colors">¿Cómo comprar?</a></li>
          <li><a href="#" className="hover:bg-[#414352] py-1 rounded px-2 hover:text-white transition-colors">Contacto</a></li>
        </ul>
      )}
    </nav>
  );
}

function FooterComponent() {
  return (
    <footer className="bg-[#1A1B25] text-white py-10 px-6 text-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        {/* Plataforma */}
        <div>
          <h3 className="font-bold text-[#9CB2F2] mb-3">Plataforma</h3>
          <ul className="space-y-1">
            <li>Inicio</li>
            <li>Evento</li>
            <li>¿Cómo comprar?</li>
            <li>Contacto</li>
          </ul>
        </div>

        {/* Eventos */}
        <div>
          <h3 className="font-bold text-[#9CB2F2] mb-3">Eventos</h3>
          <ul className="space-y-1">
            <li>Concierto</li>
            <li>Teatro</li>
            <li>Stand Up</li>
            <li>Festival</li>
          </ul>
        </div>

        {/* Soporte */}
        <div>
          <h3 className="font-bold text-[#9CB2F2] mb-3">Soporte</h3>
          <ul className="space-y-1">
            <li>Ayuda / FAQ</li>
            <li>Términos y condiciones</li>
            <li>Política de privacidad</li>
            <li>Festival</li>
          </ul>
        </div>

        {/* Suscríbete */}
        <div>
          <h3 className="font-bold text-[#9CB2F2] mb-3">Suscríbete</h3>
          <p className="mb-3">
            Recibe las últimas ofertas y cupones en tu correo
          </p>
          <div className="flex border border-white rounded overflow-hidden">
            <input
              type="email"
              placeholder="Tu correo"
              className="flex-grow p-2 bg-transparent text-white focus:outline-none"
            />
            <button className="bg-white text-black px-4 py-2 text-sm hover:bg-gray-200 transition">
              Suscribirse
            </button>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <hr className="border-gray-600 mb-4" />

      {/* Copyright */}
      <p className="text-center text-xs text-gray-400">
        Todos los derechos reservados © Aylin - Chirinos
      </p>
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
