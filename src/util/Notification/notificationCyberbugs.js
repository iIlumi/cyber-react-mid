import { notification } from 'antd';

// https://ant.design/components/notification/#components-notification-demo-with-icon
export const notifiFunction = (type, message, description = '') => {
  notification[type]({
    //action.typeNotification = success | warning | info | error,
    message: message,
    description: description,
  });
};
