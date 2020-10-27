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
const NAMES_RANGE_START_NUMBER = 0;
const NAMES_RANGE_END_NUMBER = 5;
const MESSAGES_RANGE_START_NUMBER = 0;
const MESSAGES_RANGE_END_NUMBER = 5;
const AVATARS_RANGE_START_NUMBER = 1;
const AVATARS_RANGE_END_NUMBER = 6;
const LIKES_RANGE_START_NUMBER = 15;
const LIKES_RANGE_END_NUMBER = 200;
const COMMENTS_QUANTITY = 6;
const OBJECTS_QUANTITY = 25;
const fragment = document.createDocumentFragment();
const parentEl = document.querySelector(`.pictures`);
const templateEl = document.querySelector(`#picture`).content;
const bigPictureEl = document.querySelector(`.big-picture`);
const data = generateArray();

createDOMElements();
fillBigPicture();
bigPictureEl.classList.remove(`hidden`);
document.querySelector(`.social__comment-count`).classList.add(`hidden`);
document.querySelector(`.comments-loader`).classList.add(`hidden`);
document.body.classList.add(`modal-open`);


function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateArray() {
  const results = [];

  for (let i = 1; i <= OBJECTS_QUANTITY; i++) {
    results.push({
      url: `photos/${i}.jpg`,
      description: `описание фотографии`,
      likes: generateRandomNumber(LIKES_RANGE_START_NUMBER, LIKES_RANGE_END_NUMBER),
      comments: generateComments()
    });
  }

  return results;
}

function generateComments() {
  const comments = [];

  for (let i = 1; i <= COMMENTS_QUANTITY; i++) {
    const avatarIndex = generateRandomNumber(AVATARS_RANGE_START_NUMBER, AVATARS_RANGE_END_NUMBER);

    comments.push({
      avatar: `img/avatar-${avatarIndex}.svg`,
      message: getRandomArrayItem(MESSAGES, MESSAGES_RANGE_START_NUMBER, MESSAGES_RANGE_END_NUMBER),
      name: getRandomArrayItem(NAMES, NAMES_RANGE_START_NUMBER, NAMES_RANGE_END_NUMBER)
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

function getRandomArrayItem(array, start, end) {
  const randomIndex = generateRandomNumber(start, end);

  return array.find((item, index) => index === randomIndex);
}

function fillBigPicture() {
  const {url, likes, description, comments} = data[0];

  bigPictureEl.querySelector(`.big-picture__img`).setAttribute(`src`, url);
  bigPictureEl.querySelector(`.likes-count`).textContent = likes.length;
  bigPictureEl.querySelector(`.social__caption`).textContent = description;
  bigPictureEl.querySelector(`.comments-count`).textContent = comments.length;
  generateBigPictureCommentsLayout(comments);
  bigPictureEl.querySelector(`.social__comments`).appendChild(fragment);
}

function generateBigPictureCommentsLayout(array) {
  for (const comment of array) {
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
