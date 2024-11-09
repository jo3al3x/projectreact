import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  heading: {
    fontSize: '24px',
    margin: 0,
    color: '#333',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  buttonOutline: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#0066cc',
    border: '1px solid #0066cc',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: 'white',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  cardHeader: {
    padding: '15px 20px',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px 8px 0 0',
  },
  cardContent: {
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '100%',
    minHeight: '100px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  threadTitle: {
    fontSize: '18px',
    margin: '0 0 5px 0',
    color: '#333',
  },
  threadMeta: {
    fontSize: '12px',
    color: '#666',
  },
  repliesSection: {
    marginTop: '20px',
  },
  reply: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  replyContent: {
    margin: '0 0 8px 0',
  },
  replyMeta: {
    fontSize: '12px',
    color: '#666',
  },
  replyForm: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0',
  },
};

export const DiscussionBoard = () => {
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Common iPhone Issues",
      content: "What are some common iPhone issues you've encountered?",
      author: "John",
      date: "2024-01-01",
      replies: [
        {
          id: 1,
          content: "Battery drainage is the most common issue I've seen.",
          author: "Sarah",
          date: "2024-01-02"
        }
      ]
    }
  ]);
  const [newReply, setNewReply] = useState({ content: '', author: '' });
  const [showReplyForm, setShowReplyForm] = useState(null);

  const ThreadForm = () => {
    const [newThread, setNewThread] = useState({ title: '', content: '', author: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      const thread = {
        id: discussions.length + 1,
        ...newThread,
        date: new Date().toISOString().split('T')[0],
        replies: []
      };
      setDiscussions([...discussions, thread]);
      setNewThread({ title: '', content: '', author: '' });
      setShowNewThreadForm(false);
    };

    return (
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.threadTitle}>Create New Thread</h3>
        </div>
        <div style={styles.cardContent}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Your Name"
              value={newThread.author}
              onChange={(e) => setNewThread({ ...newThread, author: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Thread Title"
              value={newThread.title}
              onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
              required
              style={styles.input}
            />
            <textarea
              placeholder="Thread Content"
              value={newThread.content}
              onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
              required
              style={styles.textarea}
            />
            <button type="submit" style={styles.button}>Post Thread</button>
          </form>
        </div>
      </div>
    );
  };

  const ReplyForm = ({ threadId }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const reply = {
        id: Date.now(),
        ...newReply,
        date: new Date().toISOString().split('T')[0]
      };

      setDiscussions(discussions.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            replies: [...thread.replies, reply]
          };
        }
        return thread;
      }));

      setNewReply({ content: '', author: '' });
      setShowReplyForm(null);
    };

    return (
      <div style={styles.replyForm}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            value={newReply.author}
            onChange={(e) => setNewReply({ ...newReply, author: e.target.value })}
            required
            style={styles.input}
          />
          <textarea
            placeholder="Your Reply"
            value={newReply.content}
            onChange={(e) => setNewReply({ ...newReply, content: e.target.value })}
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.buttonOutline}>Post Reply</button>
        </form>
      </div>
    );
  };

  const Thread = ({ thread }) => {
    return (
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h4 style={styles.threadTitle}>{thread.title}</h4>
          <div style={styles.threadMeta}>Posted by {thread.author} on {thread.date}</div>
        </div>
        <div style={styles.cardContent}>
          <p>{thread.content}</p>

          <div style={styles.repliesSection}>
            <h5 style={styles.threadTitle}>Replies:</h5>
            {thread.replies.map(reply => (
              <div key={reply.id} style={styles.reply}>
                <p style={styles.replyContent}>{reply.content}</p>
                <div style={styles.replyMeta}>Reply by {reply.author} on {reply.date}</div>
              </div>
            ))}
          </div>

          {!showReplyForm && (
            <button
              style={{...styles.buttonOutline, marginTop: '20px'}}
              onClick={() => setShowReplyForm(thread.id)}
            >
              Reply
            </button>
          )}

          {showReplyForm === thread.id && <ReplyForm threadId={thread.id} />}
        </div>
      </div>
    );
  };

  const ThreadList = () => (
    <div>
      {discussions.map(thread => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Discussion Board</h1>
        <button
          style={styles.button}
          onClick={() => setShowNewThreadForm(!showNewThreadForm)}
        >
          Create New Thread
        </button>
      </div>

      {showNewThreadForm && <ThreadForm />}
      <ThreadList />
    </div>
  );
};

export default DiscussionBoard;