"use client";

import Table from "../components/Table/Table";
import useCollection from "@/hooks/useCollection";

function Vaki() {
    const { data, error, mutate } = useCollection("vaki");

    if (error) {
        return <div className="panel-alert">Ha ocurrido un error al cargar las recolectas.</div>;
    }

    return (
        <div className="my-12">
            <Table
                data={data}
                refresh={mutate}
                config={{ collection: "vaki" }}
            />
        </div>
    );
}

export default Vaki;
