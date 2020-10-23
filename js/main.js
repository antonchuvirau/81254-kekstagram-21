'use strict';

const names = [
  `Антон`,
  `Сергей`,
  `Дима`,
  `Павел`,
  `Иван`
];
const messages = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const namesRangeStartNumber = 0;
const namesRangeEndNumber = 5;
const messagesRangeStartNumber = 0;
const messagesRangeEndNumber = 5;
const avatarsRangeStartNumber = 1;
const avatarsRangeEndNumber = 6;
const likesRangeStartNumber = 15;
const likesRangeEndNumber = 200;
const commentsQuantity = 6;
const objectsQuantity = 25;
const fragment = document.createDocumentFragment();
const parentEl = document.querySelector(`.pictures`);
const templateEl = document.querySelector(`#picture`).content;
const bigPictureEl = document.querySelector(`.big-picture`);
const data = generateArray();

createDOMElements();
fillBigPicture();
showBigPicture();
document.body.classList.add(`modal-open`);


function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateArray() {
  const results = [];

  for (let i = 1; i <= objectsQuantity; i++) {
    results.push({
      url: `photos/${i}.jpg`,
      description: `описание фотографии`,
      likes: generateRandomNumber(likesRangeStartNumber, likesRangeEndNumber),
      comments: generateComments()
    });
  }

  return results;
}

function generateComments() {
  const comments = [];

  for (let i = 1; i <= commentsQuantity; i++) {
    const avatarIndex = generateRandomNumber(avatarsRangeStartNumber, avatarsRangeEndNumber);
    const messageIndex = generateRandomNumber(messagesRangeStartNumber, messagesRangeEndNumber);
    const nameIndex = generateRandomNumber(namesRangeStartNumber, namesRangeEndNumber);

    comments.push({
      avatar: `img/avatar-${avatarIndex}.svg`,
      message: getRandomArrayItem(messages, messageIndex),
      name: getRandomArrayItem(names, nameIndex)
    });
  }

  return comments;
}

function createDOMElements() {
  for (const item of data) {
    const pictureEl = fillDOMElement(templateEl.cloneNode(true), item);
    fragment.appendChild(pictureEl);
  }
  parentEl.appendChild(fragment);
}

function fillDOMElement(template, itemData) {
  const {url, description, comments, likes} = itemData;

  template.querySelector(`img`).setAttribute(`src`, url);
  template.querySelector(`img`).setAttribute(`alt`, description);
  template.querySelector(`.picture__comments`).textContent = comments.length;
  template.querySelector(`.picture__likes`).textContent = likes;

  return template;
}

function getRandomArrayItem(array, arrayItemIndex) {
  return array.find((item, index) => index === arrayItemIndex);
}

function showBigPicture() {
  bigPictureEl.classList.remove(`hidden`);
}

function fillBigPicture() {
  const {url, likes, description, comments} = data[0];

  bigPictureEl.querySelector(`.big-picture__img`).setAttribute(`src`, url);
  bigPictureEl.querySelector(`.likes-count`).textContent = likes.length;
  bigPictureEl.querySelector(`.social__caption`).textContent = description;
  bigPictureEl.querySelector(`.comments-count`).textContent = comments.length;
  bigPictureEl.querySelector(`.social__comments`).innerHTML = generateBigPictureCommentsLayout(comments);
}

function generateBigPictureCommentsLayout(array) {
  return array.map((item) => `<li class="social__comment">
    <img class="social__picture" src="${item.avatar}" alt="${item.name}" width="35" height="35">
    <p class="social__text">${item.message}</p>
  </li>`).join(``);
}
