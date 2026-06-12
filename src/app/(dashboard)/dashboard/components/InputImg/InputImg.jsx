"use client";

import Image from "next/image";
import styles from "./InputImg.module.css";
import { useState } from "react";

function InputImg({ data, add }) {
   const { selectedImage, setSelectedImage } = data;
   const [imgLocalPath, setImgLocalPath] = useState("");

   const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         setSelectedImage(file);

         const reader = new FileReader();
         reader.onloadend = () => {
            setImgLocalPath(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   return (
      <section className={styles.layout}>
         {imgLocalPath && (
            <div className={styles.boxWrapper}>
               <div className={styles.wrapper}>
                  <Image
                     src={imgLocalPath}
                     alt="Selected Image"
                     fill
                     style={{
                        objectFit: "contain",
                        objectPosition: "right",
                     }}
                  />
               </div>
            </div>
         )}

         <div className={styles.inputBox}>
            {/* If add, require image, if not, it is optional. */}
            {add ? (
               <input
                  className="block w-full text-sm text-grayFont file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-primaryColor/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primaryColor hover:file:bg-primaryColor/20"
                  type="file"
                  required
                  name="image"
                  id="image"
                  onChange={handleImageChange}
               />
            ) : (
               <input
                  className="block w-full text-sm text-grayFont file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-primaryColor/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primaryColor hover:file:bg-primaryColor/20"
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
               />
            )}
         </div>
      </section>
   );
}

export default InputImg;
