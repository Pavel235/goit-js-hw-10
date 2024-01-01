'use strict'

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formElement = document.querySelector('.form')
const delayInput = document.querySelector('input[name="delay"]');
const fulfilledInput = document.querySelector('input[value="fulfilled"]');
const rejectedInput = document.querySelector('input[value="rejected"]');


formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const initialFormValues = {
        delay: delayInput.value,
        fulfilled: fulfilledInput.checked,
        rejected: rejectedInput.checked,
    }
    
    formElement.reset();

    const promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            if(initialFormValues.fulfilled) {
                resolve(iziToast.success({
                    title: 'Success',
                    message:`✅ Fulfilled promise in ${initialFormValues.delay}ms`,
                }))
            } else if (initialFormValues.rejected) {
                reject(iziToast.error({
                    title: 'Error',
                    message: `❌ Rejected promise in ${initialFormValues.delay}ms`,
                }))
            }
        }, initialFormValues.delay); 

    })

    promise
        .then(() => console.log(`✅ Fulfilled promise in ${initialFormValues.delay}ms`))
        .catch(() => console.log(`❌ Rejected promise in ${initialFormValues.delay}ms`))
        .finally(() => console.log("Promise settled"))

})