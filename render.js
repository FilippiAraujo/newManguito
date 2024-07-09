const onePiece = [
    { titulo: 'One Piece', volume: '1', imagem: 'assets/capaOnePieceVolUm.webp', rating: 5, possui: false },
    { titulo: 'One Piece', volume: '2', imagem: 'assets/capaOnePieceVolDois.webp', rating: 5, possui: false },
    { titulo: 'One Piece', volume: '3', imagem: 'assets/capaOnePieceVolTreswebp.webp', rating: 5, possui: false },
    { titulo: 'One Piece', volume: '4', imagem: 'assets/capaOnePieceVolQuatro.webp', rating: 5, possui: false },
];
const naruto = [
    { titulo: 'Naruto', volume: '1', imagem: 'url-da-imagem-1.jpg', rating: 0, possui: false },
    { titulo: 'Naruto', volume: '2', imagem: 'url-da-imagem-2.jpg', rating: 0, possui: false }
    // Adicione mais volumes conforme necessário
];

const volumeList = document.getElementById('volume-list');

document.getElementById('onePieceButton').addEventListener('click', () => {
    renderVolumes(onePiece);
});

document.getElementById('narutoButton').addEventListener('click', () => {
    renderVolumes(naruto);
});

function renderVolumes(data) {
    volumeList.innerHTML = '';
    data.forEach((item, index) => {
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
                data[index].rating = i;
                if (currentUser) {
                    saveToLocalStorage(currentUser, data);
                }
            });
            ratingContainer.appendChild(star);
        }

        const possessContainer = document.createElement('div');
        possessContainer.classList.add('flex', 'items-center', 'mt-2');

        const possessLabel = document.createElement('label');
        possessLabel.classList.add('mr-2');
        possessLabel.textContent = 'Possui:';

        const possessCheckbox = document.createElement('input');
        possessCheckbox.type = 'checkbox';
        possessCheckbox.checked = item.possui;
        possessCheckbox.className = 'checkbox checkbox-success';
        possessCheckbox.addEventListener('change', () => {
            data[index].possui = possessCheckbox.checked;
            if (currentUser) {
                saveToLocalStorage(currentUser, data);
            }
        });

        possessContainer.appendChild(possessLabel);
        possessContainer.appendChild(possessCheckbox);

        listItem.appendChild(img);
        listItem.appendChild(textContainer);
        listItem.appendChild(ratingContainer);
        listItem.appendChild(possessContainer);

        volumeList.appendChild(listItem);
    });
}

function saveToLocalStorage(username, data) {
    localStorage.setItem(`onePieceRatings_${username}`, JSON.stringify(data));
}

function loadFromLocalStorage(username) {
    const data = localStorage.getItem(`onePieceRatings_${username}`);
    return data ? JSON.parse(data) : null;
}

function loadUserData(username) {
    const userData = loadFromLocalStorage(username) || onePiece;
    renderVolumes(userData);
}
