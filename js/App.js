
function Slider() {
  return (
    <div className="relative h-[400px]">
      {/* Imagen de fondo */}
      <img
        src="../assets/fondo-evento.jpg"
        alt="Fondo evento"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Texto centrado */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Buenas Noches Latin Tour</h1>
          <p className="text-lg md:text-xl font-light mt-2">¡Compra tus entradas ahora!</p>
        </div>
      </div>
    </div>
  );
}

function EventSlider({ events }) {
  const eventosOrdenados = [...events]
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .slice(0, 10); // Puedes ajustar cuántos eventos mostrar

  return (
    <div className="bg-gray-800 py-10 px-4 text-white">
      {/* Título */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-200">Próximos Eventos</h2>
        <div className="w-32 h-1 bg-blue-200 mt-2 rounded"></div>
      </div>

      {/* Contenedor centrado y deslizable */}
      <div className="relative">
        <div className="flex justify-center">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide max-w-[1280px] px-4">
            {eventosOrdenados.map((evento, index) => (
              <div
                key={index}
                className="w-[300px] bg-slate-700 rounded-xl shadow-xl overflow-hidden flex-shrink-0 flex flex-col"
              >
                <img
                  src={evento.imagen}
                  alt={evento.nombre}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4 space-y-2 text-sm">
                  <div className="flex items-center text-gray-300 text-xs">
                    <i className="fa-solid fa-location-dot mr-2 text-blue-300"></i>
                    {evento.lugar}
                  </div>
                  <h3 className="text-blue-200 font-bold text-base">
                    {evento.nombre}
                  </h3>
                </div>

                <div className="p-4 py-3 flex items-center justify-between text-xs mt-auto">
                  <span className="bg-gray-800 text-white text-[11px] px-2 py-1 rounded">
                    {evento.categoria}
                  </span>

                  <div className="flex items-center text-white">
                    <div className="flex items-center leading-none mr-0">
                      <div className="text-3xl font-bold leading-none">
                        {new Date(evento.fecha)
                          .getDate()
                          .toString()
                          .padStart(2, "0")}
                      </div>
                      <div className="flex flex-col items-start ml-1">
                        <div className="uppercase text-[11px] leading-none">
                          {new Date(evento.fecha).toLocaleString("default", {
                            month: "short",
                          })}
                        </div>
                        <div className="text-[10px] leading-none">
                          {new Date(evento.fecha).getFullYear()}
                        </div>
                      </div>
                    </div>

                    <div className="h-10 w-px bg-white opacity-30 mx-3"></div>

                    <div className="flex items-center leading-none">
                      <div className="text-3xl font-bold leading-none">
                        {evento.hora.split(":")[0]}
                      </div>
                      <div className="flex flex-col items-start ml-1">
                        <div className="text-[11px] leading-none">
                          {evento.hora.split(":")[1]}
                        </div>
                        <div className="text-[10px] text-gray-300 leading-none">
                          hrs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function Categorias() {
  const categorias = [
    { nombre: "Concierto", icono: "fa-solid fa-microphone" },
    { nombre: "Teatro", icono: "fa-solid fa-theater-masks" },
    { nombre: "Stand up", icono: "fa-solid fa-face-laugh-squint" },
    { nombre: "Festivales", icono: "fa-solid fa-masks-theater" },
  ];
  return (
    <section className="text-white py-10 px-5">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-200">Categorías</h2>
        <div className="w-32 h-1 bg-blue-200 mt-2 rounded"></div>
      </div>
      <div className="flex justify-center flex-wrap gap-20">
        {categorias.map((cat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-2 bg-gray-900 p-6 rounded-lg shadow-md w-[150px] hover:bg-gray-700 transition"
          >
            <i className={`${cat.icono} text-3xl text-white`}></i>
            <span className="text-lg">{cat.nombre}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedEvents({ events }) {
  const destacados = events.slice(0, 4);

  return (
    <section className="relative py-12 px-4 text-white">
      {/* Fondo con imagen y opacidad */}
      <div className="absolute inset-0">
        <img
          src="../assets/collage.png" 
          alt="Fondo eventos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* Contenido encima */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-200 mb-2 text-center">Eventos Destacados</h2>
        <div className="w-32 h-1 bg-blue-200 mx-auto mb-8 rounded"></div>

        <div className="flex flex-wrap justify-center gap-6">
          {destacados.map((evento, index) => (
            <div
              key={index}
              className="w-[300px] bg-slate-700 rounded-xl shadow-xl overflow-hidden flex-shrink-0 flex flex-col"
            >
              <img
                src={evento.imagen}
                alt={evento.nombre}
                className="w-full h-[200px] object-cover"
              />

              <div className="p-4 space-y-2 text-sm">
                <div className="flex items-center text-gray-300 text-xs">
                  <i className="fa-solid fa-location-dot mr-2 text-blue-300"></i>
                  {evento.lugar}
                </div>
                <h3 className="text-blue-200 font-bold text-base">{evento.nombre}</h3>
                <p className="font-semibold text-white text-sm">{evento.descripcion}</p>
              </div>

              <div className="px-4 py-3 flex items-center justify-between text-xs mt-auto">
                <span className="bg-gray-800 text-white text-[11px] px-2 py-1 rounded">
                  {evento.categoria}
                </span>

                <div className="flex items-center text-white">
                  <div className="flex items-center leading-none mr-0">
                    <div className="text-3xl font-bold leading-none">
                      {new Date(evento.fecha).getDate().toString().padStart(2, "0")}
                    </div>
                    <div className="flex flex-col items-start ml-1">
                      <div className="uppercase text-[11px] leading-none">
                        {new Date(evento.fecha).toLocaleString("default", { month: "short" })}
                      </div>
                      <div className="text-[10px] leading-none">
                        {new Date(evento.fecha).getFullYear()}
                      </div>
                    </div>
                  </div>

                  <div className="h-10 w-px bg-white opacity-30 mx-3"></div>

                  <div className="flex items-center leading-none">
                    <div className="text-3xl font-bold leading-none">
                      {evento.hora.split(":")[0]}
                    </div>
                    <div className="flex flex-col items-start ml-1">
                      <div className="text-[11px] leading-none">
                        {evento.hora.split(":")[1]}
                      </div>
                      <div className="text-[10px] text-gray-300 leading-none">hrs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section
      className="text-white py-12 px-5 text-center"
      style={{
        background: "linear-gradient(90deg, #1A1B25 0%, #31567B 100%)",
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-200">
        ¿Primera vez usando la plataforma?
      </h2>
      <p className="mb-10 text-sm">
        Compra tus entradas en simples pasos, 100% online, segura y rápida.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-10">
        <div className="flex flex-col items-center gap-3">
          <i className="fas fa-ticket-alt text-4xl text-blue-200"></i>
          <span className="text-sm">Elige un evento favorito</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <i class="fa-solid fa-cart-shopping text-4xl text-blue-200"></i>
          <span className="text-sm">Compra tu entrada en segundos</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <i className="fas fa-mobile-alt text-4xl text-blue-200"></i>
          <span className="text-sm">¡Prepárate para vivirlo!</span>
        </div>
      </div>

      <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 text-sm transition">
        Ver guía de compra
      </button>
    </section>
  );
}

// ReactDOM.render(
//   <NavBarComponent />,
//   document.getElementById("navbarcomponent")
// );
// ReactDOM.render(
//   <EventSlider />,
//   document.getElementById("eventslider")
// );
// ReactDOM.render(
//   <FeaturedEvents />,
//   document.getElementById("featuredevents")
// );
// ReactDOM.render(
//   <FooterComponent />,
//   document.getElementById("footercomponent")
// );

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  return (
    <div>
      <Slider />
      <EventSlider events={data} />
      <Categorias />
      <FeaturedEvents events={data} />
      <Intro />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
