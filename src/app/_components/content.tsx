"use client";

import { useState } from "react";
import { Header } from "./header";
import { Hero } from "./hero";
import { ResultView } from "./result-view";
import { UploadPhoto } from "./upload-photo";

type Step = "home" | "result";

export function HomeContent() {

    const [selectedPhoto, setSelectedPhoto] = useState<string | null>('');
    const [generatedPhoto, setGeneratedPhoto] = useState<string | null>('');
    const [step, setStep] = useState<Step>("home");

    const handlePhotoSelected = (photo: string) => {
        setSelectedPhoto(photo);
    };
    const handleContinue = (url: string) => {
        setGeneratedPhoto(url);
        setStep("result");
    }

    const handleStartOver = () => {
        setSelectedPhoto(null);
        setGeneratedPhoto(null);
        setStep("home");
    }

    if (step === "result" && selectedPhoto && generatedPhoto) {
        return (
            <>
                <Header />
                <ResultView
                    selectedPhoto={selectedPhoto}
                    generatedPhoto={generatedPhoto}
                    onStartOver={handleStartOver}
                />
            </>
        )
    }

    return (
        <>
            <Header />

            <main className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="flex items-center">
                        <Hero />
                    </div>

                    <div className="flex items-center justify-center lg:justify-end">
                        <UploadPhoto
                            onPhotoSelected={handlePhotoSelected}
                            onContinue={handleContinue}
                            selectedPhoto={selectedPhoto}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}