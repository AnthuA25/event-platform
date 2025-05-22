function CardComponent({ evento }) {
  return (
    <div className="w-[300px] bg-slate-700 rounded-xl shadow-xl overflow-hidden flex-shrink-0">
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

function ListComponent({ data }) {
  return (
    <section className="relative py-12 px-4 text-white">
      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {data.map((evento, index) => (
            <CardComponent key={index} evento={evento} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardList() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("../data/data.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);
   return <ListComponent data={data} />;
}
ReactDOM.render(<CardList />, document.getElementById("card"));