export function Hero() {
    return (
        <section className="space-y-8">
            <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight max-w-lg">
                    Fotos profissionais
                    <br />
                    para o linkedin
                </h1>

                <p className="max-w-xl text-base text-muted-foreground">
                    Transforme qualquer foto sua em um retrato profissional de alta qualidade
                    usando inteligência artificial. Perfeito para o seu perfil do LinkedIn.
                </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:justify-start">
                <div className="h-32 w-28 overflow-hidden rounded-3xl bg-muted -rotate-2">
                    <img
                        src="/foto1.jpg"
                        alt="Exemplo de retrato profissional 1"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="h-52 w-42 overflow-hidden rounded-3xl bg-muted">
                    <img
                        src="/foto2.jpg"
                        alt="Exemplo de retrato profissional 2"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="h-32 w-28 overflow-hidden rounded-3xl bg-muted rotate-2">
                    <img
                        src="/foto3.jpg"
                        alt="Exemplo de retrato profissional 3"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
