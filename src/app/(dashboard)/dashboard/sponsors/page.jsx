"use client";

import Table from "../components/Table/Table";
import useCollection from "@/hooks/useCollection";

function Sponsors() {
    const { data, error, mutate } = useCollection("sponsors");

    if (error) {
        return <div className="panel-alert">Ha ocurrido un error al cargar los sponsors.</div>;
    }

    return (
        <div className="my-12">
            <Table
                data={data}
                refresh={mutate}
                config={{ collection: "sponsors" }}
            />
        </div>
    );
}

export default Sponsors;
