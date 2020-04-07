# 5.2.1 Redux async

---

Now that you've seen redux, hopefully this pattern looks familiar:

```js
const App = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(someAction());
  };

  return <button onClick={handleClick}>Do something</button>;
};
```

---

# A new scenario

I need to request some data from the server.

I want to show a spinner while it's fetching

---

Let's solve this together

```js
// My actions:
const startRequestingData = () => ({
  type: "START_REQUESTING_DATA",
  // show spinner
});

const receiveData = (data) => ({
  type: "RECEIVE_DATA",
  data,
  //process data
});

const failToRetrieveData = (error) => ({
  type: "FAIL_TO_RETRIEVE_DATA",
  error,
  // error page
});

const App = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(startRequestingData());
    fetch("/some-data")
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveDate(data));
      })
      .catch((err) => {
        dispatch(failToRetrieveData(err));
      });
  };

  return <button onClick={handleClick}>Do something</button>;
};
```

---

# Exercises

Dispatch the actions

---

```js
const receiveHockeyScores = (scores) => ({
  type: "RECEIVE_HOCKEY_SCORES",
  scores,
});
const receiveBaseballScores = (scores) => ({
  type: "RECEIVE_BASEBALL_SCORES",
  scores,
});

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch("/hockey")
      .then((res) => res.json())
      .then((scores) => {
        dispatch(receiveHockeyScores(scores));
      });

    fetch("/baseball")
      .then((res) => res.json())
      .then((scores) => {
        dispatch(receiveBaseballScores(scores));
      });
  }, []);

  return <Scores />;
};
```

---

# Extra Challenge

Update this example so that it dispatches an action when _both_ of the endpoints have completed

---

```js
const receiveAllScores = () => ({
  type: "RECEIVE_ALL_SCORES",
});

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    let allScores = {};
    const [receivedHockey, setReceivedHockey] = react.useState(false);
    const [receivedBaseball, setReceivedBaseball] = react.useState(false);

    const hockeyPromise = fetch("/hockey").then((scores) => {
      dispatch(receiveHockeyScores(scores));
    });

    const baseballPromise = fetch("/baseball").then((scores) => {
      dispatch(receiveBaseballScores(scores));
    });

    Promise.all([hockeyPromise, baseballPromise]).then(() =>
      dispatch(receiveAllData())
    );
  }, []);

  return <Scores />;
};
```
