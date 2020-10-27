'use strict';

const NAMES = [
  `Антон`,
  `Сергей`,
  `Дима`,
  `Павел`,
  `Иван`
];
const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 6;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const COMMENTS_DATA_QUANTITY = 6;
const PICTURES_DATA_QUANTITY = 25;
const fragment = document.createDocumentFragment();
const picturesContainer = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content;
const bigPictureContainer = document.querySelector(`.big-picture`);

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generatePicturesData(quantity) {
  const results = [];

  for (let i = 1; i <= quantity; i++) {
    results.push({
      url: `photos/${i}.jpg`,
      description: `описание фотографии`,
      likes: generateRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
      comments: generateComments(COMMENTS_DATA_QUANTITY)
    });
  }

  return results;
}

function generateComments(commentsDataQuantity) {
  const comments = [];

  for (let i = 1; i <= commentsDataQuantity; i++) {
    const avatarIndex = generateRandomNumber(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT);

    comments.push({
      avatar: `img/avatar-${avatarIndex}.svg`,
      message: getRandomItem(MESSAGES),
      name: getRandomItem(NAMES)
    });
  }

  return comments;
}

function renderPictures(data, container) {
  for (const pictureData of data) {
    const pictureNode = createPictureElement(pictureTemplate, pictureData);
    fragment.appendChild(pictureNode);
  }
  container.appendChild(fragment);
}

function createPictureElement(template, data) {
  const {url, description, comments, likes} = data;
  const duplicatedPictureNode = template.cloneNode(true);

  duplicatedPictureNode.querySelector(`img`).setAttribute(`src`, url);
  duplicatedPictureNode.querySelector(`img`).setAttribute(`alt`, description);
  duplicatedPictureNode.querySelector(`.picture__comments`).textContent = comments.length;
  duplicatedPictureNode.querySelector(`.picture__likes`).textContent = likes;

  return duplicatedPictureNode;
}

function getRandomItem(array) {
  const randomIndex = generateRandomNumber(0, array.length);

  return array[randomIndex];
}

function renderBigPicture(data, container) {
  const {url, likes, description, comments} = data[0];

  container.querySelector(`.big-picture__img`).setAttribute(`src`, url);
  container.querySelector(`.likes-count`).textContent = likes.length;
  container.querySelector(`.social__caption`).textContent = description;
  container.querySelector(`.comments-count`).textContent = comments.length;
  renderBigPictureComments(comments);
  container.querySelector(`.social__comments`).appendChild(fragment);
}

function renderBigPictureComments(comments) {
  for (const comment of comments) {
    const li = createDOMElement(`li`, `social__comment`);
    const p = createDOMElement(`p`, `social__text`, comment.message);
    const img = createDOMElement(`img`, `social__picture`, ``, [
      {name: `src`, value: comment.avatar},
      {name: `alt`, value: comment.name},
      {name: `width`, value: 35},
      {name: `height`, value: 35}
    ]);
    li.appendChild(img);
    li.appendChild(p);
    fragment.appendChild(li);
  }
}

function createDOMElement(tagName, className = ``, text = ``, params = []) {
  const element = document.createElement(tagName);

  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.textContent = text;
  }
  if (params.length) {
    for (const item of params) {
      element.setAttribute(item.name, item.value);
    }
  }

  return element;
}

const picturesData = generatePicturesData(PICTURES_DATA_QUANTITY);
renderPictures(picturesData, picturesContainer);
renderBigPicture(picturesData, bigPictureContainer);
bigPictureContainer.classList.remove(`hidden`);
document.querySelector(`.social__comment-count`).classList.add(`hidden`);
document.querySelector(`.comments-loader`).classList.add(`hidden`);
document.body.classList.add(`modal-open`);
