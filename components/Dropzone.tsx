"use client"

import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import DropzoneComponent from 'react-dropzone'

function Dropzone() {

    const [loading, setLoading] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser();

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(uploadPost);
    };
    

    const uploadPost = async (selectedFile: File) => {
        if (loading) return;
        if (!user) return;

        setLoading(true);

        try {

            // addDoc -> users/<user>/files
            const docRef = await addDoc(collection(db, "users", user.id, "files"), {
                userId: user.id,
                fileName: selectedFile.name,
                fullName: user.fullName,
                profileImag: user.imageUrl,
                timestamp: serverTimestamp(),
                type: selectedFile.type,
                size: selectedFile.size,
            })

            const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
            
            uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
                const downloadURL = await getDownloadURL(imageRef);
                
                await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
                    downloadURL: downloadURL,
                });
            });
        
        } catch (error) {
            console.error("Error uploading file: ", error);
        }

        setLoading(false);
    };

    // Max file size 20MB
    const maxSize = 20971520;

    return (
        <DropzoneComponent 
            minSize={0} 
            maxSize={maxSize} 
            onDrop={onDrop}
        >
            {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                fileRejections
            }) => {
                
                const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

                return (
                <section className="m-4">
                    <div {...getRootProps()}
                        className={cn(
                            "w-full h-52 flex jusify-center items-center p-5 border border-dashed rounded-lg text-center",
                            isDragActive 
                                ? "bg-[#035FFE] text-white animate-pulse"
                                : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                        )}
                    >
                        <input {...getInputProps()} />
                        {!isDragActive && "Click here or drop a file to upload!"}
                        {isDragActive && !isDragReject && "Drop to upload this file!"}
                        {isDragReject && "File type not accepted, sorry!"}
                        {isFileTooLarge && (
                            <div className="text-danger mt-2">File is too large.</div>
                        )}
                    </div>
                </section>
            )}}
        </DropzoneComponent>
    )
}

export default Dropzone