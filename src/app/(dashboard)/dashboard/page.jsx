"use client";

import Table from "./components/Table/Table";
import useCollection from "@/hooks/useCollection";

function Dashboard() {
    const { data, error, mutate } = useCollection("historias");

    if (error) {
        return <div className="panel-alert">Ha ocurrido un error al cargar las historias.</div>;
    }

    return (
        <div className="my-12">
            <Table
                data={data}
                refresh={mutate}
                config={{ collection: "historias" }}
                stories={true}
            />
        </div>
    );
}

export default Dashboard;
