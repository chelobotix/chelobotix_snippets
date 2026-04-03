# Promise

```javascript
//! Basic
const promise = new Promise((resolve, reject) => {
  resolve('success!');
});

promise
    .then((res) => console.log(res))
    .catch((error) => console.log(error));

//or with await (await only can be used inside an async function)
const getPromise = async () => {
  try {
    const response = await promise;
    console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }
};

getPromise();



//! Chaining
const condition = true;

const proms = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (condition) {
      resolve('Hello Natish');
    } else {
      reject('Error getting name');
    }
  }, 1000);
});

const test1 = (msg) => {
  return `test1: ${msg} I Love you`;
};

const test2 = (msg) => {
  return `test2: ${msg} so much`;
};

proms
  .then((result) => {
    console.log(result);
    return result;
  })
  .then((msg) => {
    return test1(msg);
  })
  .then((msg2) => {
    console.log(test2(msg2));
  })
  .catch((error) => {
    console.log(error);
  });
  
  
  // Multiple Tasks
  
  const control = true;
const promise = (text, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (control) {
        resolve(text);
      } else {
        reject('An error happened');
      }
    }, time);
  });
};

const tasks = async () => {
  try {
    console.log(await promise('Task 1', 2000));
    console.log(await promise('Task 2', 2000));
    console.log(await promise('Task 3', 2000));
  } catch (error) {
    console.log(error);
  }
};

tasks();


// resolve direct
Promise.resolve().then(() => {
  setTimeout(() => {
    console.log(3);
  }, 0);
});
```
