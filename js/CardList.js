function DetailEvent({ evento, onBack }) {
  const [cantidades, setCantidades] = React.useState(
    evento.precios.reduce((acc, p) => ({ ...acc, [p.zona]: 0 }), {})
  );

  const handleCantidad = (zona, delta) => {
    setCantidades((prev) => ({
      ...prev,
      [zona]: Math.max(0, prev[zona] + delta),
    }));
  };

  const resumen = Object.entries(cantidades)
    .filter(([, cantidad]) => cantidad > 0)
    .map(([zona, cantidad]) => {
      const precio = evento.precios.find((p) => p.zona === zona).precio;
      return { zona, cantidad, total: cantidad * precio };
    });

  const total = resumen.reduce((sum, r) => sum + r.total, 0);

  return (
    <div className="flex flex-col md:flex-row gap-6 text-white p-6 rounded-lg">
      <div className="w-full md:w-1/2 flex h-80 gap-4">
        <button
          onClick={onBack}
          className="w-12 h-80 bg-indigo-500 rounded hover:bg-blue-700 flex items-center justify-center"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="flex-1 bg-[#1A1B25] flex items-center justify-center rounded-md overflow-hidden">
          <img
            src={evento.imagen}
            alt={evento.nombre}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <h2 className="text-2xl font-semibold">{evento.nombre}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <span>
            📅 {evento.fecha} - {evento.hora} hrs
          </span>
          <span>📍 {evento.lugar}</span>
        </div>

        <table className="w-full text-sm text-left mt-4">
          <thead>
            <tr className="text-gray-400 border-b border-gray-600">
              <th className="py-2">Ticket</th>
              <th>Tarifa Regular</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {evento.precios.map(({ zona, precio }) => (
              <tr key={zona} className="border-b border-gray-700">
                <td className="py-2">{zona}</td>
                <td>S/{precio.toFixed(2)}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCantidad(zona, -1)}
                      className="px-2 bg-gray-700"
                    >
                      -
                    </button>
                    <span>{cantidades[zona]}</span>
                    <button
                      onClick={() => handleCantidad(zona, 1)}
                      className="px-2 bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Resumen</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            {resumen.map((r, i) => (
              <li key={i}>
                {r.cantidad} Ticket {r.zona} - S/{r.total.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold text-white">
            Total: S/{total.toFixed(2)}
          </p>
        </div>

        <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded text-white mt-4">
          Continuar
        </button>
      </div>
    </div>
  );
}

function CardComponent({ evento, onEventClick }) {
  return (
    <div
      className="w-[300px] bg-slate-700 rounded-xl shadow-xl overflow-hidden flex-shrink-0 flex flex-col"
      onClick={() => onEventClick(evento)}
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
              <div className="text-[10px] text-gray-300 leading-none">hrs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListComponent({ data, onEventClick }) {
  return (
    <section className="relative py-12 px-4 text-white">
      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {data.map((evento, index) => (
            <CardComponent
              key={index}
              evento={evento}
              onEventClick={onEventClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardList() {
  const [data, setData] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [genreFilter, setGenreFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("asc");
  React.useEffect(() => {
    fetch("data/data.json")
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
  const filteredData = data
    .filter((evento) => {
      const matchName = evento.nombre
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchGenre = genreFilter
        ? evento.categoria.trim().toLowerCase() === genreFilter.toLowerCase()
        : true;

      const today = new Date();
      const eventDate = new Date(evento.fecha);
      const oneDay = 24 * 60 * 60 * 1000;
      const dayOfWeek = today.getDay();

      let includeByDate = true;

      switch (dateFilter) {
        case "today":
          includeByDate = eventDate.toDateString() === today.toDateString();
          break;
        case "tomorrow":
          const tomorrow = new Date(today.getTime() + oneDay);
          includeByDate = eventDate.toDateString() === tomorrow.toDateString();
          break;
        case "this_week":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - dayOfWeek);
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          includeByDate = eventDate >= startOfWeek && eventDate <= endOfWeek;
          break;
        case "next_week":
          const startNextWeek = new Date(today);
          startNextWeek.setDate(today.getDate() - dayOfWeek + 7);
          const endNextWeek = new Date(startNextWeek);
          endNextWeek.setDate(startNextWeek.getDate() + 6);
          includeByDate =
            eventDate >= startNextWeek && eventDate <= endNextWeek;
          break;
        case "this_month":
          includeByDate =
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear();
          break;
        case "jul_2025":
          includeByDate =
            eventDate.getMonth() === 6 && eventDate.getFullYear() === 2025;
          break;
        default:
          includeByDate = true;
      }

      return matchName && matchGenre && includeByDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  if (selectedEvent) {
    return <DetailEvent evento={selectedEvent} onBack={handleBack} />;
  }
  return (
    <section className="py-10 px-4 text-white">
      <h2 className="text-3xl font-bold text-blue-200 mb-2 text-center">
        Eventos
      </h2>
      <div className="w-32 h-1 bg-blue-200 mx-auto mb-8 rounded"></div>

      <div className="flex flex-wrap justify-center gap-4 py-6 px-4 text-white text-sm">
        <input
          type="text"
          placeholder="Buscar evento..."
          className="px-4 py-2 rounded bg-slate-700 placeholder-white placeholder-opacity-60 text-white w-full sm:w-[200px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <label className="text-gray-300">Géneros:</label>
          <select
            className=" text-white bg-[#2c2c36] px-3 py-2 rounded focus:outline-none"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="">Todos los géneros</option>
            <option value="Concierto">Concierto</option>
            <option value="Teatro">Teatro</option>
            <option value="Stand Up">Stand Up</option>
            <option value="Festival">Festival</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-300">Fecha:</label>
          <select
            className="bg-[#2c2c36] text-white px-3 py-2 rounded focus:outline-none"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">Todas las fechas</option>
            <option value="today">Hoy</option>
            <option value="tomorrow">Mañana</option>
            <option value="this_week">Esta semana</option>
            <option value="next_week">Próxima semana</option>
            <option value="this_month">Este mes</option>
            <option value="jul_2025">Julio 2025</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-blue-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 16h13M3 12h9M3 8h5M21 16v-8M21 8l-4 4 4 4" />
          </svg>
          <span className="text-gray-300">Ordenar</span>
          <select
            className="bg-[#2c2c36] text-white px-3 py-2 rounded focus:outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setGenreFilter("");
              setDateFilter("");
              setSortOrder("asc");
            }}
            title="Restablecer filtros"
            className="ml-2 px-3 py-2 rounded bg-[#414352] hover:bg-[#52546b] transition-colors text-white text-sm"
          >
            ⟳
          </button>
        </div>
      </div>

      <ListComponent data={filteredData} onEventClick={handleEventClick} />
    </section>
  );
}
ReactDOM.render(<CardList />, document.getElementById("card"));
