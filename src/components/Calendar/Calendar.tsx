import React, { useMemo, useState } from 'react';
import {
  CALENDAR_MONTHS,
  getDateISO,
  isSameDay,
  isSameMonth,
  WEEK_DAYS,
} from '../DatePicker/helpers';
import calendar from './heplers';
import {
  ArrowLeft,
  ArrowRight,
  CalendarContainer,
  CalendarDate,
  CalendarDay,
  CalendarGrid,
  CalendarHeader,
  CalendarMonth,
  HighlightedCalendarDate,
  TodayCalendarDate,
} from './Calendar.styled';

type CurrentDate = {
  current: Date | null;
  month: number;
  year: number;
};

type Props = {
  date: Date | null;
  onDateChanged: () => void;
};

const Calendar = ({ date, onDateChanged }: Props): JSX.Element => {
  const _date = date || new Date();
  const defaultCurrentDate: CurrentDate = {
    current: date || null,
    month: +_date.getMonth() + 1,
    year: +_date.getFullYear(),
  };
  const [currentDate, setCurrentDate] = useState<CurrentDate>(defaultCurrentDate);
  const today = new Date();

  const getCalendarDates = useMemo((): (string | number)[][] => {
    const { current, month, year } = currentDate;
    const calendarMonth: number = month || +current.getMonth() + 1;
    const calendarYear: number = year || +current.getFullYear();

    return calendar(calendarMonth, calendarYear);
  }, [currentDate]);

  const renderMonthAndYear = () => {
    const { month, year } = currentDate;
    const monthname = Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))];

    return (
      <CalendarHeader>
        <ArrowLeft title='Previous Month' />
        <CalendarMonth>
          {monthname} {year}
        </CalendarMonth>
        <ArrowRight title='Next Month' />
      </CalendarHeader>
    );
  };

  const renderDayLabel = (day: string, index) => {
    const daylabel = WEEK_DAYS[day].toUpperCase();
    return (
      <CalendarDay key={daylabel} index={index}>
        {daylabel}
      </CalendarDay>
    );
  };

  const renderCalendarDate = (date, index) => {
    const { current, month, year } = currentDate;
    const _date = new Date(date.join('-'));

    const isToday = isSameDay(_date, today);
    const isCurrent = current && isSameDay(_date, current);
    const inMonth = month && year && isSameMonth(_date, new Date([year, month, 1].join('-')));

    // const onClick = this.gotoDate(_date);
    const onClick = () => {
      console.log(_date);
    };

    const props = { index, inMonth, onClick, title: _date.toDateString() };

    const DateComponent = isCurrent
      ? HighlightedCalendarDate
      : isToday // eslint-disable-next-line prettier/prettier
      ? TodayCalendarDate // eslint-disable-next-line prettier/prettier
      : CalendarDate;

    return (
      <DateComponent key={getDateISO(_date)} {...props}>
        {_date.getDate()}
      </DateComponent>
    );
  };

  return (
    <CalendarContainer>
      {renderMonthAndYear()}
      <CalendarGrid>
        <>{Object.keys(WEEK_DAYS)?.map((day: string, index) => renderDayLabel(day, index))}</>
        <>{getCalendarDates?.map((date, index) => renderCalendarDate(date, index))}</>
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
