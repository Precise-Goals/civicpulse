import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./config";

// export const saveBlog = async (blogData) => {
//   try {
//     const blogRef = collection(db, "blogs");
//     await addDoc(blogRef, {
//       title: blogData.title,
//       content: blogData.content,
//       original_news_url: blogData.url,
//       generated_date: new Date(),
//     });
//   } catch (error) {
//     console.error("Error saving blog:", error);
//     throw error;
//   }
// };

// export const fetchBlogs = async () => {
//   try {
//     const blogRef = collection(db, "blogs");
//     const snapshot = await getDocs(blogRef);
//     return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     throw error;
//   }
// };

export const saveMessage = async (userId, message) => {
  try {
    const messagesRef = collection(db, `chats/${userId}/messages`);
    await addDoc(messagesRef, {
      text: message.text,
      sender: message.sender,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

export const fetchMessages = (userId, callback) => {
  try {
    const messagesRef = collection(db, `chats/${userId}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      callback(messages);
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};