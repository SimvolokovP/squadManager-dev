const players = document.getElementById('players');
const positionBoxes = document.querySelectorAll('.app__position');
const subs = document.getElementById('subs');

const tabBtns = document.querySelectorAll('.tactic__btn');
const tabContent = document.querySelectorAll('.tactic');

const modalName = document.getElementById('modalName');
const modalNumber = document.getElementById('modalNumber');
const modalCapitan = document.getElementById('modalCapitan');
const addImage = document.getElementById('addImage');
const addPlayerBtn = document.querySelector('.modal__create');

addPlayerBtn.addEventListener('click', () => {
    if (modalName.value !== '' && modalNumber.value != '') {
        console.log('aaa')
        addPlayerToLayout();
    } else {
        alert('error');
    }
});

tabBtns.forEach(function(element) {
    element.addEventListener('click', createTactic);
});

const modalContainer = document.getElementById('modalContainer');

function createTactic(evt) {
    const tabTarget = evt.currentTarget;
    const button = tabTarget.dataset.button;

    tabBtns.forEach(function(item) {
        item.classList.remove('tab__btn-active')
    });

    tabContent.forEach(function(item) {
        item.classList.remove('active')

        if (item.id == button) {
            item.classList.add('active');
        }
    });
    
}

function openModal() {
    modalContainer.classList.add('open');
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalContainer.classList.remove('open');
    }
});

modalContainer.querySelector('.modal').addEventListener('click', event => {
    event._isClickWithInModal = true;
});

modalContainer.addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});

modalContainer.querySelector('.modal__close').addEventListener('click', () => {
    modalContainer.classList.remove('open');
});

let selectedImageUrl = ''; // Глобальная переменная для хранения выбранного изображения

addImage.addEventListener('click', function() {
    const imageUpload = document.getElementById('imageUpload');
    imageUpload.click();

    imageUpload.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            selectedImageUrl = event.target.result; // Сохраняем выбранное изображение
        };

        reader.readAsDataURL(file);
    };
});

function addPlayerToLayout() {
    const defaultImageUrl = '../img/default.png'; // Path to your default image

    const imageUrl = selectedImageUrl ? selectedImageUrl : defaultImageUrl;

    const player = document.createElement('div');
    const imageBox = document.createElement('div');
    imageBox.classList.add('player__img');
    const image = document.createElement('img');
    image.src = imageUrl; // Set selected image or default image
    const nameBox = document.createElement('div');
    nameBox.classList.add('player__name');
    const name = document.createElement('div');
    name.classList.add('player__name--name');
    const number = document.createElement('div');
    number.classList.add('player__name--number');
    const isCapitan = document.createElement('div');
    isCapitan.classList.add('player__name--capitan');
    player.classList.add('app__player');
    player.classList.add('player');
    player.classList.add('sub');
    player.draggable = true;

    name.innerText = modalName.value;
    number.innerText = modalNumber.value;

    imageBox.append(image);
    nameBox.append(number, name);


    player.append(imageBox, nameBox);
    player.addEventListener("dragstart", dragStart);
    player.addEventListener("dragend", dragEnd);

    subs.appendChild(player);

    // Reset selected image
    selectedImageUrl = '';
}

function dragStart() {
    thisPlayer = this;
    setTimeout(() => {
      this.style.display = "none";
    }, 0);
    console.log("dragStart");
}
  
function dragEnd() {
    thisPlayer = null;
    setTimeout(() => {
    this.style.display = "flex";
    }, 0);
    console.log("dragEnd");
}

positionBoxes.forEach((box) => {
    box.addEventListener("dragover", dragOver);
    box.addEventListener("dragenter", dragEnter);
    box.addEventListener("dragleave", dragLeave);
    box.addEventListener("drop", dragDrop);
});

function dragOver(e) {
    e.preventDefault();
}
  
  function dragEnter() {
    this.style.border = "1px dashed #ccc";
    console.log("dragEnter");
}
  
  function dragLeave() {
    this.style.border = "none";
    console.log("dragLeave");
}
  
function dragDrop() {
    this.style.border = "none";
    if (this.children.length > 0) {
        console.log(this.children)
        const previousPlayer = this.children[0];
        // Убираем предыдущего игрока с позиции
        subs.appendChild(previousPlayer);
        previousPlayer.classList.add('sub');
    };
    thisPlayer.classList.remove('sub');
    this.appendChild(thisPlayer);
    getPositionStyle(this);
}

function getPositionStyle(position) {
    console.log(position)
    const allPosition = document.querySelectorAll('.position');

    allPosition.forEach(item => {
        if (item.children.length === 0) {
            item.style.backgroundImage = 'url(../img/player2.png)';
        } else {
            item.style.backgroundImage = 'none';
        }
    })
}

