import { DOMAIN_CYBERBUG } from '../util/constants/settingSystem';
const { default: Axios } = require('axios');
// const { DOMAIN_CYBERBUG } = require('../util/constants/settingSystem');

export const cyberbugsService = {
  signInCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/users/signin`,
      method: 'POST',
      data: userLogin,
    });
  },
};
