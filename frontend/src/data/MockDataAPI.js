
import {  Accounts} from './dataArrays';
//import moment from 'moment';
import axios from 'axios';

const serverUrl = 'http://192.168.31.62:5000';

export async function PushNotification(){
  const response = await axios.get(`${serverUrl}/api/notification/new`);
  return response.data;
}


export async function getALLNotifications(){
  const response = await axios.get(`${serverUrl}/api/notification`);
  return response.data;
}

// Devices
export async function getLastestData(deviceId) {
    const response = await axios.get(`${serverUrl}/api/data/${deviceId}`);
    return response.data;
}

export async function getLastestSensorStatus(deviceId) {
  const response = await axios.get(`${serverUrl}/api/sensor/${deviceId}`);// không được quên await
  return response.data;
}

export async function updateSensorStatus(id, location, newStatus) {
  const data = {
    location: location,
    status: newStatus,
  };

  const response = await axios.put(
    `${serverUrl}/api/sensor/update/${id}`,
    data
  );
  return response.data;
}

export async function updateDeviceStatus(id, location, newStatus) {
  const data = {
    location: location,
    status: newStatus,
  };

  const response = await axios.put(
    `${serverUrl}/api/device/update/${id}`,
    data
  );
  return response.data;
}


function getDeviceId(type, location){
  if(type === 'LED'){
      if(location === 'Living Room'){
        return 'LED01';
      }
      else if(location === 'BedRoom'){
        return 'LED02';
      }
  }
  else if(type === 'FAN'){
    if(location === 'Living Room'){
      return 'FAN01';
    }
    else if(location === 'BedRoom'){
      return 'FAN02';
    }
  }
  return null;
}
export async function updateItemStatusWithVoice(type , location ,newStatus) {
  const data = {
    location: location,
    status: newStatus,
  };
  const deviceId = getDeviceId(type, location);
  const response = await axios.put(
    `${serverUrl}/api/device/update/${deviceId}`,
    data
  );
  return response.data;
}

export async function getAllSensor(){
  const response = await axios.get(`${serverUrl}/api/sensor`);
  return response.data;
};

export async function getRooms() {
  const response = await axios.get(`${serverUrl}/api/location`);
  return response.data;
}

export async function checkAccount(email, password) {
  const response = await axios.get(`${serverUrl}/api/user`);
  const users = response.data;
  for (const user of users) {
    if (user.email === email && user.pw === password) {
      return email;
      
    }
  }
  // Không tìm thấy tài khoản nào trùng khớp
  return false;
}
export async function getInfoByEmail(email) {
  const response = await axios.get(`${serverUrl}/api/user`);
    // Lấy dữ liệu người dùng từ response
    const users = response.data;
    // Duyệt qua từng phần tử trong mảng users
    for (const user of users) {
      if (user.email === email) {
        // Tìm thấy tài khoản trùng khớp
        return user;  
      }
    }
}

export async function updateAccount(email, newEmail, phoneNumber) {
  const info = await getInfoByEmail(email);
        // Tìm thấy tài khoản trùng khớp
  const response = await axios.put(
    `${serverUrl}/api/user/update/${info.id}`,
      {
        email: newEmail?newEmail:info.email,
        phone: phoneNumber,
        name : info.name,
        pw : info.pw,
        account: info.account
      }
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
  const data = getLastestData(id) ;

  return data; // Trả về null nếu không tìm thấy
};

//function to achieve devices have the id contain  deviceId paramete
export async function findDevicesInAType(device){
  const datas = await axios.get(`${serverUrl}/api/device`);
  devices = datas.data;
  // Duyệt qua từng phần tử trong mảng users
  const arrayDevice = [];
  for (const item of devices) {
    if (item.id.includes(device.toUpperCase())) {
      // Tìm thấy tài khoản trùng khớp
       arrayDevice.push(item);   
    }
  }
  return arrayDevice;
};

export async function findDevice(device){
  const datas = await axios.get(`${serverUrl}/api/device/${device}`);
  device = datas.data;
  const deviceArray = [device];
  // Duyệt qua từng phần tử trong mảng users
  return deviceArray;
};

export async function getALLdevicesandSensor(){
  const response1 = await axios.get(`${serverUrl}/api/device`);
  const response2 = await axios.get(`${serverUrl}/api/sensor`);
  const combinedArray = [...response1.data, ...response2.data];
  return combinedArray;

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


