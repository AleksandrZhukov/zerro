import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from 'helpers/format'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import styled, { css } from 'styled-components'
import { getTotalsByMonth } from '../selectors/getTotalsByMonth'
import { getUserCurrencyCode } from 'store/serverData'
import { Droppable } from 'react-beautiful-dnd'
import Confirm from 'components/Confirm'
import {
  copyPreviousBudget,
  fillGoals,
  startFresh,
  fixOverspends,
} from '../thunks'

const getMonthName = date => format(date, 'LLL', { locale: ru }).toLowerCase()

const Body = styled.div`
  position: relative;
  min-width: 0;
  max-height: 90vh;
  padding: 112px 16px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`

const ToBeBudgeted = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
  left: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 104px;
  padding: 16px;
  background: linear-gradient(
      105.52deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 100%
    ),
    #cc1414;
  border-radius: 6px;
  box-shadow: 0 8px 16px rgba(204, 20, 20, 0.3);
  transition: 0.4s;

  ${props =>
    props.positive &&
    css`
      background: linear-gradient(
          105.67deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.3) 100%
        ),
        #21a355;
      box-shadow: 0 8px 16px rgba(33, 163, 85, 0.3);
    `}
`

const Amount = styled.div`
  color: #fff;
  font-weight: normal;
  font-size: 32px;
  line-height: 40px;
`

const Text = styled.div`
  color: #fff;
`
export default function BudgetInfo({ index, ...rest }) {
  const currency = useSelector(getUserCurrencyCode)
  const totals = useSelector(state => getTotalsByMonth(state)[index])
  const {
    date,
    available,
    prevOverspent,
    toBeBudgeted,
    funds,
    overspent,
    income,
    prevFunds,
    transferOutcome,
    transferFees,
    realBudgetedInFuture,
    budgeted,
    moneyInBudget,
    budgetedInFuture,
    outcome,
  } = totals

  const [opened, setOpened] = useState(false)
  const formatSum = sum => formatMoney(sum, currency)
  const dispatch = useDispatch()

  return (
    <Body {...rest}>
      <Droppable droppableId="toBeBudgeted" type="FUNDS">
        {({ innerRef, placeholder }) => (
          <ToBeBudgeted positive={toBeBudgeted >= 0} ref={innerRef}>
            <span style={{ display: 'none' }}>{placeholder}</span>

            <Amount>{formatSum(toBeBudgeted)}</Amount>
            <Text onClick={() => setOpened(!opened)}>
              Осталось распределить
            </Text>
          </ToBeBudgeted>
        )}
      </Droppable>
      <Line
        name={`Доход за ${getMonthName(date)}`}
        amount={income}
        currency={currency}
      />
      <Line
        name={`Остаток с прошлого`}
        amount={prevFunds}
        currency={currency}
      />
      <Line
        name={`Перерасход в прошлом`}
        amount={-prevOverspent}
        currency={currency}
      />
      <Line
        name={`План на ${getMonthName(date)}`}
        amount={-budgeted}
        currency={currency}
      />
      <Line
        name={`Переводы`}
        amount={-transferOutcome - transferFees}
        currency={currency}
      />
      <Line
        name={`Запланировано в будущем`}
        amount={-budgetedInFuture}
        currency={currency}
      />
      {opened && (
        <>
          <Line name={realBudgetedInFuture > budgetedInFuture ? `🎃` : `🤓`} />
          <Confirm
            title="Скопировать все бюджеты?"
            description="Бюджеты будут точно такими же, как в предыдущем месяце."
            onOk={() => dispatch(copyPreviousBudget(date))}
            okText="Скопировать"
            cancelText="Отмена"
          >
            <Line name="▶️ Копировать бюджеты с прошлого месяца..." />
          </Confirm>

          <Confirm
            title="Выполнить все цели?"
            description="Бюджеты будут выставлены так, чтобы цели в этом месяце выполнились."
            onOk={() => dispatch(fillGoals(date))}
            okText="Выполнить цели"
            cancelText="Отмена"
          >
            <Line name="▶️ Выполнить цели на месяц..." />
          </Confirm>

          <Confirm
            title="Хотите начать всё заново?"
            description="Остатки во всех категориях сбросятся, а бюджеты в будущем удалятся. Вы сможете начать распределять деньги с чистого листа. Меняются только бюджеты, все остальные данные останутся как есть."
            onOk={() => dispatch(startFresh(date))}
            okText="Сбросить остатки"
            cancelText="Отмена"
          >
            <Line name="▶️ Начать всё заново..." />
          </Confirm>

          {!!overspent && (
            <Confirm
              title="Избавиться от перерасходов?"
              onOk={() => dispatch(fixOverspends(date))}
              okText="Покрыть перерасходы"
              cancelText="Отмена"
            >
              <Line name="▶️ Покрыть перерасходы..." />
            </Confirm>
          )}
          <Line name={`Распределено`} amount={available} currency={currency} />
          <Line name={`Перерасход`} amount={overspent} currency={currency} />
          <Line name={`Расход`} amount={outcome} currency={currency} />
          <Line
            name={`Все переводы`}
            amount={-transferOutcome}
            currency={currency}
          />
          <Line
            name={`Потери на переводах`}
            amount={-transferFees}
            currency={currency}
          />
          <Line
            name={`realBudgetedInFuture`}
            amount={realBudgetedInFuture}
            currency={currency}
          />
          <Line name={`В бюджете`} amount={moneyInBudget} currency={currency} />
        </>
      )}
    </Body>
  )
}

function Line({ name, amount, currency, onClick }) {
  return (
    <LineBody onClick={onClick}>
      <LineName>{name}</LineName>
      {(amount || amount === 0) && <div>{formatMoney(amount, currency)}</div>}
    </LineBody>
  )
}
const LineBody = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 0;
  margin-top: 8px;
  color: var(--text-secondary);
`
const LineName = styled.div`
  flex-grow: 1;
  min-width: 0;
  margin-right: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
