import { useState, useEffect } from 'react';

import { db, auth } from '../firebase.ts';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteDoc } from "firebase/firestore";

function App() {
  const [poll, setPoll] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");

  const pollRef = doc(db, "poll", "current");

  useEffect(() => {
    const loadPoll = async () => {
      const snap = await getDoc(pollRef);
      if (snap.exists()) {
        setPoll(snap.data());
      }
    };
    loadPoll();
  }, []);

  const createPoll = async () => {
    await setDoc(pollRef, {
      question: newQuestion,
      likes: 0,
      dislikes: 0
    });
    setPoll({ question: newQuestion, likes: 0, dislikes: 0 });
    setNewQuestion("");
  };

  const vote = async (type) => {
    if (!poll) return;

    const updatePoll = {
      question: poll.question,
      likes: poll.likes,
      dislikes: poll.dislikes
    };
  
    if (type === "likes") {
      updatePoll.likes += 1;
    } else if (type === "dislikes") {
      updatePoll.dislikes += 1;
    }

    await updateDoc(pollRef, { [type]: updatePoll[type] });
    setPoll(updatePoll);
  };

  const reset = async () => {
    await deleteDoc(pollRef);
    setPoll(null);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>poll</h1>

      {poll ? (
        <>
          <h2>{poll.question}</h2>
          <p>
            👍 : {poll.likes} &nbsp;&nbsp;&nbsp; 👎 : {poll.dislikes}
          </p>
          <button onClick={() => vote("likes")}>👍 like</button>
          <button onClick={() => vote("dislikes")} style={{ marginLeft: "1rem" }}>
            👎 dislike
          </button>
          <br />
          <button onClick={reset} style={{ marginTop: "1rem" }}>
            reset
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="enter topic"
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
          />
          <button onClick={createPoll} style={{ marginLeft: "1rem" }}>
            create poll
          </button>
        </>
      )}
    </div>
  );
}

export default App;