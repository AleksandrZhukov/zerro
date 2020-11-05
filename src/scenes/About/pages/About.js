/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { ExampleBox, Muted } from '../Components'
import { Link } from 'react-router-dom'
import wholeImg from './whole-screenshot.png'
import { Box } from '@material-ui/core'
import { Helmet } from 'react-helmet'

export function About() {
  return (
    <>
      <Helmet>
        <title>Что такое Zerro?</title>
        <meta
          name="description"
          content="Zerro помогает вести личный и семейный бюджет."
        />
      </Helmet>

      <h1>👋 Привет!</h1>
      <p>
        Zerro — это неофициальное приложение для{' '}
        <nobr>
          <a
            href="https://zenmoney.ru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Дзен-мани
          </a>
        </nobr>
        , оно помогает правильно планировать деньги.
      </p>

      <ExampleBox symbol="🖤">
        <p>
          Zerro — бесплатное, но вы всегда можете{' '}
          <a
            href="https://money.yandex.ru/to/4100110993756505"
            target="_blank"
            rel="noopener noreferrer"
          >
            купить мне кофе
          </a>
          .
          <br />
          <Muted>Обязательно напишите, что вам понравилось</Muted>
        </p>
      </ExampleBox>

      <p>
        <Box
          component="img"
          maxWidth="100%"
          borderRadius={8}
          border="1px solid rgba(0,0,0,0.08)"
          boxShadow="0 8px 32px 0 rgba(0,0,0,0.16)"
          src={wholeImg}
          alt="Примерно так выглядит интерфейс внутри"
        />
      </p>

      <h2>Что внутри?</h2>

      <h3>Бюджеты</h3>
      <p>
        Основное достоинство Zerro — бюджеты по типу конвертов. Если вы
        пользовались YNAB, знаете, как это круто. Прочитайте о подходе к
        бюджетам, чтобы лучше разобраться что к чему.
      </p>
      <p>
        <Link to="/about/method">Подход к бюджетам в Zerro</Link>
        <br />
        <Link to="/about/quick-start">Начало работы</Link>
      </p>

      <h3>Борьба с корректировками</h3>
      <p>
        Иногда после синхронизации с банком появляются дубли операций, чтобы их
        отловить:
      </p>
      <ol>
        <li>Откройте операцию-дубль</li>
        <li>Нажмите внизу «Выделить операции, изменённые в это же время»</li>
        <li>
          Теперь можете просмотреть эти операции и удалить, если потребуется
        </li>
      </ol>

      <h3>И ещё...</h3>
      <ul>
        <li>Восстановление удалённых операций</li>
        <li>Тёмная тема 🌚</li>
        <li>Групповые действия с операциями: смена категории и удаление.</li>
        <li>Полный бэкап всех данных (пока без восстановления)</li>
      </ul>

      <h2>Пара слов о безопасности</h2>
      <ExampleBox symbol="🔒">
        <p>
          У Zerro нет доступа к банковским подключениям. Эти данные хранятся на
          телефоне и не передаются через API, у сторонних сервисов просто нет
          доступа к ним.
          <br />
          <a
            href="https://github.com/zenmoney/ZenPlugins/wiki/ZenMoney-API"
            target="_blank"
            rel="noopener noreferrer"
          >
            Документация API
          </a>
        </p>
      </ExampleBox>
      <ul>
        <li>
          Zerro ничего не хранит у себя. Данные хранятся локально на вашем
          компьютере и в Дзенмани.
        </li>
        <li>
          Исходный код открыт и{' '}
          <a
            href="https://github.com/ardov/zerro"
            target="_blank"
            rel="noopener noreferrer"
          >
            лежит на GitHub
          </a>
          .
        </li>
        <li>
          Zerro собирает только анонимную статистику типа количества посещений,
          эти цифры греют мне душу 🙂
        </li>
      </ul>

      <h2>Полезные ссылки</h2>

      <ExampleBox symbol="💵">
        <p>
          <Link to="/about/method">Подход к бюджетам в Zerro</Link> →
          <br />
          <Muted>Как пользоваться бюджетами</Muted>
        </p>
      </ExampleBox>

      <ExampleBox symbol="🚀">
        <p>
          <Link to="/about/quick-start">Начало работы с Zerro</Link> →
          <br />
          <Muted>Эта инструкция поможет решить проблемы на старте</Muted>
        </p>
      </ExampleBox>

      <ExampleBox symbol="🔥">
        <p>
          <a
            href="https://t.me/zerroapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Канал с обновлениями в телеграме @zerroapp
          </a>{' '}
          →
          <br />
          <Muted>Обновления и фишки</Muted>
        </p>
      </ExampleBox>

      <ExampleBox symbol="💬">
        <p>
          <a
            href="https://t.me/zerrochat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Чат в телеграме @zerrochat
          </a>{' '}
          →
          <br />
          <Muted>
            Задавайте вопросы тут, или пишите{' '}
            <a
              href="http://t.me/ardov"
              target="_blank"
              rel="noopener noreferrer"
            >
              мне
            </a>{' '}
            напрямую
          </Muted>
        </p>
      </ExampleBox>
    </>
  )
}
