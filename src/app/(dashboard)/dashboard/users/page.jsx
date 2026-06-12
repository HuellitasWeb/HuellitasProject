"use client";

import Table from "../components/Table/Table";
import useCollection from "@/hooks/useCollection";

function Users() {
    const { data, error, mutate } = useCollection("admins");

    if (error) {
        return <div className="panel-alert">Ha ocurrido un error al cargar los usuarios.</div>;
    }

    return (
        <div className="my-12">
            <Table
                data={data}
                refresh={mutate}
                config={{ collection: "admins" }}
            />
        </div>
    );
}

export default Users;
