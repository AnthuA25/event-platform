function DetailEvent({ evento, onBack }) {
  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg text-white">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>

      <img
        src={evento.imagen}
        alt={evento.nombre}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{evento.nombre}</h2>
      <p className="mt-2 text-gray-300">{evento.descripcion}</p>

      <div className="mt-4 text-sm text-gray-400">
        <p>
          <strong>Lugar:</strong> {evento.lugar}
        </p>
        <p>
          <strong>Categoría:</strong> {evento.categoria}
        </p>
        <p>
          <strong>Fecha:</strong>{" "}
          {new Date(evento.fecha).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p>
          <strong>Hora:</strong> {evento.hora} hrs
        </p>
      </div>
    </div>
  );
}

function CardComponent({ evento, onEventClick }) {
  return (
    <div className="w-[300px] bg-slate-700 rounded-xl shadow-xl overflow-hidden flex-shrink-0 flex flex-col" onClick={() => onEventClick(evento)}>
      <img src={evento.imagen} alt={evento.nombre} className="w-full h-[200px] object-cover" />

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
  );
}

function ListComponent({ data,onEventClick  }) {
  return (
    <section className="relative py-12 px-4 text-white">
      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {data.map((evento, index) => (
            <CardComponent key={index} evento={evento} onEventClick ={onEventClick}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardList() {
  const [data, setData] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  React.useEffect(() => {
    fetch("../data/data.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);
   const handleEventClick = (evento) => {
    setSelectedEvent(evento);
  };

  const handleBack = () => {
    setSelectedEvent(null);
  };

   if (selectedEvent) {
    return <DetailEvent evento={selectedEvent} onBack={handleBack} />;
  }
   return(
     <section className="py-10 px-4 text-white">
      <h2 className="text-3xl font-bold text-blue-200 mb-2 text-center">Eventos</h2>
      <div className="w-32 h-1 bg-blue-200 mx-auto mb-8 rounded"></div>

      <ListComponent data={data} onEventClick={handleEventClick} />
    </section>
   )
}
ReactDOM.render(<CardList />, document.getElementById("card"));