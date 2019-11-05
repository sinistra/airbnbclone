<script>
    import { createEventDispatcher } from 'svelte'
    import Datepicker from '../../lib/svelte-calendar-1.1.0/src/Components/Datepicker.svelte'
    export let bookedDates //prop
    $: {
        bookedDates
        startDateSelectableCallback = startDateSelectableCallback
        endDateSelectableCallback = endDateSelectableCallback
    }
    const dispatch = createEventDispatcher()
    const dateFormat = '#{l}, #{F} #{j}, #{Y}';
    let startDate = new Date()
    let endDate = new Date(startDate.getTime() + 1000 * 3600 * 24)
    const datesAreOnSameDay = (first, second) =>
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate()
    const dateIsSelectable = date => {
        if (!bookedDates) {
            return true
        }
        for (const bookedDate of bookedDates) {
            if (datesAreOnSameDay(date, new Date(bookedDate))) {
                return false
            }
        }
        return true
    }
    let startDateSelectableCallback = date => {
        return dateIsSelectable(date) //already booked?
    }
    const firstDateIsPastDayComparedToSecond = (firstDate, secondDate) => {
        if (firstDate.setHours(0,0,0,0) - secondDate.setHours(0,0,0,0) >= 0) { //first date is in future, or it is today
            return false
        }
        return true
    }
    let endDateSelectableCallback = date => {
        if (!dateIsSelectable(date)) { //already booked
            return false
        }
        const today = new Date()
        if (date.getTime() - startDate.getTime() < 0) {
            return false
        }
        if (date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate()) {
            return false
        }
        if (date.getFullYear() === startDate.getFullYear() &&
                date.getMonth() === startDate.getMonth() &&
                date.getDate() === startDate.getDate()) {
            return false
        }
        return true
    }
</script>

<style>
    .date-range-picker-container {
        border: 1px solid #ddd;
        display: grid;
        grid-template-columns: 40% 20% 40%;
        padding: 10px;
    }
</style>

<div class="date-range-picker-container">

    <Datepicker
            format='{dateFormat}'
            start={new Date()}
            selectableCallback={startDateSelectableCallback}
            on:dateSelected={e => {
            startDate = new Date(e.detail.date)
            if (!firstDateIsPastDayComparedToSecond(startDate, endDate)) {
            endDate = new Date(startDate.getTime() + 1000 * 3600 * 24)
            }
            endDateSelectableCallback = endDateSelectableCallback

            dispatch('datesChanged', {
            startDate: startDate,
            endDate: endDate
            })
            }}>
        <div class="check-in">{`${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'long' })}`}</div>
    </Datepicker>
    <div class="arrow">➡️</div>
    <Datepicker
            format='{dateFormat}'
            start={new Date()}
            selectableCallback={endDateSelectableCallback}
            on:dateSelected={e => {
            endDate = new Date(e.detail.date)

            dispatch('datesChanged', {
            startDate: startDate,
            endDate: endDate
            })
            }}>
        <div class="check-in">{`${endDate.getDate()} ${endDate.toLocaleString('default', { month: 'long' })}`}</div>
    </Datepicker>
</div>
