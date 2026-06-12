"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import InputImg from "../InputImg/InputImg";
import { uploadImageClient } from "@/services/uploadImageClient";
import { successMessage, errorMessage } from "@/services/notify";


export default function StoriesModal({ isOpen, add = true, item, refresh }) {
   const [articleContent, setArticleContent] = useState(item?.data?.articulo ?? "");
   const [selectedImage, setSelectedImage] = useState(null); // imagen seleccionada desde el input

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
   } = useForm({
      defaultValues: {
         nombre: item?.data?.nombre ?? "",
         entradilla: item?.data?.entradilla ?? "",
      },
   });

   const entradilla = watch("entradilla") ?? "";

   const handleclose = () => {
      if (add) {
         isOpen.setStoriesModalAdd(false);
      } else {
         isOpen.setStoriesModalMod(false);
      }
   };

   async function onSubmit(values) {
      try {
         const data = {
            nombre: values.nombre,
            entradilla: values.entradilla,
            articulo: articleContent,
         };

         if (add) {
            data.fecha = new Date()
               .toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
               })
               .split(",")[0];
         }

         if (selectedImage) {
            data.imagen = await uploadImageClient(selectedImage);
         }

         const payload = add
            ? { data }
            : { id: item.id, data, oldImageUrl: data.imagen ? item.data.imagen : undefined };

         const res = await fetch("/api/historias", {
            method: add ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
         });

         if (!res.ok) {
            throw new Error("La operación falló");
         }

         successMessage("Operación exitosa!");
         refresh?.();
         handleclose();
      } catch (e) {
         console.error(e);
         errorMessage("Algo salió mal, intente más tarde");
      }
   }

   return (
      <div id="crud-modal" className="modal-overlay">
         <div className="modal-card md:w-[70vw] md:max-w-[900px]">
            <div className="modal-header">
               <h3 className="modal-title">{add ? "Añadir Nueva" : "Modificar"}</h3>
               <button
                  onClick={() => handleclose()}
                  type="button"
                  className="modal-close"
                  data-modal-toggle="crud-modal"
               >
                  <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                     <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                     />
                  </svg>
                  <span className="sr-only">Close modal</span>
               </button>
            </div>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="modal-body"
            >
                  <div className="grid gap-4 mb-4 grid-cols-2">
                     <div className="col-span-2">
                        <label htmlFor="nombre" className="field-label">
                           Nombre
                        </label>
                        <input
                           type="text"
                           id="nombre"
                           className="field-input"
                           placeholder="Nombre"
                           {...register("nombre", { required: "El nombre es obligatorio" })}
                        ></input>
                        {errors.nombre && (
                           <p className="field-error">{errors.nombre.message}</p>
                        )}
                     </div>
                     <div className="col-span-2">
                        <label htmlFor="entradilla" className="field-label">
                           Entradilla{" "}
                           <span className="text-[11px] font-thin text-black">
                              * {`${entradilla.length}`} caracteres
                           </span>
                        </label>
                        <input
                           type="text"
                           id="entradilla"
                           className="field-input"
                           placeholder="min50-max160 caracteres"
                           {...register("entradilla", {
                              required: "La entradilla es obligatoria",
                              minLength: { value: 50, message: "Mínimo 50 caracteres" },
                              maxLength: { value: 160, message: "Máximo 160 caracteres" },
                           })}
                        ></input>
                        {errors.entradilla && (
                           <p className="field-error">{errors.entradilla.message}</p>
                        )}
                     </div>

                     <div className="col-span-2">
                        <label htmlFor="articulo" className="field-label">
                           Artículo
                        </label>
                        <RichTextEditor content={articleContent} onChange={setArticleContent} />
                     </div>

                     <div className="col-span-2">
                        <InputImg
                           add={add}
                           data={{
                              selectedImage,
                              setSelectedImage,
                           }}
                        />
                     </div>
                  </div>
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="btn-primary"
                  >
                     {isSubmitting ? "Guardando..." : "Guardar"}
                  </button>
            </form>
         </div>
      </div>
   );
}
