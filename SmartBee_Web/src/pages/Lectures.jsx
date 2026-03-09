import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Layout } from '../components/Layout';
import { Plus, Trash2, Edit2, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const Lectures = () => {
  const { user } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    course_id: '',
    lecture_title: '',
    lecture_date: '',
    start_time: '',
    end_time: '',
    location: '',
    lecture_type: 'lecture',
    description: '',
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [coursesData, lecturesData] = await Promise.all([
        supabase.from('courses').select('*').eq('user_id', user.id),
        supabase
          .from('lectures')
          .select('*, courses(course_name, color_tag)')
          .eq('user_id', user.id)
          .order('lecture_date', { ascending: false }),
      ]);

      if (coursesData.error) throw coursesData.error;
      if (lecturesData.error) throw lecturesData.error;

      setCourses(coursesData.data || []);
      setLectures(lecturesData.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase
          .from('lectures')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        setEditingId(null);
      } else {
        const { error } = await supabase.from('lectures').insert({
          ...formData,
          user_id: user.id,
        });
        if (error) throw error;
      }
      setFormData({
        course_id: '',
        lecture_title: '',
        lecture_date: '',
        start_time: '',
        end_time: '',
        location: '',
        lecture_type: 'lecture',
        description: '',
      });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error('Error saving lecture:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this lecture?')) {
      try {
        const { error } = await supabase.from('lectures').delete().eq('id', id);
        if (error) throw error;
        loadData();
      } catch (error) {
        console.error('Error deleting lecture:', error);
      }
    }
  };

  const handleEdit = (lecture) => {
    setFormData({
      course_id: lecture.course_id,
      lecture_title: lecture.lecture_title,
      lecture_date: lecture.lecture_date,
      start_time: lecture.start_time,
      end_time: lecture.end_time,
      location: lecture.location,
      lecture_type: lecture.lecture_type,
      description: lecture.description,
    });
    setEditingId(lecture.id);
    setShowForm(true);
  };

  if (loading) return <Layout><div className="text-center py-8">Loading lectures...</div></Layout>;

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Lectures</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                course_id: '',
                lecture_title: '',
                lecture_date: '',
                start_time: '',
                end_time: '',
                location: '',
                lecture_type: 'lecture',
                description: '',
              });
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Lecture
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Lecture' : 'Add New Lecture'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={formData.course_id}
                onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.course_name}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Lecture Title"
                value={formData.lecture_title}
                onChange={(e) => setFormData({ ...formData, lecture_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.lecture_date}
                  onChange={(e) => setFormData({ ...formData, lecture_date: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <select
                  value={formData.lecture_type}
                  onChange={(e) => setFormData({ ...formData, lecture_type: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="lecture">Lecture</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="lab">Lab</option>
                  <option value="seminar">Seminar</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <input
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Location (e.g., Room 101)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {editingId ? 'Update Lecture' : 'Add Lecture'}
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

        {lectures.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No lectures scheduled yet!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4"
                style={{ borderLeftColor: lecture.courses?.color_tag || '#3b82f6' }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div>
                        <p className="text-sm text-gray-600">{lecture.courses?.course_name}</p>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{lecture.lecture_title}</h3>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Clock size={16} />
                            {format(new Date(lecture.lecture_date), 'MMM dd, yyyy')} from {lecture.start_time} to {lecture.end_time}
                          </p>
                          {lecture.location && (
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <MapPin size={16} />
                              {lecture.location}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-2 bg-gray-100 px-2 py-1 rounded w-fit">
                            {lecture.lecture_type}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(lecture)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(lecture.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
