'use strict';

const WIT_TOKEN = process.env.WIT_TOKEN || 'JDUOAU3VTZCHJANCF4CN7RZZG2SDWKQ6';
if (!WIT_TOKEN) {
  throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAATddErshOMBAMRit5MC3ElIYGnN1Nz0sNLF92hnGwW47d5n5oe7UHMCbZBXLRqKqOsg4bd9oRZBMD8qOV0qtnQ4nIt2JESOMUuZB8zRaA47Tdn2YqOrxvL4EjNhtKZBQFmXgZCCaZCZCh6QaksviNjKqQs2XdZB3HqlE5vtyQSwhgZDZD';
if (!FB_PAGE_TOKEN) {
	throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'my_voice_is_my_password_verify_me'

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
}
