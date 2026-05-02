# Fetch

```javascript
const axios = require('axios');

const getData1 = () => {
  return fetch('https://api.publicapis.org/entries')
    .then((res) => res.json())
    .then((data) => data.entries[0]);
};

const getData2 = async () => {
  const response = await fetch('https://api.publicapis.org/entries');
  const data = await response.json();
  return data.entries[1];
};

const getData3 = async () => {
  return axios.get('https://api.publicapis.org/entries').then((response) => response.data.entries[2]);
};

let data1;
getData1().then((data) => {
  data1 = data;
  console.log(data);
});

let data2;
getData2().then((data) => {
  data2 = data;
  console.log(data2);
});

let data3;
getData3().then((data) => {
  data3 = data;
  console.log(data3);
});

```
