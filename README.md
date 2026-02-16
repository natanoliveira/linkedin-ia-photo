## Linkfotos AI

Aplicação em Next.js para gerar **fotos profissionais para o LinkedIn** a partir de uma foto enviada pelo usuário, seguindo o padrão de estrutura definido em `/.cursor`.

### Visão geral da home

- **Header (`src/app/_components/header.tsx`)**
  - Altura fixa `h-16` com borda inferior.
  - Logo/título `Linkfotos AI` à esquerda.
  - Links de navegação à direita: **Como funciona** e **Exemplos**.

- **Hero (`src/app/_components/hero.tsx`)**
  - Título grande: “Fotos profissionais para o linkedin”.
  - Parágrafo explicando o serviço (uso de IA para gerar retratos profissionais).
  - Faixa com **3 exemplos de retratos** usando as imagens da pasta `public/`:
    - `foto1.jpg`, `foto2.jpg`, `foto3.jpg`.

- **Upload de foto (`src/app/_components/upload-photo.tsx`)**
  - Componente **client** (`"use client"`).
  - Área de upload é uma `div` clicável com borda tracejada:
    - Clique abre o seletor de arquivo (input `type="file"` escondido).
    - Suporta drag and drop (arrastar e soltar imagem na área).
  - Após selecionar/soltar uma imagem:
    - Mostra **preview** da foto.
    - Exibe ícone de **fechar (X)** para remover e escolher outra foto.
    - Mostra o botão **“Gerar foto profissional”**.

- **Orquestração da página (`src/app/_components/content.tsx`)**
  - Componente principal da página, seguindo o padrão de `_components` descrito em `/.cursor`.
  - Usa `useState` para controlar:
    - `selectedPhoto`: foto escolhida pelo usuário.
    - `generatedPhoto`: URL da foto profissional gerada (placeholder para a lógica futura).
  - Renderiza:
    - `Header` no topo.
    - Grid com duas colunas:
      - Esquerda: `Hero`.
      - Direita: `UploadPhoto` recebendo as props:
        - `onPhotoSelected(photo: string)`
        - `onContinue(url: string)`
        - `selectedPhoto`.

### Stack e padrões

- **Next.js App Router** em `src/app`.
- **Componentes por página** organizados em `_components`, conforme regras de `/.cursor/page-rules.mdc`.
- **Tailwind CSS** para layout e tipografia (arquivo principal em `src/app/globals.css`).
- **lucide-react** para ícones (`Upload`, `X`).

### Como rodar o projeto

Na raiz do projeto:

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` no navegador para acessar a interface da Linkfotos AI.

### Próximos passos sugeridos

- Implementar a lógica real de **geração de foto profissional** ao clicar no botão “Gerar foto profissional” (provavelmente via API/Server Action).
- Conectar o fluxo de `generatedPhoto` em `content.tsx` a um componente de **resultado** (preview antes/depois, download, etc.).
- Adicionar testes (Jest + React Testing Library) para os componentes `Header`, `Hero` e `UploadPhoto`, conforme recomendações de `/.cursor/rules.mdc`.
