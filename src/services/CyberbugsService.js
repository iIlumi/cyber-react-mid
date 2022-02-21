import { DOMAIN_CYBERBUG } from '../util/constants/settingSystem';
import Axios from 'axios';

// const { DOMAIN_CYBERBUG } = require('../util/constants/settingSystem');
// const { default: Axios } = require('axios');

export const cyberbugsService = {
  signInCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/users/signin`,
      method: 'POST',
      data: userLogin,
    });
  },

  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
      method: 'GET',
    });
  },
};
