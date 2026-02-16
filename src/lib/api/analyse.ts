interface GeneratePhotoRequest {
    imageUrl: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
}

interface GeneratePhotoResponse {
    success: boolean;
    message: string;
    data: {
        originalIMage: string;
        generatedImage?: string;
        fileName?: string;
        fileSize?: number;
        fileType?: string;
        [key: string]: any;
    },
    error?: string;
}


export async function generateProfessionalPhoto(
    request: GeneratePhotoRequest
): Promise<GeneratePhotoResponse> {
    const response = await fetch('/api/analyse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error || 'Falha ao gerar a foto');
    }

    return response.json();
}