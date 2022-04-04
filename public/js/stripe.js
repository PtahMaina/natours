/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  const stripe = Stripe('pk_test_51Kk2iTAFRWSgwJUTipJh9bOwIKHWkhSI9wdS1wfoZqncMqNgQ8rkfZZAPFe4pIpT4nmtuF47dbs9W7Y5HS6whHlI00yHb3h4wu');
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
