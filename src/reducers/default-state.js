import lockr from 'lockr';
import config from './../lib/config';

lockr.prefix = config.LOCKR_PREFIX;

export default {
  user: {
  	data: null,
  	authenticated: false,
  	searchInput: null,
  	showSearch: false,
  },
  users: {
  	data: null,
  },
};
