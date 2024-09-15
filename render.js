// Garantir que currentUser está acessível
if (typeof currentUser === 'undefined' || currentUser === null) {
    var currentUser = null;
  }
  
  // Dados padrão dos volumes
  const defaultVolumes = [
    { titulo: 'One Piece', volume: '1', imagem: 'assets/capaOnePieceVolUm.webp', rating: 0, possui: false },
    { titulo: 'One Piece', volume: '2', imagem: 'assets/capaOnePieceVolDois.webp', rating: 0, possui: false },
    { titulo: 'One Piece', volume: '3', imagem: 'assets/capaOnePieceVolTreswebp.webp', rating: 0, possui: false },
    { titulo: 'One Piece', volume: '4', imagem: 'assets/capaOnePieceVolQuatro.webp', rating: 0, possui: false },
    { titulo: 'One Piece', volume: '5', imagem: 'assets/capaOnePieceVolCinco.webp', rating: 0, possui: false },
  ];
  
  // Referência ao elemento volumeList
  const volumeList = document.getElementById('volume-list');
  
  // Função para salvar no Firestore
  function saveToFirestore(userId, data) {
    db.collection('users').doc(userId).set({
      volumes: data
    })
    .then(() => {
      console.log('Dados salvos com sucesso no Firestore!');
    })
    .catch((error) => {
      console.error('Erro ao salvar no Firestore: ', error);
    });
  }
  
  // Função para carregar do Firestore
  function loadFromFirestore(userId) {
    db.collection('users').doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data().volumes;
          renderVolumes(data);
        } else {
          // Se não houver dados, use os volumes padrão
          renderVolumes(defaultVolumes);
        }
      })
      .catch((error) => {
        console.error('Erro ao carregar do Firestore: ', error);
        renderVolumes(defaultVolumes);
      });
  }
  
  // Função para renderizar os volumes
  function renderVolumes(data) {
    volumeList.innerHTML = '';
    data.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('mb-4', 'p-4', 'rounded-lg', 'bg-gray-800', 'flex', 'flex-col', 'items-center');
  
      const img = document.createElement('img');
      img.src = item.imagem;
      img.alt = `Volume ${item.volume}`;
      img.classList.add('w-32', 'object-cover', 'rounded');
  
      const textContainer = document.createElement('div');
      textContainer.classList.add('text-center');
  
      const titleSpan = document.createElement('span');
      titleSpan.textContent = `Título: ${item.titulo}`;
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
            saveToFirestore(currentUser.uid, data);
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
          saveToFirestore(currentUser.uid, data);
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
  
  // Função para gerenciar os dados do usuário
  function handleUserData(user) {
    if (user) {
      currentUser = user;
      loadFromFirestore(user.uid);
    } else {
      currentUser = null;
      renderVolumes(defaultVolumes);
    }
  }
  
  // Renderiza inicialmente com os dados padrão
  renderVolumes(defaultVolumes);
  
  // Monitora o estado de autenticação
  firebase.auth().onAuthStateChanged((user) => {
    handleUserData(user);
  });
  