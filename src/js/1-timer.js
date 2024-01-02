'use strict'

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import moment from 'moment';

const inputElement = document.querySelector('#datetime-picker');
const StartBtn = document.querySelector('button[type="button"');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    dateFormat:'Y-m-d H:i:s',
    onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
     if(userSelectedDate <= new Date()) {
       iziToast.error({
        title: 'Error',
        message: 'Please choose date in the future',
       })
       StartBtn.disabled = true; 
     } else {
        StartBtn.disabled = false; 
     }
    },
  };
  
  flatpickr(inputElement, options); 
  
  StartBtn.disabled = true;  

  StartBtn.addEventListener('click', () => {
    startCountDown();
    StartBtn.disabled = true; 
    inputElement.disabled = true; 
  });

  console.log(flatpickr.parseDate(inputElement.value));

  function startCountDown() {

    const countDownInterval = setInterval(() => {
        let selectedDate = flatpickr.parseDate(inputElement.value);
        const now = new Date();
        const TimeDifference = selectedDate - now; 

        console.log(TimeDifference);

        if(TimeDifference <= 0) {
            clearInterval(countDownInterval);
            updateTimer(0, 0, 0, 0);
            iziToast.success({
                title: 'Countdown finished',
                message: 'The countdown has finished',
            })
        } else {
            const {days, hours, minutes, seconds} = convertMs(TimeDifference);
            updateTimer(days, hours, minutes, seconds); 
        }
    }, 1000)

  }

  function updateTimer (days, hours, minutes, seconds) {
    spanDays.textContent = addLeadingZero(days);
    spanHours.textContent = addLeadingZero(hours);
    spanMinutes.textContent = addLeadingZero(minutes);
    spanSeconds.textContent = addLeadingZero(seconds); 
  }

  function convertMs(ms) {

    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds }; 
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0'); 
  }
  
