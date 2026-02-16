"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { generateProfessionalPhoto } from "@/lib/api/analyse";
import { useMutation } from "@tanstack/react-query";

interface UploadPhotoProps {
    onPhotoSelected: (photo: string) => void;
    onContinue: (url: string) => void;
    selectedPhoto: string | null;
}

export function UploadPhoto({ onPhotoSelected, onContinue, selectedPhoto }: UploadPhotoProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string>("");
    const [fileSize, setFileSize] = useState<number>(0);
    const [fileType, setFileType] = useState<string>("");
    const [isPeding, startTransition] = useTransition();

    const generateMutation = useMutation({
        mutationFn: generateProfessionalPhoto,
        onSuccess: (response) => {
            if (response.data?.generatedImage) {
                // URL da imagem gerada
                onContinue(response.data?.generatedImage);
            }
        },
        onError: (error: Error) => {
            console.log('Falha na mutação', error);
        },
    });

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setFileName(file.name);
            setFileSize(file.size);
            setFileType(file.type);

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    // console.log(e.target?.result);
                    // Receber o base64 da imagem
                    onPhotoSelected(e.target?.result as string ?? '');
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleGeneratePhoto = async () => {
        if (!selectedPhoto) return;

        // Mock para testar o botão sendo desabilitado ao disparar a requisição.
        // startTransition(async () => {
        //     // Mock: aguarda 3 segundos para visualizar o loading/disabled
        //     await new Promise((resolve) => setTimeout(resolve, 3000));
        //     // Mock: usa a foto selecionada como "gerada" para testar o fluxo
        //     onContinue(selectedPhoto);
        // });

        // Código original (comentar o mock acima e descomentar para usar a API):
        try {
            startTransition(async () => {
                await generateMutation.mutateAsync({
                    imageUrl: selectedPhoto,
                    fileName: fileName,
                    fileSize: fileSize,
                    fileType: fileType,
                });
            });
        } catch (error) {
            console.error('Erro ao gerar a foto', error);
        }
    };


    const handleClearFile = () => {
        setFileName('');
        setFileSize(0);
        setFileType('');
        onPhotoSelected('');
    };

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setFileSize(file.size);
            setFileType(file.type);

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    onPhotoSelected(e.target?.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <section className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-sm">
            <div className="space-y-1">
                <h2 className="text-3xl font-semibold">Envie sua foto</h2>
                <p className="text-sm text-muted-foreground">
                    Escolha uma foto sua para transformar em um retrato profissional.
                    Funciona melhor com fotos onde seu rosto está bem visível.
                </p>
            </div>

            <div className="mt-6 space-y-4">
                {/* <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="bg-red-50 absolute w-full h-full inset-0 cursor-pointer"
                    onChange={handleSelectFile}
                /> */}
                <div
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    role="button"
                    tabIndex={0}
                    className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-muted-foreground/40 bg-muted/40 px-6 py-10 text-center transition-all duration-200 hover:border-muted-foreground/70 hover:bg-muted ${isDragging ? "border-muted-foreground/70 bg-muted" : ""}`}
                >
                    {selectedPhoto ? (
                        <div className="relative w-full max-w-[260px] overflow-hidden rounded-2xl">
                            <img
                                src={selectedPhoto}
                                alt="Pré-visualização da foto selecionada"
                                className="h-48 w-full object-cover"
                            />

                            <button
                                onClick={handleClearFile}
                                className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white shadow-sm transition hover:bg-black z-10"
                                aria-label="Remover foto selecionada"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>

                    ) : (
                        <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                                <Upload className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    Arraste sua foto aqui ou clique para selecionar
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG ou WEBP</p>
                            </div>
                        </>
                    )}

                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        className="bg-red-50 w-full h-full absolute inset-0 cursor-pointer opacity-0"
                        onChange={handleSelectFile}
                    />

                </div>

                {selectedPhoto && (
                    <button
                        type="button"
                        onClick={handleGeneratePhoto}
                        disabled={isPeding}
                        className="inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black/90 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                        {isPeding ? (<><Loader2 className="h-4 w-4 animate-spin ml-1" /> Gerando</>) : 'Gerar foto profissional'}
                    </button>
                )
                }
            </div>
        </section >
    );
}
