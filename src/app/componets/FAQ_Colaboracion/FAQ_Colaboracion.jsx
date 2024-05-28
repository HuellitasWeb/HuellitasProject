import Image from 'next/image';

import Petting_dog_desktop from '../../../../public/assets/FAQs/Petting_dog_desktop.png';
import Petting_dog_mobile from '../../../../public/assets/FAQs/Petting_dog_mobile.png';

function FAQ_Colaboracion() {
    return (
        <div className="container w-full lg:w-4/5 mx-auto p-4 lg:p-2 font-[Poppins]">


            <div className="text-left mb-4">
                <h2 className="text-lg text-primaryFont">Colaboración</h2>
                <h1 className="text-lg lg:text-3xl font-semibold text-primaryFont">PREGUNTAS FRECUENTES</h1>
                
            </div>

            <div className="flex flex-col lg:flex-row items-start"> 
                <div className="mb-4 lg:mb-0 lg:mr-4 w-full lg:w-1/2 lg:hidden">
                    <Image src={Petting_dog_mobile} width={100} height={100} alt="Petting Dog Mobile" className="rounded-lg w-full object-cover"/>
                </div>
                
                <div className="w-full lg:w-full flex flex-col space-y-4 h-full ">

                    <button className="flex justify-between items-center p-2 border  bg-tertiaryColor rounded-full shadow-md">
                        <span className='text-primaryFont font-[Poppins] text-xs lg:text-lg'>¿Cuál es la edad mínima para ser voluntario?</span>
                        <svg className="h-6 w-6 text-primaryFont mr-2"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                    </button>
                    <button className="flex justify-between items-center p-2 border bg-tertiaryColor rounded-full shadow-md">
                        <span className='text-primaryFont font-[Poppins] text-xs lg:text-lg'>¿Necesito alguna formación o experiencia previa?</span>
                        <svg className="h-6 w-6 text-primaryFont mr-2"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                    </button>
                    <button className="flex justify-between items-center p-2 border  bg-tertiaryColor rounded-full shadow-md">
                        <span className='text-primaryFont font-[Poppins] text-xs lg:text-lg'>¿Qué actividades puedo realizar como voluntario?</span>
                        <svg className="h-6 w-6 text-primaryFont mr-2"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                    </button>

                    <button className="flex justify-between items-center p-2 border  bg-tertiaryColor rounded-full shadow-md">
                        <span className='text-primaryFont font-[Poppins] text-xs lg:text-lg'>¿Cuál es la diferencia entre padrino y voluntario?</span>
                        <svg className="h-6 w-6 text-primaryFont mr-2"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                    </button>
											  
				</div>
                
                <Image src={Petting_dog_desktop} width={300} height={300} className="rounded-xl lg:mb-4  lg:w-4/12 hidden lg:block lg:ml-7 object-cover" alt="Petting Dog Desktop"/>
                
  
            
            </div>
           
        </div>
    );
}

export default FAQ_Colaboracion;