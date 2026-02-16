"use client";

import { ArrowDownFromLine, ArrowUpFromLine, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultViewProps {
    selectedPhoto: string;
    generatedPhoto: string;
    onStartOver: () => void;
}

function downloadImage(url: string, filename: string = "linkedin-foto-profissional.jpg") {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function ResultView({ selectedPhoto, generatedPhoto, onStartOver }: ResultViewProps) {
    const handleDownload = () => {
        downloadImage(generatedPhoto);
    };

    return (
        <main className="container mx-auto px-4 py-12 lg:py-16">
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                        Sua foto profissional
                    </h1>
                    <p className="text-muted-foreground">
                        Compare o antes e depois. Faça o download para usar no LinkedIn!
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Antes</p>
                        <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-border">
                            <img
                                src={selectedPhoto}
                                alt="Foto original"
                                className="aspect-4/5 w-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Depois</p>
                        <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-border">
                            <img
                                src={generatedPhoto}
                                alt="Foto profissional gerada"
                                className="aspect-4/5 w-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button
                        onClick={handleDownload}
                        size="lg"
                        className="gap-2"
                    >
                        <ArrowDownFromLine className="size-4" />
                        Baixar foto
                    </Button>
                    <Button
                        onClick={onStartOver}
                        variant="outline"
                        size="lg"
                        className="gap-2"
                    >
                        <RotateCcw className="size-4" />
                        Criar outra foto
                    </Button>
                </div>
            </div>
        </main>
    );
}
