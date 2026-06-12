import {
    getRef,
    formatData,
    addElement,
    putElement,
    delElement,
} from "../../../services/services";
import { deleteImage } from "@/services/crabStorage";
import { verifySession } from "@/lib/auth";

export async function GET() {
    try {
        const ref = await getRef("adopciones");
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
        const res = await addElement(data, "adopciones");
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
        const { id, data, oldImageUrl } = await req.json();
        const res = await putElement(data, id, "adopciones");

        if (oldImageUrl && data?.imagen && oldImageUrl !== data.imagen) {
            await deleteImage(oldImageUrl);
        }

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
        const res = await delElement(item.id, "adopciones");
        await deleteImage(item.data.imagen);
        return Response.json({ status: 200, data: res });
    } catch (e) {
        console.error(e);
        return Response.json({ error: "Error interno" }, { status: 500 });
    }
}
