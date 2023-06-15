import axios from 'axios';

export async function getUserTickets(email) {
  if (!email) {
    return false;
  }

  return await axios.get(
    process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/freescout/get_tickets/' + email
  );
}
