import React, { useState, useRef, useEffect } from 'react';

import { getDateAccordingToMonth, shallowClone, getValueType } from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from './shared/constants';
import { useLocaleUtils, useLocaleLanguage } from './shared/hooks';

import { Header, MonthSelector, YearSelector, DaysList } from './components';
import {MDBCol, MDBRow} from "mdbreact";

const Calendar = ({
                    value,
                    onChange,
                    onDisabledDayError,
                    calendarClassName,
                    calendarTodayClassName,
                    calendarSelectedDayClassName,
                    calendarRangeStartClassName,
                    calendarRangeBetweenClassName,
                    calendarRangeEndClassName,
                    disabledDays,
                    colorPrimary,
                    colorPrimaryLight,
                    slideAnimationDuration,
                    minimumDate,
                    maximumDate,
                    selectorStartingYear,
                    selectorEndingYear,
                    locale,
                    shouldHighlightWeekends,
                    renderFooter,
                    customDaysClassName,
                    priceDays,
                    PriceYear,
                    PriceMonth,
                    villaPrice,
                    test
                  }) => {
  const calendarElement = useRef(null);
  const [mainState, setMainState] = useState({
    activeDate: null,
    monthChangeDirection: '',
    isMonthSelectorOpen: false,
    isYearSelectorOpen: false,
  });

  useEffect(() => {
    const handleKeyUp = ({ key }) => {
      /* istanbul ignore else */
      if (key === 'Tab') calendarElement.current.classList.remove('-noFocusOutline');
    };
    if(calendarElement.current.removeEventListener('keyup', handleKeyUp, false)){
      calendarElement.current.addEventListener('keyup', handleKeyUp, false);

      return () => {
        calendarElement.current.removeEventListener('keyup', handleKeyUp, false);
      };
    }

  });


  const { getToday } = useLocaleUtils(locale);
  const { weekDays: weekDaysList, isRtl } = useLocaleLanguage(locale);
  const today = getToday();

  const createStateToggler = property => () => {
    setMainState({ ...mainState, [property]: !mainState[property] });
  };

  const toggleMonthSelector = createStateToggler('isMonthSelectorOpen');
  const toggleYearSelector = createStateToggler('isYearSelectorOpen');

  const getComputedActiveDate = () => {
    const valueType = getValueType(value);
    if (valueType === TYPE_MUTLI_DATE && value.length) return shallowClone(value[0]);
    if (valueType === TYPE_SINGLE_DATE && value) return shallowClone(value);
    if (valueType === TYPE_RANGE && value.from) return shallowClone(value.from);
    return shallowClone(today);
  };
  const activeDate = mainState.activeDate
      ? shallowClone(mainState.activeDate)
      : getComputedActiveDate();

  const weekdays = weekDaysList.map(weekDay => (
      <abbr key={weekDay.name} title={weekDay.name} className="Calendar__weekDay">
        {weekDay.short}
      </abbr>
  ));

  const handleMonthChange = direction => {
    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });
    /* console.log(mainState) */
  };

  const updateDate = () => {
    setMainState({
      ...mainState,
      activeDate: getDateAccordingToMonth(activeDate, mainState.monthChangeDirection),
      monthChangeDirection: '',
    });

    /* console.log(activeDate)
     console.log(mainState.monthChangeDirection)   // NEXT PREVIOUS */
  };

  const selectMonth = newMonthNumber => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, month: newMonthNumber },
      isMonthSelectorOpen: false,
    });
  };

  const selectYear = year => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, year },
      isYearSelectorOpen: false,
    });
  };
  const testdata = {
    day: activeDate.day,
    month: activeDate.month+1,
    year: activeDate.year
  }
  const activedateLeft ={
    day: activeDate.day,
    month: activeDate.month+1,
    year: activeDate.year
  }
  const statemain ={
    activeData:{
      day: activeDate.day,
      month: activeDate.month+1,
      year: activeDate.year
    },
    isMonthSelectorOpen:false,
    isYearSelectorOpen:false,
    monthChangeDirection:"",
    firstOfMonthActiveData:{
      day: 1,
      month: 1,
      year: activeDate.year
    }
  }
  const mainstatetestmonthfirst = activeDate.month+1
  /* console.log(mainstatetestmonthfirst)  //   5 6    6 5 */
  const handleMonthChangeLeft = direction => {
    if(mainState.activeDate && mainState.monthChangeDirection=== 'NEXT' && mainState.monthChangeDirection === 'PREVIOUS'){
      mainState.activeDate.month=mainState.activeDate.month+1
      if( mainState.activeDate.month>12) {mainState.activeDate.year=mainState.activeDate.year+1
        mainState.activeDate=statemain.firstOfMonthActiveData}
    }else {mainState.activeDate= statemain.activeData}

    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });

    /* console.log( mainState.activeDate)
     console.log(1)*/
  };
  const handleMonthChangeLeftt= direction => {
    const getToddayDate ={
      year:today.year,
      month:today.month+2,
      day:today.day
    }

    if(mainState.activeDate){
      mainState.activeDate.month=mainState.activeDate.month+2
      if( mainState.activeDate.month>12 || mainState.activeDate.month<1) {mainState.activeDate.year=mainState.activeDate.year+1
        mainState.activeDate.month= mainState.activeDate.month+1 }
      if( mainState.activeDate.month ===12 || mainState.activeDate.month<1) {mainState.activeDate.year=mainState.activeDate.year+1
        mainState.activeDate.month= mainState.activeDate.month+1 }
    }else {mainState.activeDate= getToddayDate}

    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });

    /* console.log( mainState.activeDate.monthChangeDirection)
     console.log(1)*/
  };




  const handleMonthChangeRight= direction => {
    const getToddayDate ={
      year:today.year,
      month:today.month,
      day:today.day
    }

    if(mainState.activeDate){
      mainState.activeDate.month=mainState.activeDate.month
      if( mainState.activeDate.month>=12 || mainState.activeDate.month<1) {mainState.activeDate.year=mainState.activeDate.year
        mainState.activeDate.month= mainState.activeDate.month
        alert(mainState.activeDate.month)
        alert(mainState.activeDate.year)}
      if( mainState.activeDate.month ===12 || mainState.activeDate.month<1) {mainState.activeDate.year=mainState.activeDate.year
        mainState.activeDate.month= mainState.activeDate.month
        alert(mainState.activeDate.month)
        alert(mainState.activeDate.year)}
    }else {mainState.activeDate= getToddayDate}

    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });

    /*  console.log( mainState.activeDate.monthChangeDirection)
      console.log(1) */
  };
  const handleMonthChangeLeftPlusOne= direction => {
    const getToddayDate ={
      year:today.year,
      month:today.month+2,
      day:today.day
    }

    if(mainState.activeDate){
      mainState.activeDate.month=mainState.activeDate.month+1
      if( mainState.activeDate.month>=12 || mainState.activeDate.month<1) {mainState.activeDate.year=mainState.activeDate.year+1
        mainState.activeDate.month= mainState.activeDate.month+1 }

    }else {mainState.activeDate= getToddayDate}

    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });

    /* console.log( mainState.activeDate.monthChangeDirection)
     console.log(1)*/
  };



  const handleMonthChangeRightPlusOne= direction => {
    const getToddayDate ={
      year:today.year,
      month:today.month+1,
      day:today.day
    }

    if(mainState.activeDate){
     /* mainState.activeDate.month=mainState.activeDate.month+1 */
      if( 2>= mainState.activeDate.month ){
        mainState.activeDate.month=mainState.activeDate.month-1
      }
    }else {mainState.activeDate= getToddayDate}

    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });

    /* console.log( mainState.activeDate.monthChangeDirection)
     console.log(1)*/
  };



  if(value.from.year === 1300 && value.from.day === 4  ){

    value={
      from: today,
      to: today,
      __proto__: Object
    }
  }
  if(activeDate.year === 1300 && activeDate.day === 4){

    activeDate.month = today.month
    activeDate.year = today.year
    activeDate.day = today.day

    activedateLeft.month = today.month+1
    activedateLeft.year = today.year
    activedateLeft.day = today.day
  }

  return (
      <MDBRow>
        <MDBCol className={'fv-calendar-right'} md={6}>


          <div
              className={`Calendar -noFocusOutline ${calendarClassName} -${isRtl ? 'rtl' : 'ltr'}`}
              role="grid"
              style={{
                '--cl-color-primary': colorPrimary,
                '--cl-color-primary-light': colorPrimaryLight,
                '--animation-duration': slideAnimationDuration,
              }}
              ref={calendarElement}
          >

            <Header
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                activeDate={activeDate}
                onMonthChange={handleMonthChangeRightPlusOne}
                onMonthSelect={toggleMonthSelector}
                onYearSelect={toggleYearSelector}
                /* monthChangeDirection={mainState.monthChangeDirection} */
                isMonthSelectorOpen={mainState.isMonthSelectorOpen}
                isYearSelectorOpen={mainState.isYearSelectorOpen}
                locale={locale}
            />
            {console.log(activeDate)}
            {console.log('maximumDate')}

            <MonthSelector
                isOpen={mainState.isMonthSelectorOpen}
                activeDate={activeDate}
                onMonthSelect={selectMonth}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                locale={locale}
            />

            <YearSelector
                isOpen={mainState.isYearSelectorOpen}
                activeDate={activeDate}
                onYearSelect={selectYear}
                selectorStartingYear={selectorStartingYear}
                selectorEndingYear={selectorEndingYear}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                locale={locale}
            />

            <div className="Calendar__weekDays">{weekdays}</div>

            <DaysList
                activeDate={activeDate}
                value={value}
                monthChangeDirection={mainState.monthChangeDirection}
                onSlideChange={updateDate}
                disabledDays={disabledDays}
                onDisabledDayError={onDisabledDayError}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onChange={onChange}
                calendarTodayClassName={calendarTodayClassName}
                calendarSelectedDayClassName={calendarSelectedDayClassName}
                calendarRangeStartClassName={calendarRangeStartClassName}
                calendarRangeEndClassName={calendarRangeEndClassName}
                calendarRangeBetweenClassName={calendarRangeBetweenClassName}
                locale={locale}
                shouldHighlightWeekends={shouldHighlightWeekends}
                customDaysClassName={customDaysClassName}
                isQuickSelectorOpen={mainState.isYearSelectorOpen || mainState.isMonthSelectorOpen}
                priceday={priceDays}
                pricemonth={PriceMonth}
                priceyear={PriceYear}
                testDay = {test}
                villaPrices={villaPrice}
            />


            <div className="Calendar__footer">{renderFooter()}</div>
          </div>

        </MDBCol>




        <MDBCol  className={'fv-calendar-left'}  md={6}>
          <div
              className={`Calendar -noFocusOutline ${calendarClassName} -${isRtl ? 'rtl' : 'ltr'}`}
              role="grid"
              style={{
                '--cl-color-primary': colorPrimary,
                '--cl-color-primary-light': colorPrimaryLight,
                '--animation-duration': slideAnimationDuration,
              }}
              ref={calendarElement}
          >

            <Header
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                activeDate={activedateLeft}
                onMonthChange={handleMonthChangeLeftPlusOne}
                onMonthSelect={toggleMonthSelector}
                onYearSelect={toggleYearSelector}
                /* monthChangeDirection={mainState.monthChangeDirection} */
                isMonthSelectorOpen={mainState.isMonthSelectorOpen}
                isYearSelectorOpen={mainState.isYearSelectorOpen}
                locale={locale}
            />


            <MonthSelector
                isOpen={mainState.isMonthSelectorOpen}
                activeDate={activeDate}
                onMonthSelect={selectMonth}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                locale={locale}
            />

            <YearSelector
                isOpen={mainState.isYearSelectorOpen}
                activeDate={activeDate}
                onYearSelect={selectYear}
                selectorStartingYear={selectorStartingYear}
                selectorEndingYear={selectorEndingYear}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                locale={locale}
            />

            <div className="Calendar__weekDays">{weekdays}</div>

            <DaysList
                activeDate={activedateLeft}
                value={value}
                monthChangeDirection={mainState.monthChangeDirection}
                onSlideChange={updateDate}
                disabledDays={disabledDays}
                onDisabledDayError={onDisabledDayError}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onChange={onChange}
                calendarTodayClassName={calendarTodayClassName}
                calendarSelectedDayClassName={calendarSelectedDayClassName}
                calendarRangeStartClassName={calendarRangeStartClassName}
                calendarRangeEndClassName={calendarRangeEndClassName}
                calendarRangeBetweenClassName={calendarRangeBetweenClassName}
                locale={locale}
                shouldHighlightWeekends={shouldHighlightWeekends}
                customDaysClassName={customDaysClassName}
                isQuickSelectorOpen={mainState.isYearSelectorOpen || mainState.isMonthSelectorOpen}
                priceday={priceDays}
                pricemonth={PriceMonth}
                priceyear={PriceYear}
                testDay = {test}
                villaPrices={villaPrice}
            />

            <div className="Calendar__footer">{renderFooter()}</div>
          </div>
        </MDBCol>
      </MDBRow>

  );
};

Calendar.defaultProps = {
  minimumDate: null,
  maximumDate: null,
  colorPrimary: '#0eca2d',
  colorPrimaryLight: '#cff4d5',
  slideAnimationDuration: '0.4s',
  calendarClassName: '',
  locale: 'IR',
  value: null,
  renderFooter: () => null,
  customDaysClassName: [],
};

export { Calendar };