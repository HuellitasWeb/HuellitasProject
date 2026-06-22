import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { WHATSAPP_GROUPS } from '@/lib/whatsappGroups';

function WhatsAppSuccessModal({ group, onClose }) {
    const data = WHATSAPP_GROUPS[group];
    if (!data) return null;

    return (
        <div className="flex fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50" onClick={onClose}>
            <div
                className="flex fixed inset-0 justify-center items-center max-w-screen-2xl mx-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="whatsapp-success-title"
            >
                <div
                    className="w-[90%] md:w-[70%] lg:w-[35%] max-h-[95%] p-6 md:p-10 bg-white rounded-3xl relative flex flex-col items-center gap-5 text-center animate-modal-pop"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-center items-center w-16 h-16 rounded-full bg-primaryColor/10 text-primaryColor">
                        <WhatsAppIcon className="w-9 h-9" />
                    </div>

                    <h3 id="whatsapp-success-title" className="heading-2 font-semibold uppercase">
                        ¡Gracias por sumarte!
                    </h3>

                    <p className="par-3">
                        Recibimos tus datos con éxito. Te invitamos a ingresar a nuestro{' '}
                        <span className="font-semibold text-primaryColor">{data.titulo}</span>.
                    </p>

                    <p className="par-3 text-grayFont">{data.descripcion}</p>

                    <a href={data.link} target="_blank" rel="noopener noreferrer" className="primary-btn">
                        Unirme al grupo
                    </a>

                    <button
                        type="button"
                        className="par-3 text-grayFont underline hover:text-primaryColor duration-200"
                        onClick={onClose}
                    >
                        Ahora no, gracias
                    </button>

                    <div
                        className="absolute top-2 right-4 heading-2 cursor-pointer hover:text-primaryColor duration-200"
                        onClick={onClose}
                    >
                        ✖
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhatsAppSuccessModal;
