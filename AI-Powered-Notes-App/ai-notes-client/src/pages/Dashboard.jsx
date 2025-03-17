import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../index.css'; 
import Chatbox from './Chatbox';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/notes', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const generateSummary = async (noteId, content) => {
    try {
      const res = await axios.post(
        'http://localhost:3001/api/ai/summarize',
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const summary = res.data.summary;

      await axios.put(
        `http://localhost:3001/api/notes/${noteId}`,
        { summary },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      toast.success('Summary generated!');
      fetchNotes();
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate summary');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
  
    setLoading(true); 
  
    try {
      if (editingNoteId) {
        await axios.put(
          `http://localhost:3001/api/notes/${editingNoteId}`,
          { title, content },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        toast.success('Note updated successfully!');
      } else {
        await axios.post(
          'http://localhost:3001/api/notes',
          { title, content },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        toast.success('Note created successfully!');
      }
  
      setTitle('');
      setContent('');
      setEditingNoteId(null);
      fetchNotes();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save note.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Note deleted!');
      fetchNotes();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete note.');
    }
  };

  const handleLogout = () => {
    toast.success('Logged out!');
    logout();
  };

  return (
<div style={{ display: 'flex' }}>
  <div className="dashboard-container">
    <div className="dashboard-header">
      <h2>📝 My Notes</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>

    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Title"
        className="input-field"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        className="textarea-field"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Saving...' : editingNoteId ? 'Update Note' : 'Add Note'}
      </button>
    </form>

    <div className="notes-list">
      {notes.length === 0 && <p className="no-notes">No notes yet. Start writing!</p>}
      {notes.map((note) => (
        <div key={note._id} className="note-card">
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          {note.summary && (
            <div className="note-summary">
              <strong>Summary:</strong> {note.summary}
            </div>
          )}
          <div className="note-actions">
            <button onClick={() => handleEdit(note)} className="edit-btn">Edit</button>
            <button onClick={() => handleDelete(note._id)} className="delete-btn">Delete</button>
            {/* <button onClick={() => generateSummary(note._id, note.content)} className="summary-btn">Generate Summary</button> */}
          </div>
        </div>
      ))}
    </div>
  </div>
    <Chatbox/>
</div>

  );
};

export default Dashboard;
