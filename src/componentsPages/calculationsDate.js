import moment from "moment-jalaali";
import moment2 from 'jalali-moment'

export const arrayBetweenDates = (dateA, dateB, range) => {


    if (dateA && dateB) {
        let daysList = []
        const startDate = dateA.split("/")
        const endDate = dateB.split("/");
        moment.locale("fa");
        moment.loadPersian();

        if (range > 0) {
            for (let i = 0; i < range; i++) {
                let startdate = moment(dateA, 'jYYYY/jM/jD');
                startdate = startdate.add(i, "days");
                startdate = startdate.format("YYYY/MM/DD");
                // let date = moment().add('months', 1).endOf('month');
                // console.log(date)

                const test = moment(startdate, 'YYYY/M/D').format('jYYYY/jM/jD') // today in shamsi
                daysList.push(test)
            }
        }
        return (
            daysList
        )
    }

    /*
     const startDate = dateA.split("/")
     const endDate = dateB.split("/");
     moment.locale("fa");
     moment.loadPersian();

     let startdate = moment();
     startdate = startdate.add(20, "days");
     startdate = startdate.format("YYYY-MM-DD");
     const today = `${utils().getToday().year}-${utils().getToday().month}-${utils().getToday().day}` // today date
     const test=  moment(startdate, 'YYYY-M-D').format('jYYYY/jM/jD ') // today in shamsi


     const test2=  moment(today, 'YYYY-M-D').endOf('jMonth').format('jYYYY/jM/jD ') // end of month

     console.log( startdate )
     console.log( test )
     console.log('arrayBetweenDates')


     return(
         startdate
     ) */
}


export const arrayBetweenDatesObject = (dateA, dateB, range) => {

    if (dateA && dateB) {

        let daysList = []
        moment.locale("fa");
        moment.loadPersian();

        if (range > 0) {
            for (let i = 0; i < range; i++) {
                let startdate = moment(dateA, 'jYYYY/jM/jD');
                startdate = startdate.add(i, "days");
                startdate = startdate.format("YYYY/MM/DD");
                const test = moment(startdate, 'YYYY/M/D').format('jYYYY/jM/jD ') // today in shamsi
                const result = test.split("/")
                let date = {
                    year: result[0],
                    month: result[1],
                    day: result[2],
                }
                daysList.push(date)
            }
        }
        return {
            daysList
        }

    }
}
export const priceOfPerMonth = (year, month, daysArray) => {    // ["" , "" , "" , ..... , 200 , 300 , 400] خالی کردن اول های آرایه تا جایی که قیمت دارد
    const priceDays = []
    const endOfDayThisMonth = moment.jDaysInMonth(year, month - 1)
    const range = endOfDayThisMonth - daysArray.length
    for (let i = 0; i < range; i++) {
        priceDays.push("")
    }
    for (let i = 0; i < daysArray.length; i++) {
        priceDays.push(daysArray[i])
    }
    return priceDays
}
export const getToday = () => {
    moment2.locale('fa');
    const todayJalali = moment2().locale('fa').format('YYYY/M/D');
    const today = moment2(todayJalali, 'YYYY/M/D').format('jYYYY/jM/jD ') // today in shamsi
    const isToday = today.split("/")
    const setToday = {
        year: isToday[0],
        month: isToday[1],
        day: isToday[2],
    }
    return setToday
}