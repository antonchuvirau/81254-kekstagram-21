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
const picturesRootEl = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content;
const bigPictureEl = document.querySelector(`.big-picture`);

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generatePicturesArray(picturesQuantity) {
  const results = [];

  for (let i = 1; i <= picturesQuantity; i++) {
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
      message: getRandomArrayItem(MESSAGES),
      name: getRandomArrayItem(NAMES)
    });
  }

  return comments;
}

function createPictureElement(pictureTemplate, pictureObject) {
  const {url, description, comments, likes} = pictureObject;

  pictureTemplate.querySelector(`img`).setAttribute(`src`, url);
  pictureTemplate.querySelector(`img`).setAttribute(`alt`, description);
  pictureTemplate.querySelector(`.picture__comments`).textContent = comments.length;
  pictureTemplate.querySelector(`.picture__likes`).textContent = likes;

  return pictureTemplate;
}

function renderPictures(picturesArray, picturesRootEl) {
  for (const pictureObject of picturesArray) {
    const pictureElement = createPictureElement(pictureTemplate, pictureObject);
    fragment.appendChild(pictureElement);
  }
  picturesRootEl.appendChild(fragment);
}

function getRandomArrayItem(array) {
  const randomIndex = generateRandomNumber(0, array.length);

  return array[randomIndex];
}

function renderBigPicture(picturesArray) {
  const {url, likes, description, comments} = picturesArray[0];

  bigPictureEl.querySelector(`.big-picture__img`).setAttribute(`src`, url);
  bigPictureEl.querySelector(`.likes-count`).textContent = likes.length;
  bigPictureEl.querySelector(`.social__caption`).textContent = description;
  bigPictureEl.querySelector(`.comments-count`).textContent = comments.length;
  renderBigPictureComments(comments);
  bigPictureEl.querySelector(`.social__comments`).appendChild(fragment);
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
renderPictures(pictures, picturesRootEl);
renderBigPicture(picturesArray);
bigPictureEl.classList.remove(`hidden`);
document.querySelector(`.social__comment-count`).classList.add(`hidden`);
document.querySelector(`.comments-loader`).classList.add(`hidden`);
document.body.classList.add(`modal-open`);
