"use client";
import { faClose, faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@radix-ui/themes"
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function ImageUpload({
    name,
    icon,
    defaultValue
}: {
    name: string,
    icon: IconDefinition,
    defaultValue: string,
}) {
    const fileInRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
    const [uploadedImage, setUploadedImage] = useState<string>(defaultValue);

    async function upload(e: ChangeEvent<HTMLInputElement>): Promise<void> {
        console.log("Event fire");
        setImageUploadLoading(true);
        setUploadedImage('');
        if (error != null) setError(null);
        const uploadedFile = e.target as HTMLInputElement;
        if (uploadedFile && uploadedFile?.files?.length && uploadedFile.files.length > 0) {
            const file = uploadedFile.files[0];
            const data = new FormData;
            data.set('file', file);
            const response = await axios.post('/api/upload', data);
            if (response?.data?.error) {
                setImageUploadLoading(false);
                setError('Error while uploading image, please try again.');
            } else {
                setUploadedImage(response.data);
            }
        }
    }

    useEffect(() => {
        if (uploadedImage != '') {
            setImageUploadLoading(false);
        }
    }, [uploadedImage]);

    return (
        <>
            <div className="bg-gray-100 border rounded-md size-32 inline-flex items-center content-center justify-center relative">
                {!error && !imageUploadLoading && !uploadedImage && <FontAwesomeIcon icon={icon} className="gray-400 " />}
                {!error && imageUploadLoading && <FontAwesomeIcon icon={faSpinner} className="text-gray-400 animate-spin" />}
                {error && (<div className="bg-red-200 w-full flex justify-between px-2  gap-3 rounded-md absolute top-0 left-0 size-32">
                    <span className="text-xs text-red-500 py-4">{error}</span>
                    <FontAwesomeIcon icon={faClose} onClick={() => setError(null)} className="h-3 py-2 cursor-pointer" />
                </div>
                )}
                {!error && (!imageUploadLoading) && uploadedImage && (
                    <Image
                        src={uploadedImage}
                        width={1024}
                        height={1024}
                        onLoadingComplete={() => setImageUploadLoading(false)}
                        className="w-auto h-auto max-w-31 rounded-md max-h-31 aspect-square"
                        alt={uploadedImage}
                    />
                )}
            </div>
            <div className="mt-2 *:cursor-pointer">
                <input type="hidden" value={uploadedImage} name={name} />
                <input
                    type="file"
                    onChange={(e) => upload(e)}
                    ref={fileInRef}
                    className="hidden"
                />
                <Button
                    type="button"
                    onClick={() => fileInRef.current?.click()}
                    variant="soft"
                >
                    Select File
                </Button>
            </div>
        </>
    )
}