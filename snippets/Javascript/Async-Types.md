# Async Types

```javascript
const axios = require('axios');

// Classic (doesn't need await)
const data1 = () => {
  return fetch('https://api.publicapis.org/entries')
    .then((res) => res.json())
    .then((data) => data.entries[0].API);
};

let dataResult1;
data1().then((data) => {
  dataResult1 = data;
  console.log(dataResult1);
});

//***************************************** */

// Async/Await
const data2 = async () => {
  const response = await fetch('https://api.publicapis.org/entries');
  const data = await response.json();
  return data.entries[1].API;
};

let dataResult2;
const getData2 = async () => {
  dataResult2 = await data2();
  console.log(dataResult2);
};
getData2();

//***************************************** */

// Axios (doesn't need await)
const data3 = () => {
  return axios.get('https://api.publicapis.org/entries').then((response) => response.data.entries[2].API);
};

let dataResult3;
data3().then((data) => {
  dataResult3 = data;
  console.log(dataResult3);
});

```
