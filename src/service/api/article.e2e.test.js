'use strict';

const {test, beforeAll, describe, expect} = require(`@jest/globals`);
const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const {HttpStatus} = require(`../../constants`);

const mockData = [{
  "id": `2IDu9K`,
  "title": `Нет, даже сценаристы не знают, какая из Бет – клон`,
  "createdDate": `2021-10-19T10:28:08.320Z`,
  "announce": `Простые ежедневные упражнения помогут достичь успеха.`,
  "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Достичь успеха помогут ежедневные повторения.Простые ежедневные упражнения помогут достичь успеха.`,
  "category": [`Кино`, `Программирование`, `Музыка`, `Деревья`],
  "comments": [{"id": `9Ir2BK`, "text": `Хочу такую же футболку :-)`}]
}, {
  "id": `GPD-Sh`,
  "title": `Рок — это протест`,
  "createdDate": `2021-11-18T08:21:09.714Z`,
  "announce": `Некоторые из самых забавных моментов в «Рике и Морти» происходят, когда Рик нападает на Джерри и оскорбляет его. Но фанатов ждет сюрприз (приятный, а может – и не очень), поскольку один из создателей сериала видит развитие отношений этих персонажей в дружбу.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.Простые ежедневные упражнения помогут достичь успеха.`,
  "fullText": `Из под его пера вышло 8 платиновых альбомов.Финал 4-го сезона «Рика и Морти» показал, что Рик не только выполнил предложенный Бет план клонирования, но и целенаправленно позаботился о том, чтобы даже самому не знать, какая из его дочерей настоящая, а какая была создана в лаборатории. Отвечая на вопрос о том, знают ли сами авторы, кто есть кто, Дэн Хармон сказал, что в настоящее время ответа у него нет.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Золотое сечение — соотношение двух величин, гармоническая пропорция.Он написал больше 30 хитов.`,
  "category": [`Рик и Морти`, `Без рамки`, `Железо`, `IT`, `Деревья`],
  "comments": [{
    "id": `cG9p_I`,
    "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
  }, {"id": `eK0SpO`, "text": `Совсем немного... Это где ж такие красоты?`}, {
    "id": `PBLOX9`,
    "text": `Мне кажется или я уже читал это где-то?`
  }, {"id": `eKszMu`, "text": `Планируете записать видосик на эту тему?`}]
}, {
  "id": `R--MMO`,
  "title": `Что такое золотое сечение`,
  "createdDate": `2021-10-29T20:41:09.484Z`,
  "announce": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  "fullText": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Из под его пера вышло 8 платиновых альбомов.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Первая большая ёлка была установлена только в 1938 году.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Финал 4-го сезона «Рика и Морти» показал, что Рик не только выполнил предложенный Бет план клонирования, но и целенаправленно позаботился о том, чтобы даже самому не знать, какая из его дочерей настоящая, а какая была создана в лаборатории. Отвечая на вопрос о том, знают ли сами авторы, кто есть кто, Дэн Хармон сказал, что в настоящее время ответа у него нет.Программировать не настолько сложно, как об этом говорят.Некоторые из самых забавных моментов в «Рике и Морти» происходят, когда Рик нападает на Джерри и оскорбляет его. Но фанатов ждет сюрприз (приятный, а может – и не очень), поскольку один из создателей сериала видит развитие отношений этих персонажей в дружбу.Ёлки — это не просто красивое дерево. Это прочная древесина.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Одна из не очень забавных вещей для поклонников «Рика и Морти» заключается в том, что выхода новых серий приходится ждать очень долго. Сериал не придерживается принятой схемы, когда новые сезоны выпускаются ежегодно. Чаще «Рик и Морти» выходит раз в два года. Во многом это происходило из-за того, что сценаристам требовалось много времени на разработку сюжета. К счастью, теперь динамика изменилась.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  "category": [`Программирование`, `IT`, `Кино`, `Железо`, `За жизнь`, `Деревья`, `Разное`, `Музыка`],
  "comments": [{
    "id": `joXej1`,
    "text": `Мне кажется или я уже читал это где-то? Это где ж такие красоты? Планируете записать видосик на эту тему?`
  }, {"id": `EPRY9K`, "text": `Хочу такую же футболку :-) Мне кажется или я уже читал это где-то?`}, {
    "id": `9Of4n8`,
    "text": `Совсем немного...`
  }]
}, {
  "id": `951Rhl`,
  "title": `Как достигнуть успеха не вставая с кресла`,
  "createdDate": `2021-10-08T04:05:37.931Z`,
  "announce": `Как начать действовать? Для начала просто соберитесь.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  "fullText": `Достичь успеха помогут ежедневные повторения.Финал 4-го сезона «Рика и Морти» показал, что Рик не только выполнил предложенный Бет план клонирования, но и целенаправленно позаботился о том, чтобы даже самому не знать, какая из его дочерей настоящая, а какая была создана в лаборатории. Отвечая на вопрос о том, знают ли сами авторы, кто есть кто, Дэн Хармон сказал, что в настоящее время ответа у него нет.Программировать не настолько сложно, как об этом говорят.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Простые ежедневные упражнения помогут достичь успеха.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Ёлки — это не просто красивое дерево. Это прочная древесина.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Он написал больше 30 хитов.Собрать камни бесконечности легко, если вы прирожденный герой.Некоторые из самых забавных моментов в «Рике и Морти» происходят, когда Рик нападает на Джерри и оскорбляет его. Но фанатов ждет сюрприз (приятный, а может – и не очень), поскольку один из создателей сериала видит развитие отношений этих персонажей в дружбу.Золотое сечение — соотношение двух величин, гармоническая пропорция.Из под его пера вышло 8 платиновых альбомов.`,
  "category": [`Железо`, `Рик и Морти`, `Деревья`, `Без рамки`, `IT`, `Программирование`, `Кино`],
  "comments": [{"id": `ZalTtc`, "text": `Мне кажется или я уже читал это где-то?`}, {
    "id": `aTgkiW`,
    "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`
  }, {
    "id": `d92n-D`,
    "text": `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`
  }]
}, {
  "id": `VmPZ-A`,
  "title": `Рик и Джерри могут стать друзьями`,
  "createdDate": `2021-10-05T03:34:12.281Z`,
  "announce": `Из под его пера вышло 8 платиновых альбомов.Он написал больше 30 хитов.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  "fullText": `Финал 4-го сезона «Рика и Морти» показал, что Рик не только выполнил предложенный Бет план клонирования, но и целенаправленно позаботился о том, чтобы даже самому не знать, какая из его дочерей настоящая, а какая была создана в лаборатории. Отвечая на вопрос о том, знают ли сами авторы, кто есть кто, Дэн Хармон сказал, что в настоящее время ответа у него нет.`,
  "category": [`Разное`, `Деревья`, `Музыка`, `Рик и Морти`],
  "comments": [{"id": `ZmXxGl`, "text": `Это где ж такие красоты? Совсем немного... Плюсую, но слишком много буквы!`}]
}];

const createAPI = async () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));

  app.use(express.json());
  article(app, new ArticleService(cloneData), new CommentService(cloneData));

  return app;
};

describe(`API returns articles list`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatus.ok));
  test(`Returns list of 5 articles`, () => expect(response.body.length).toBe(5));
});

describe(`API returns article by id`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .get(`/articles/GPD-Sh`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatus.ok));
  test(`Article's title is "Рок — это протест"`, () => expect(response.body.title).toBe(`Рок — это протест`));
});

