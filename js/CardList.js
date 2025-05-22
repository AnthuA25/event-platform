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

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row gap-4 text-sm">
        <input
          type="text"
          placeholder="Buscar evento..."
          className="px-4 py-2 rounded bg-slate-700 placeholder-white placeholder-opacity-60 text-white w-full sm:w-[200px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-2 rounded text-black w-full sm:w-1/4"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="">Todos los géneros</option>
          <option value="Concierto">Concierto</option>
          <option value="Teatro">Teatro</option>
          <option value="Stand Up">Stand Up</option>
          <option value="Festival">Festival</option>
        </select>
        <select
          className="px-3 py-2 rounded text-black w-full sm:w-1/4"
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
        <select
          className="px-3 py-2 rounded text-black w-full sm:w-1/5"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      <ListComponent data={filteredData} onEventClick={handleEventClick} />
    </section>
  );
}
ReactDOM.render(<CardList />, document.getElementById("card"));
