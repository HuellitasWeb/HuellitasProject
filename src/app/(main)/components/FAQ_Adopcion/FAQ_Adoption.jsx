import Image from 'next/image';

import Accord from '../Accordion/Accordion';

function FAQ_Adoption({ items }) {
    return (
        <div className="w-full mx-auto">
            <div className="flex justify-center items-center w-full max-w-screen-2xl mx-auto h-full">
                <div className="w-[90%] lg:w-9/12 py-8 md:py-10 lg:py-16">
                    <div className="flex flex-col gap-2 text-left mb-6">
                        <h3 className="par-1">Adopción</h3>
                        <h2 className="text-lg lg:text-3xl font-semibold text-primaryFont">
                            PREGUNTAS FRECUENTES
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start">
                        <div className="mb-4 lg:mb-0 lg:mr-4 w-full lg:w-1/2 lg:hidden">
                            <Image
                                src={
                                    "/assets/FAQs/Woman_Sign-mobile.png"
                                }
                                width={700}
                                height={700}
                                className="rounded-lg w-full object-cover"
                                alt="Sing dog Mobile"
                            />
                        </div>
                        <div className='flex w-full'>
                            <Image
                                src={
                                    "/assets/FAQs/Woman_sign_desktop.png"
                                }
                                width={700}
                                height={700}
                                className="rounded-xl lg:w-5/12 hidden lg:block lg:mr-7 self-start"
                                alt="Sing dog desktop"
                            />

                            <div className="w-full flex flex-col space-y-4">
                                <Accord items={items} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ_Adoption;