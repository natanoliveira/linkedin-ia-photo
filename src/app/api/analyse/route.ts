import { NextRequest, NextResponse } from "next/server";
import z, { base64url, success } from "zod";

export const maxDuration = 60;

const analizeRequestShcema = z.object({
    imageUrl: z.string().min(1, 'Imagem url é obrigatório'),
    fileName: z.string().optional(),
    fileSize: z.number().optional(),
    fileType: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();

        // Validando os itens do body
        const validation = analizeRequestShcema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Imagem obrigatória'
                },
                {
                    status: 400
                }
            );
        }

        const { imageUrl, fileName, fileSize, fileType } = body;

        // Capturando somente o que e preciso para gerar a imagem como blob
        const base64Url = imageUrl.split(',')[1];
        const mimeType = imageUrl.match(/data:([^;]+);/)?.[1] || "image/jpeg";
        const buffer = Buffer.from(base64Url, 'base64');
        const blob = new Blob([buffer], { type: mimeType });

        const formData = new FormData();
        formData.append('data', blob, fileName);

        // development
        // const n8nUrl = 'https://natansousatech.app.n8n.cloud/webhook-test/50313e17-a3fd-48f0-b6db-d531cd567c48';

        // production
        const n8nUrl = 'https://natansousatech.app.n8n.cloud/webhook/50313e17-a3fd-48f0-b6db-d531cd567c48';

        const n8nRespose = await fetch(n8nUrl, {
            method: 'POST',
            body: formData,
        });

        if (!n8nRespose.ok) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Falha na requisição n8n.'
                },
                {
                    status: 400
                }
            );
        }

        const response = await n8nRespose.json();
        // console.log('REPOSTA N8N = ', response);

        const mockImage = 'https://v3b.fal.media/files/b/0a8e9726/jeBUSgzYLWldCRZXg7Vjr_7fc22e7bff82458b97c56eb5875453de.jpg';

        return NextResponse.json({
            success: true,
            message: 'Foto profissional gerada com sucesso',
            data: {
                originalImage: imageUrl,
                // generatedImage: mockImage,
                ...response,
                fileName,
                fileSize,
                fileType,
            }
        });


    } catch (error) {
        console.log('Falha api analyse');
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao analisar a imagem para geração de foto'
            },
            {
                status: 500
            }
        );
    }
}