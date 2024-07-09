const onePiece = [
    { titulo: 'One Piece', volume: '1', imagem: 'assets/capaOnePieceVolUm.webp', rating: 4 },
    { titulo: 'One Piece', volume: '2', imagem: 'assets/capaOnePieceVolDois.webp', rating: 5 },
    { titulo: 'One Piece', volume: '3', imagem: 'assets/capaOnePieceVolTreswebp.webp', rating: 5 },
    { titulo: 'One Piece', volume: '4', imagem: 'assets/capaOnePieceVolQuatro.webp', rating: 5 },


    // Adicione mais volumes aqui conforme necessário
];

// Função para salvar os dados no localStorage
function saveToLocalStorage(data) {
    localStorage.setItem('onePieceRatings', JSON.stringify(data));
}

// Função para carregar os dados do localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem('onePieceRatings');
    return data ? JSON.parse(data) : null;
}

// Carregar dados do localStorage se existirem
const savedData = loadFromLocalStorage();
if (savedData) {
    for (let i = 0; i < onePiece.length; i++) {
        if (savedData[i]) {
            onePiece[i].rating = savedData[i].rating;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const volumeList = document.getElementById('volume-list');

    onePiece.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('mb-4', 'p-4', 'border', 'border-gray-200', 'rounded-lg', 'shadow-md', 'bg-white', 'flex', 'flex-col', 'items-center');

        const img = document.createElement('img');
        img.src = item.imagem;
        img.alt = `Volume ${item.volume}`;
        img.classList.add('w-32', 'h-48', 'mb-4', 'object-cover', 'rounded');

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-center');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = `Title: ${item.titulo}`;
        titleSpan.classList.add('font-bold', 'block', 'text-lg', 'mb-1');

        const volumeSpan = document.createElement('span');
        volumeSpan.textContent = `Volume: ${item.volume}`;
        volumeSpan.classList.add('text-gray-600', 'block');

        textContainer.appendChild(titleSpan);
        textContainer.appendChild(volumeSpan);

        const ratingContainer = document.createElement('div');
        ratingContainer.classList.add('rating', 'flex', 'justify-center', 'mt-2');

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('input');
            star.type = 'radio';
            star.name = `rating-${index}`;
            star.classList.add('mask', 'mask-star-2', 'bg-orange-400');
            star.value = i;
            if (i === item.rating) {
                star.checked = true;
            }
            star.addEventListener('change', () => {
                onePiece[index].rating = i;
                saveToLocalStorage(onePiece);
                console.log(`Updated rating for ${item.titulo} Volume ${item.volume}: ${i}`);
            });
            ratingContainer.appendChild(star);
        }

        listItem.appendChild(img);
        listItem.appendChild(textContainer);
        listItem.appendChild(ratingContainer);

        volumeList.appendChild(listItem);
    });
});
