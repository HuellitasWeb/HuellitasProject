"use client";

import Table from "../components/Table/Table";
import useCollection from "@/hooks/useCollection";

function Adopciones() {
   const { data, error, mutate } = useCollection("adopciones");

   if (error) {
      return <div className="panel-alert">Ha ocurrido un error al cargar las adopciones.</div>;
   }

   return (
      <div className="my-12">
         <Table data={data} refresh={mutate} config={{ collection: "adopciones" }} />
      </div>
   );
}

export default Adopciones;
