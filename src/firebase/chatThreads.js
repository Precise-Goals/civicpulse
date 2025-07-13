import {
  collection,
  addDoc,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./config";

// Save message under a thread (creates thread if it doesn't exist)
export const saveMessageToThread = async (userId, threadId, message, isFirstMessage = false) => {
  const threadRef = doc(db, `chats/${userId}/threads/${threadId}`);
  const messagesRef = collection(threadRef, "messages");

  if (isFirstMessage) {
    await setDoc(threadRef, {
      title: message.text.slice(0, 40),
      createdAt: serverTimestamp(),
    });
  }

  await addDoc(messagesRef, {
    ...message,
    timestamp: new Date(),
  });
};

// Fetch messages for a given thread
export const fetchThreadMessages = (userId, threadId, callback) => {
  const messagesRef = collection(db, `chats/${userId}/threads/${threadId}/messages`);
  const q = query(messagesRef, orderBy("timestamp", "asc"));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data());
    callback(messages);
  });
};

// Fetch all threads for sidebar
export const fetchThreads = async (userId) => {
  const threadsRef = collection(db, `chats/${userId}/threads`);
  const q = query(threadsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
