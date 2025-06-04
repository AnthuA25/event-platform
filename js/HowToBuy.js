function HowBuy() {
  const pasos = [
    {
      icono: "🛒",
      titulo: "Elige el evento",
      descripcion:
        "Explora los eventos disponibles y selecciona el que más te guste.",
    },
    {
      icono: "🎟️",
      titulo: "Selecciona tus tickets",
      descripcion: "Escoge la zona y cantidad de entradas que deseas comprar.",
    },
    {
      icono: "📝",
      titulo: "Llena tus datos",
      descripcion:
        "Completa el formulario con tu nombre, correo y número de contacto.",
    },
    {
      icono: "💳",
      titulo: "Elige el método de pago",
      descripcion: "Puedes pagar con Yape, tarjeta de débito o crédito.",
    },
    {
      icono: "📧",
      titulo: "Revisa tu correo",
      descripcion:
        "Recibirás un mensaje de confirmación con los detalles de tu compra.",
    },
  ];
  return (
    <div className="min-h-screen  text-white p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-blue-200 mb-2 text-center">
        ¿Cómo comprar tus tickets?
      </h2>
      <div className="w-32 h-1 bg-blue-200 mx-auto mb-8 rounded"></div>


      <div className="relative flex flex-col items-center gap-12 max-w-3xl w-full">
        <div className="absolute top-10 left-8 w-1 h-[calc(100%-4rem)] bg-gray-700 hidden md:block"></div>

        {pasos.map((paso, index) => (
          <div
            key={index}
            className="relative bg-slate-700 hover:bg-indigo-700 p-6 rounded-xl shadow-lg w-full md:pl-24 transition-transform transform hover:scale-105 duration-300"
          >
            <div className="absolute left-4 top-6 w-12 h-12 rounded-full bg-indigo-600 text-2xl flex items-center justify-center shadow-md">
              {paso.icono}
            </div>
            <h2 className="text-xl font-semibold mb-1">
              {index + 1}. {paso.titulo}
            </h2>
            <p className="text-gray-300">{paso.descripcion}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => (window.location.href = "events.html")}
        className="mt-12 bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded text-white"
      >
        <i className="fa-solid fa-arrow-left"></i> Volver a eventos
      </button>
    </div>
  );
}

ReactDOM.render(<HowBuy />, document.getElementById("howtobuy"));
