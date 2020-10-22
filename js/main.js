'use strict';

const NAMES = ['Антон', 'Сергей', 'Дима', 'Павел', 'Иван'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const COUNT = 25;

const fragment = document.createDocumentFragment();
const parentEl = document.querySelector('.pictures');
const templateEl = document.querySelector('#picture').content;

function generateNumber (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function generateArray () {
  const results = [];


}