describe(`API create an article`, () => {
  const newArticle = {
    title: `Test title`,
    announce: `Test announce text`,
    fullText: `Test full article text`,
    category: [`Test category a`, `Test category b`],
  };

  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpStatus.created));
  test(`Return article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article count is changed`, () => {
    return request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(6));
  });
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    title: `Test title`,
    announce: `Test announce text`,
    fullText: `Test full article text`,
    category: [`Test category a`, `Test category b`],
  };

  test(`Without any required property response code is 400`, async () => {
    const app = await createAPI();

    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpStatus.badRequest);
    }
  });
});

describe(`API update an article`, () => {
  const newArticle = {
    title: `Updated title`,
    announce: `Updated announce text`,
    fullText: `Updated full article text`,
    category: [`Updated category a`, `Updated category b`],
  };

  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`/articles/2IDu9K`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatus.ok));
  test(`Return changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article is changed`, () => {
    return request(app)
      .get(`/articles/2IDu9K`)
      .expect((res) => expect(res.body.title).toBe(`Updated title`));
  });
});

test(`API return 404 when trying to update non-existent article`, async () => {
  const newArticle = {
    title: `Updated title`,
    announce: `Updated announce text`,
    fullText: `Updated full article text`,
    category: [`Updated category a`, `Updated category b`],
  };

  const app = await createAPI();
  return request(app)
    .put(`/articles/NO-EXIST`)
    .send(newArticle)
    .expect(HttpStatus.notFound);
});

test(`API return 400 when trying to update with invalid data`, async () => {
  const newArticle = {
    announce: `No title article`,
    fullText: `No title article`,
    category: [`No title article`, `No title article`],
  };

  const app = await createAPI();
  return request(app)
    .put(`/articles/2IDu9K`)
    .send(newArticle)
    .expect(HttpStatus.badRequest);
});

describe(`API correctly deletes an article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/VmPZ-A`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatus.noContent));

  test(`Article count is 4`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4)));
});

test(`API refuses to delete non-existence article`, async () => {
  const app = await createAPI();
  return request(app)
    .delete(`/articles/NO-EXIST`)
    .expect(HttpStatus.notFound);
});

describe(`API returns comment list of article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .get(`/articles/GPD-Sh/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatus.ok));
  test(`Comments count is 4`, () => expect(response.body.length).toBe(4));
  test(`Comments list contain correct comments list`, () => {
    return expect(response.body)
      .toEqual(expect.arrayContaining([
        {"id": `cG9p_I`, "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`},
        {"id": `eK0SpO`, "text": `Совсем немного... Это где ж такие красоты?`},
        {"id": `PBLOX9`, "text": `Мне кажется или я уже читал это где-то?`},
        {"id": `eKszMu`, "text": `Планируете записать видосик на эту тему?`}
      ]));
  });
});

test(`API returns 404 on request comments of on-existent article`, async () => {
  const app = await createAPI();
  return request(app)
    .get(`/articles/NO-EXIST/comments`)
    .expect(HttpStatus.notFound);
});

describe(`API update an article comment`, () => {
  const newComment = {text: `Comment text`};

  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles/GPD-Sh/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpStatus.created));
  test(`API returns new comment`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));
  test(`Comments count is changed`, () => {
    return request(app)
      .get(`/articles/GPD-Sh/comments`)
      .expect((res) => expect(res.body.length).toBe(5));
  });
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = await createAPI();
  return request(app)
    .get(`/articles/GPD-Sh/comments/NO-EXIST`)
    .expect(HttpStatus.notFound);
});
