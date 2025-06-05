function Contact() {
  const [formData, setFormData] = React.useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Gracias por contactarnos ✨");
    setFormData({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    });
  };

  return (
    <div className="min-h-screen text-white p-6 flex justify-center items-center">
      <div className="max-w-2xl w-full bg-[#1A1B25] p-8 rounded shadow-md space-y-6">
        <h2 className="text-3xl font-bold text-blue-200 mb-2 text-center">
          Contáctanos
        </h2>
        <div className="w-32 h-1 bg-blue-200 mx-auto mb-8 rounded"></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="asunto" className="block mb-1">
              Asunto
            </label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="mensaje" className="block mb-1">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-green-600 px-6 py-2 rounded text-white"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
}

// Renderizar en el div con id "contacto"
ReactDOM.render(<Contact />, document.getElementById("contacto"));
