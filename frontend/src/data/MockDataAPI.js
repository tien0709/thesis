
import {  Accounts} from './dataArrays';
//import moment from 'moment';
import axios from 'axios';

const serverUrl = 'http://192.168.31.62:3005';

// Devices
export async function getLastestTemperature(deviceId) {
    const response = await axios.get(`${serverUrl}/api/temperature/${deviceId}`);
    return response.data;
}

export async function getLastestTemperatureStatus(deviceId) {
  const response = await axios.get(`${serverUrl}/api/temperatureStatus/${deviceId}`);// không được quên await
  return response.data;
}

export async function updateTemperatureStatus(deviceId, location, newStatus) {
  const data = {
    deviceId,
    location,
    status: newStatus,
  };

  const response = await axios.post(
    `${serverUrl}/api/temperatureStatus/update`,
    data
  );
  return response.data;
}

export async function updateHumidityStatus(deviceId, location ,newStatus) {
  const data = {
    deviceId,
    location,
    status: newStatus,
  };

  const response = await axios.post(
    `${serverUrl}/api/humidityStatus/update`,
    data
  );
  return response.data;
}

export async function updateItemStatus(id ,newStatus) {
  const data = {
    id,
    newStatus,
  };
  const response = await axios.post(
    `${serverUrl}/api/status/update`,
    data
  );
  return response.data;
}

export async function updateItemStatusWithVoice(type , location ,newStatus) {
  const data = {
    type,
    location,
    newStatus,
  };
  const response = await axios.post(
    `${serverUrl}/api/status/updateWithVoice`,
    data
  );
  return response.data;
}

export async function getLastestHumiStatus(deviceId) {
  const response = await axios.get(`${serverUrl}/api/HumidityStatus/${deviceId}`);// không được quên await
  return response.data;
}

export async function getLastestHumidity(deviceId) {
  const response = await axios.get(`${serverUrl}/api/humidity/${deviceId}`);
  return response.data;
}

export async function getLastestLight(deviceId) {
  const response = await axios.get(`${serverUrl}/api/light/${deviceId}`);
  return response.data;
}

export async function getRooms() {
  const response = await axios.get(`${serverUrl}/api/locations`);
  return response.data;
}

export async function checkAccount(email, password) {
  const response = await axios.get(
    `${serverUrl}/api/user`,
    {
      params: {
        email: email,
        pw: password,
      },
    }
  );

  return response.data;
}

export async function updateAccount(email, newEmail, phoneNumber) {
  const response = await axios.post(
    `${serverUrl}/api/user/update`,
      {
        email: email,
        newEmail: newEmail,
        phone: phoneNumber,
      }
  );
  return response.data;
}

export async function getInfoByEmail(email) {
  const response = await axios.get(
    `${serverUrl}/api/user/${email}`
  );
  return response.data;
}


function toUpperCaseNoSpace(str) {
  // Xóa khoảng trắng
  const trimmedStr = str.replace(/\s+/g, '');

  // Chuyển đổi sang chữ hoa
  const upperCaseStr = trimmedStr.toUpperCase();

  // Trả về chuỗi mới
  return upperCaseStr;
}

export function findLastElementWithLocation  (type, location) {
  
  const typestr = toUpperCaseNoSpace(type);
  const locationStr = toUpperCaseNoSpace(location);
  const id = typestr + '_' + locationStr;
  var data = 0 ;

  if (typestr === 'HUMI'){
    data = getLastestHumidity(id) ;
  }

  else if (typestr === 'TEMP'){
    data = getLastestTemperature(id) ;
  }

  else if (typestr === 'LIGHT'){
    data = getLastestLight(id) ;
  }
  return data; // Trả về null nếu không tìm thấy
};

//function to achieve devices have the id contain  deviceId parameter
export async function findDevices(deviceId, location){
  const response = await axios.get(`${serverUrl}/api/devices`, {
    params: {
      deviceId,
      location
    }
  });
  return response.data;
};

export async function getALLdevicesandSensor(){
  const response = await axios.get(`${serverUrl}/api/devicesandsensors`);
  return response.data;

};

export async function SpeechToText(formData){
  const response = await axios.post(
    `${serverUrl}/api/speechtotext`,
      {
        formData: formData
      }
  );
  return response.data;

};


