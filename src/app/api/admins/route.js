import bcrypt from "bcryptjs";
import {
    getRef,
    formatData,
    addElement,
    putElement,
    delElement,
} from "../../../services/services";
import { verifySession } from "@/lib/auth";

// Toda la colección admins es solo-root, incluido el GET: sus documentos
// contienen hashes de contraseña que no deben ser públicos.
async function requireRoot(req) {
    const session = await verifySession(req);
    if (!session) {
        return Response.json({ error: "No autorizado" }, { status: 401 });
    }
    if (session.role !== "root") {
        return Response.json({ error: "Requiere rol root" }, { status: 403 });
    }
    return null;
}

export async function GET(req) {
    const denied = await requireRoot(req);
    if (denied) return denied;

    try {
        const ref = await getRef("admins");
        const admins = formatData(ref).map(({ id, data }) => ({
            id,
            data: {
                nombre: data.nombre,
                email: data.email,
                role: data.role,
                estado: data.estado,
            },
        }));
        return Response.json(admins);
    } catch (e) {
        console.error(e);
        return Response.json({ error: "Error interno" }, { status: 500 });
    }
}

export async function POST(req) {
    const denied = await requireRoot(req);
    if (denied) return denied;

    try {
        const { data } = await req.json();
        const password = data?.password ?? data?.["contraseña"];

        if (!data?.nombre || !data?.email || !password) {
            return Response.json({ error: "Datos incompletos" }, { status: 400 });
        }

        const res = await addElement(
            {
                nombre: data.nombre,
                email: data.email,
                passwordHash: bcrypt.hashSync(password, 10),
                role: "admin",
                estado: true,
            },
            "admins"
        );
        return Response.json({ status: 200, data: { id: res.id } });
    } catch (e) {
        console.error(e);
        return Response.json({ error: "Error interno" }, { status: 500 });
    }
}

export async function PUT(req) {
    const denied = await requireRoot(req);
    if (denied) return denied;

    try {
        const { id, data } = await req.json();
        const updates = { ...data };

        const password = updates.password ?? updates["contraseña"];
        delete updates.password;
        delete updates["contraseña"];
        delete updates.passwordHash;
        if (password) {
            updates.passwordHash = bcrypt.hashSync(password, 10);
        }

        const res = await putElement(updates, id, "admins");
        return Response.json({ status: 200, data: res });
    } catch (e) {
        console.error(e);
        return Response.json({ error: "Error interno" }, { status: 500 });
    }
}

export async function DELETE(req) {
    const denied = await requireRoot(req);
    if (denied) return denied;

    try {
        const { item } = await req.json();
        const res = await delElement(item.id, "admins");
        return Response.json({ status: 200, data: res });
    } catch (e) {
        console.error(e);
        return Response.json({ error: "Error interno" }, { status: 500 });
    }
}
