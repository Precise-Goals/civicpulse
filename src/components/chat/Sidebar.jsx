import React, { useEffect, useState } from "react";
import { fetchThreads } from "../../firebase/chatThreads";
import { formatDistanceToNow } from "date-fns";
import { deleteDoc, doc } from "firebase/firestore";
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
    <div className="w-64 h-screen overflow-y-auto border-r bg-white flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <span className="text-lg font-semibold">🧠 CivicPulse</span>
        <button
          onClick={onNewChat}
          className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
        >
          New Chat
        </button>
      </div>

      {threads.length === 0 && (
        <p className="p-4 text-sm text-gray-500">No chats yet.</p>
      )}

      <ul className="flex-1 overflow-auto">
        {threads.map((thread) => (
          <li
            key={thread.id}
            className={`group px-3 py-2 border-b text-sm flex justify-between items-start hover:bg-blue-50 ${
              currentThreadId === thread.id ? "bg-blue-100 font-medium" : ""
            }`}
          >
            <div
              onClick={() => onSelectThread(thread.id)}
              className="flex-1 cursor-pointer"
            >
              <p className="truncate">
                {thread.title || "Untitled conversation"}
              </p>
              {thread.createdAt?.seconds && (
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(
                    new Date(thread.createdAt.seconds * 1000),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>
              )}
            </div>
            <button
              onClick={() => handleDelete(thread.id)}
              className="text-red-500 text-xs hidden group-hover:inline ml-2"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
