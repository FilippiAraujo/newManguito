        const defaultVolumes = [
            { serie: 'One Piece', titulo: 'One Piece', volume: '1', imagem: '/assets/capaOnePieceVolUm.webp', rating: 0, possui: false },
            { serie: 'One Piece', titulo: 'One Piece', volume: '2', imagem: '/assets/capaOnePieceVolDois.webp', rating: 0, possui: false },
            { serie: 'One Piece', titulo: 'One Piece', volume: '3', imagem: '/assets/capaOnePieceVolTreswebp.webp', rating: 0, possui: false },
            { serie: 'One Piece', titulo: 'One Piece', volume: '4', imagem: '/assets/capaOnePieceVolQuatro.webp', rating: 0, possui: false },
            { serie: 'One Piece', titulo: 'One Piece', volume: '5', imagem: '/assets/capaOnePieceVolCinco.webp', rating: 0, possui: false },
            { serie: 'One Piece', titulo: 'One Piece', volume: '6', imagem: '/assets/capaOnePieceVolSeis.webp', rating: 0, possui: false },
            { serie: 'Naruto', titulo: 'Naruto', volume: '1', imagem: '/assets/naruto/capaNarutoVolUm.webp', rating: 0, possui: false},
        ];

        function renderVolumes() {
            const gridView = document.getElementById('grid-view');
            const listView = document.getElementById('list-view');

            // Limpa o conteúdo atual das seções
            gridView.innerHTML = '';
            listView.innerHTML = '';

            // Gera os cards para a visualização em grade
            defaultVolumes.forEach(volume => {
                gridView.innerHTML += `
                    <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <img src="${volume.imagem}" alt="${volume.titulo} - Volume ${volume.volume}" class="rounded-lg w-32 h-48">
                        <div class="mt-3">
                            <h3 class="text-lg font-bold">${volume.titulo} - Volume ${volume.volume}</h3>
                            <p class="text-sm text-gray-400">${volume.serie}</p>
                        </div>
                    </div>
                `;

                // Gera os cards para a visualização em lista
                listView.innerHTML += `
                    <div class="bg-base-200 p-4 m-3 rounded-lg flex flex-row gap-6">
                        <p>${volume.titulo} - Volume ${volume.volume}</p>
                        <div class="rating">
                            <input type="radio" name="rating-${volume.volume}" class="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-${volume.volume}" class="mask mask-star-2 bg-orange-400" checked="checked" />
                            <input type="radio" name="rating-${volume.volume}" class="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-${volume.volume}" class="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-${volume.volume}" class="mask mask-star-2 bg-orange-400" />
                        </div>
                        <input type="checkbox" ${volume.possui ? 'checked' : ''} class="checkbox checkbox-success" />
                    </div>
                `;
            });
        }

        document.addEventListener("DOMContentLoaded", renderVolumes);
