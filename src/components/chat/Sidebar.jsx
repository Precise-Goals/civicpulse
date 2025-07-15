import React, { useEffect, useState } from "react";
import { fetchThreads } from "../../firebase/chatThreads";
import { formatDistanceToNow } from "date-fns";
import { deleteDoc, doc } from "firebase/firestore";
import { MdDelete } from "react-icons/md";

import { db } from "../../firebase/config";

const Sidebar = ({ userId, currentThreadId, onSelectThread, onNewChat }) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const loadThreads = async () => {
      try {
        const data = await fetchThreads(userId);
        setThreads(data);
      } catch (err) {
        console.error("Failed to load threads:", err);
      }
    };
    if (userId) loadThreads();
  }, [userId, currentThreadId]);

  const handleDelete = async (threadId) => {
    const confirmed = confirm("Delete this chat?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, `chats/${userId}/threads/${threadId}`));
      setThreads((prev) => prev.filter((t) => t.id !== threadId));
      if (threadId === currentThreadId) onSelectThread(null);
    } catch (err) {
      console.error("Failed to delete thread:", err);
    }
  };

  return (
    <div className="SideBar" style={{ filter: "invert(1)" }}>
      <div className="sidehero">
        <img src="spark.png" alt="GeminiAPi" />
        <button onClick={onNewChat} className="nchat">
          New Chat
        </button>
      </div>
      <hr />

      {threads.length === 0 && <p className="NoChats">No chats yet.</p>}

      <ul className="threads">
        {threads.map((thread) => (
          <li
            key={thread.id}
            className={`group px-3 py-2 border-b text-sm flex justify-between items-start hover:bg-blue-50 ${
              currentThreadId === thread.id ? "thr" : ""
            }`}
          >
            <div onClick={() => onSelectThread(thread.id)} className="th1r">
              <p className="truncate">
                {thread.title || "Untitled conversation"}
              </p>
              {thread.createdAt?.seconds && (
                <p className="time">
                  {formatDistanceToNow(
                    new Date(thread.createdAt.seconds * 1000),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>
              )}
            </div>
            <button onClick={() => handleDelete(thread.id)} className="delete">
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
