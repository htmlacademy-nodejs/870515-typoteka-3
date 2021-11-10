'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const SearchService = require(`../data-service/search`);
const {HttpStatus} = require(`../../constants`);

const mockData = [{
  "id": `r0pE43`,
  "title": `Рок — это протест`,
  "createdDate": `2021-10-10T01:24:16.869Z`,
  "announce": `Финал 4-го сезона «Рика и Морти» показал, что Рик не только выполнил предложенный Бет план клонирования, но и целенаправленно позаботился о том, чтобы даже самому не знать, какая из его дочерей настоящая, а какая была создана в лаборатории. Отвечая на вопрос о том, знают ли сами авторы, кто есть кто, Дэн Хармон сказал, что в настоящее время ответа у него нет.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Простые ежедневные упражнения помогут достичь успеха.`,
  "fullText": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Некоторые из самых забавных моментов в «Рике и Морти» происходят, когда Рик нападает на Джерри и оскорбляет его. Но фанатов ждет сюрприз (приятный, а может – и не очень), поскольку один из создателей сериала видит развитие отношений этих персонажей в дружбу.Одна из не очень забавных вещей для поклонников «Рика и Морти» заключается в том, что выхода новых серий приходится ждать очень долго. Сериал не придерживается принятой схемы, когда новые сезоны выпускаются ежегодно. Чаще «Рик и Морти» выходит раз в два года. Во многом это происходило из-за того, что сценаристам требовалось много времени на разработку сюжета. К счастью, теперь динамика изменилась.Достичь успеха помогут ежедневные повторения.Это один из лучших рок-музыкантов.Первая большая ёлка была установлена только в 1938 году.Из под его пера вышло 8 платиновых альбомов.Он написал больше 30 хитов.`,
  "category": [`Без рамки`, `IT`, `Разное`],
  "comments": [{
    "id": `zWfrhB`,
    "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты?`,
  }],
}, {
  "id": `G5g2jc`,
  "title": `Борьба с прокрастинацией`,
  "createdDate": `2021-10-25T05:21:16.238Z`,
  "announce": `Одна из не очень забавных вещей для поклонников «Рика и Морти» заключается в том, что выхода новых серий приходится ждать очень долго. Сериал не придерживается принятой схемы, когда новые сезоны выпускаются ежегодно. Чаще «Рик и Морти» выходит раз в два года. Во многом это происходило из-за того, что сценаристам требовалось много времени на разработку сюжета. К счастью, теперь динамика изменилась.`,
  "fullText": `Программировать не настолько сложно, как об этом говорят.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Он написал больше 30 хитов.Это один из лучших рок-музыкантов.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Собрать камни бесконечности легко, если вы прирожденный герой.Достичь успеха помогут ежедневные повторения.Первая большая ёлка была установлена только в 1938 году.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Как начать действовать? Для начала просто соберитесь.Финал 4-го сезона «Рика и Морти» показал, что Рик не только выполнил предложенный Бет план клонирования, но и целенаправленно позаботился о том, чтобы даже самому не знать, какая из его дочерей настоящая, а какая была создана в лаборатории. Отвечая на вопрос о том, знают ли сами авторы, кто есть кто, Дэн Хармон сказал, что в настоящее время ответа у него нет.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Некоторые из самых забавных моментов в «Рике и Морти» происходят, когда Рик нападает на Джерри и оскорбляет его. Но фанатов ждет сюрприз (приятный, а может – и не очень), поскольку один из создателей сериала видит развитие отношений этих персонажей в дружбу.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  "category": [`Кино`, `Железо`],
  "comments": [{"id": `rHlsnT`, "text": `Плюсую, но слишком много буквы!`}, {
    "id": `BPQv3J`,
    "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
  }, {"id": `-s7sIm`, "text": `Мне кажется или я уже читал это где-то? Согласен с автором!`}],
}, {
  "id": `cCW9Xy`,
  "title": `Лучше рок-музыканты 20-века`,
  "createdDate": `2021-10-19T07:43:13.595Z`,
  "announce": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  "fullText": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Ёлки — это не просто красивое дерево. Это прочная древесина.Финал 4-го сезона «Рика и Морти» показал, что Рик не только выполнил предложенный Бет план клонирования, но и целенаправленно позаботился о том, чтобы даже самому не знать, какая из его дочерей настоящая, а какая была создана в лаборатории. Отвечая на вопрос о том, знают ли сами авторы, кто есть кто, Дэн Хармон сказал, что в настоящее время ответа у него нет.Золотое сечение — соотношение двух величин, гармоническая пропорция.Собрать камни бесконечности легко, если вы прирожденный герой.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Из под его пера вышло 8 платиновых альбомов.`,
  "category": [`Железо`, `Музыка`],
  "comments": [{"id": `pQVR2S`, "text": `Совсем немного...`}, {
    "id": `xcMH_I`,
    "text": `Хочу такую же футболку :-) Плюсую, но слишком много буквы!`,
  }, {"id": `AM4Qck`, "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`}, {
    "id": `Wsk84z`,
    "text": `Согласен с автором! Планируете записать видосик на эту тему? Это где ж такие красоты?`,
  }],
}, {
  "id": `TyKF2Z`,
  "title": `Учим HTML и CSS`,
  "createdDate": `2021-08-20T22:07:29.044Z`,
  "announce": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Первая большая ёлка была установлена только в 1938 году.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Как начать действовать? Для начала просто соберитесь.`,
  "fullText": `Собрать камни бесконечности легко, если вы прирожденный герой.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.Ёлки — это не просто красивое дерево. Это прочная древесина.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Одна из не очень забавных вещей для поклонников «Рика и Морти» заключается в том, что выхода новых серий приходится ждать очень долго. Сериал не придерживается принятой схемы, когда новые сезоны выпускаются ежегодно. Чаще «Рик и Морти» выходит раз в два года. Во многом это происходило из-за того, что сценаристам требовалось много времени на разработку сюжета. К счастью, теперь динамика изменилась.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Финал 4-го сезона «Рика и Морти» показал, что Рик не только выполнил предложенный Бет план клонирования, но и целенаправленно позаботился о том, чтобы даже самому не знать, какая из его дочерей настоящая, а какая была создана в лаборатории. Отвечая на вопрос о том, знают ли сами авторы, кто есть кто, Дэн Хармон сказал, что в настоящее время ответа у него нет.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Простые ежедневные упражнения помогут достичь успеха.Достичь успеха помогут ежедневные повторения.Он написал больше 30 хитов.Программировать не настолько сложно, как об этом говорят.Первая большая ёлка была установлена только в 1938 году.Из под его пера вышло 8 платиновых альбомов.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Как начать действовать? Для начала просто соберитесь.Это один из лучших рок-музыкантов.`,
  "category": [`За жизнь`, `Без рамки`, `Деревья`, `Разное`, `Программирование`, `Рик и Морти`, `IT`],
  "comments": [{"id": `p5yaAb`, "text": `Хочу такую же футболку :-)`}],
}, {
  "id": `r5y0rc`,
  "title": `Лучше рок-музыканты 20-века`,
  "createdDate": `2021-10-28T13:06:18.091Z`,
  "announce": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Простые ежедневные упражнения помогут достичь успеха.Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  "fullText": `Достичь успеха помогут ежедневные повторения.Некоторые из самых забавных моментов в «Рике и Морти» происходят, когда Рик нападает на Джерри и оскорбляет его. Но фанатов ждет сюрприз (приятный, а может – и не очень), поскольку один из создателей сериала видит развитие отношений этих персонажей в дружбу.Программировать не настолько сложно, как об этом говорят.Он написал больше 30 хитов.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  "category": [`Программирование`, `Рик и Морти`, `Железо`, `Деревья`, `IT`],
  "comments": [{"id": `Xzz6nU`, "text": `Это где ж такие красоты?`}, {
    "id": `3iTPhb`,
    "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
  }, {
    "id": `114z9N`,
    "text": `Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
  }, {
    "id": `qOu7DM`,
    "text": `Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-)`,
  }],
}];

const createAPI = async () => {
  const app = express();
  app.use(express.json());
  search(app, new SearchService(mockData));

  return app;
};

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/search`)
      .query({query: `Рок — это протест`});
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatus.ok));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`r0pE43`));
});
