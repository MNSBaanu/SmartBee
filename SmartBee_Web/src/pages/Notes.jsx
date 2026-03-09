import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Layout } from '../components/Layout';
import { Plus, Trash2, CreditCard as Edit2, Star, Zap } from 'lucide-react';
import { format } from 'date-fns';

export const Notes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [generatingSummary, setGeneratingSummary] = useState(null);
  const [formData, setFormData] = useState({
    lecture_id: '',
    note_title: '',
    note_content: '',
    tags: '',
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [lecturesData, notesData] = await Promise.all([
        supabase
          .from('lectures')
          .select('id, lecture_title, lecture_date, courses(course_name)')
          .eq('user_id', user.id)
          .order('lecture_date', { ascending: false }),
        supabase
          .from('notes')
          .select('*, lectures(lecture_title, lecture_date, courses(course_name))')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
      ]);

      if (lecturesData.error) throw lecturesData.error;
      if (notesData.error) throw notesData.error;

      setLectures(lecturesData.data || []);
      setNotes(notesData.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async (noteId, content) => {
    setGeneratingSummary(noteId);
    try {
      const summary = await generateAISummary(content);

      const { error } = await supabase
        .from('notes')
        .update({ ai_summary: summary })
        .eq('id', noteId);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Could not generate summary. Please try again.');
    } finally {
      setGeneratingSummary(null);
    }
  };

  const generateAISummary = async (text) => {
    if (!text || text.trim().length === 0) {
      return 'No content to summarize.';
    }

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const keyPoints = sentences
      .sort((a, b) => b.split(' ').length - a.split(' ').length)
      .slice(0, 3)
      .map(s => s.trim());

    return `Key Points:\n${keyPoints.map(p => `• ${p}`).join('\n')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
        : [];

      if (editingId) {
        const { error } = await supabase
          .from('notes')
          .update({
            ...formData,
            tags: tagsArray,
          })
          .eq('id', editingId);
        if (error) throw error;
        setEditingId(null);
      } else {
        const { error } = await supabase.from('notes').insert({
          ...formData,
          user_id: user.id,
          tags: tagsArray,
        });
        if (error) throw error;
      }

      setFormData({
        lecture_id: '',
        note_title: '',
        note_content: '',
        tags: '',
      });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const toggleFavorite = async (note) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ is_favorite: !note.is_favorite })
        .eq('id', note.id);
      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this note?')) {
      try {
        const { error } = await supabase.from('notes').delete().eq('id', id);
        if (error) throw error;
        loadData();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleEdit = (note) => {
    setFormData({
      lecture_id: note.lecture_id,
      note_title: note.note_title,
      note_content: note.note_content,
      tags: note.tags ? note.tags.join(', ') : '',
    });
    setEditingId(note.id);
    setShowForm(true);
  };

  const filteredNotes = notes.filter(note =>
    note.note_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.note_content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  if (loading) return <Layout><div className="text-center py-8">Loading notes...</div></Layout>;

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">AI-Powered Notes</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                lecture_id: '',
                note_title: '',
                note_content: '',
                tags: '',
              });
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Note
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search notes by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Note' : 'Add New Note'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={formData.lecture_id}
                onChange={(e) => setFormData({ ...formData, lecture_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Lecture (or create standalone note)</option>
                {lectures.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.lecture_title} - {l.courses?.course_name} ({format(new Date(l.lecture_date), 'MMM dd')})
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Note Title"
                value={formData.note_title}
                onChange={(e) => setFormData({ ...formData, note_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

              <textarea
                placeholder="Note Content (detailed notes here...)"
                value={formData.note_content}
                onChange={(e) => setFormData({ ...formData, note_content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows="6"
                required
              />

              <input
                type="text"
                placeholder="Tags (comma-separated, e.g., biology, important, chapter-5)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {editingId ? 'Update Note' : 'Add Note'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No notes found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div key={note.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        {note.lectures?.courses?.course_name}
                      </p>
                      <h3 className="text-lg font-bold text-gray-800">{note.note_title}</h3>
                    </div>
                    <button
                      onClick={() => toggleFavorite(note)}
                      className="text-gray-400 hover:text-yellow-500 transition ml-2"
                      title="Toggle favorite"
                    >
                      <Star
                        size={20}
                        fill={note.is_favorite ? 'currentColor' : 'none'}
                        className={note.is_favorite ? 'text-yellow-500' : ''}
                      />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">{note.note_content}</p>

                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {note.ai_summary && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded p-3 mb-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-900 mb-1">AI Summary:</p>
                      <p className="text-xs text-blue-800 line-clamp-3 whitespace-pre-wrap">{note.ai_summary}</p>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mb-4">
                    {format(new Date(note.created_at), 'MMM dd, yyyy')}
                  </p>
                </div>

                <div className="flex gap-1 p-3 border-t border-gray-200">
                  <button
                    onClick={() => generateSummary(note.id, note.note_content)}
                    disabled={generatingSummary === note.id}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-2 rounded transition disabled:opacity-50 text-sm"
                    title="Generate AI Summary"
                  >
                    <Zap size={16} />
                    {generatingSummary === note.id ? 'Generating...' : 'Summarize'}
                  </button>
                  <button
                    onClick={() => handleEdit(note)}
                    className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 py-2 rounded transition"
                    title="Edit"
                  >
                    <Edit2 size={16} className="mx-auto" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 py-2 rounded transition"
                    title="Delete"
                  >
                    <Trash2 size={16} className="mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
