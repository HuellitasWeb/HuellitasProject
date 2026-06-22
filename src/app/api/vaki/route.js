import {
    getRef,
    formatData,
    addElement,
    putElement,
    delElement,
    deactivateAll,
} from "../../../services/services";
import { verifySession } from "@/lib/auth";

export async function GET() {
    try {
        const ref = await getRef("vaki");
        return Response.json(formatData(ref));
    } catch (e) {
        return Response.json(false);
    }
}

export async function POST(req) {
    const session = await verifySession(req);
    if (!session) {
        return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const { data } = await req.json();
        if (data?.activo) {
            await deactivateAll("vaki");
        }
        const res = await addElement(data, "vaki");
        return Response.json({ status: 200, data: res });
    } catch (e) {
        console.error(e);
        return Response.json({ error: "Error interno" }, { status: 500 });
    }
}

export async function PUT(req) {
    const session = await verifySession(req);
    if (!session) {
        return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const { id, data } = await req.json();
        if (data?.activo) {
            await deactivateAll("vaki", id);
        }
        const res = await putElement(data, id, "vaki");
        return Response.json({ status: 200, data: res });
    } catch (e) {
        console.error(e);
        return Response.json({ error: "Error interno" }, { status: 500 });
    }
}

export async function DELETE(req) {
    const session = await verifySession(req);
    if (!session) {
        return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const { item } = await req.json();
        const res = await delElement(item.id, "vaki");
        return Response.json({ status: 200, data: res });
    } catch (e) {
        console.error(e);
        return Response.json({ error: "Error interno" }, { status: 500 });
    }
}
