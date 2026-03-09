import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Layout } from '../components/Layout';
import { Plus, Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';
import { format } from 'date-fns';

export const Assignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    course_id: '',
    assignment_title: '',
    description: '',
    due_date: '',
    due_time: '',
    priority: 'medium',
    status: 'pending',
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [coursesData, assignmentsData] = await Promise.all([
        supabase.from('courses').select('*').eq('user_id', user.id),
        supabase
          .from('assignments')
          .select('*, courses(course_name, color_tag)')
          .eq('user_id', user.id)
          .order('due_date', { ascending: true }),
      ]);

      if (coursesData.error) throw coursesData.error;
      if (assignmentsData.error) throw assignmentsData.error;

      setCourses(coursesData.data || []);
      setAssignments(assignmentsData.data || []);
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
          .from('assignments')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        setEditingId(null);
      } else {
        const { error } = await supabase.from('assignments').insert({
          ...formData,
          user_id: user.id,
        });
        if (error) throw error;
      }
      setFormData({
        course_id: '',
        assignment_title: '',
        description: '',
        due_date: '',
        due_time: '',
        priority: 'medium',
        status: 'pending',
      });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error('Error saving assignment:', error);
    }
  };

  const toggleStatus = async (assignment) => {
    const newStatus = assignment.status === 'pending' ? 'completed' : 'pending';
    try {
      const { error } = await supabase
        .from('assignments')
        .update({ status: newStatus })
        .eq('id', assignment.id);
      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this assignment?')) {
      try {
        const { error } = await supabase.from('assignments').delete().eq('id', id);
        if (error) throw error;
        loadData();
      } catch (error) {
        console.error('Error deleting assignment:', error);
      }
    }
  };

  const handleEdit = (assignment) => {
    setFormData({
      course_id: assignment.course_id,
      assignment_title: assignment.assignment_title,
      description: assignment.description,
      due_date: assignment.due_date,
      due_time: assignment.due_time || '',
      priority: assignment.priority,
      status: assignment.status,
    });
    setEditingId(assignment.id);
    setShowForm(true);
  };

  const filteredAssignments = assignments.filter(a => {
    if (filter === 'pending') return a.status === 'pending';
    if (filter === 'completed') return a.status === 'completed';
    return true;
  });

  if (loading) return <Layout><div className="text-center py-8">Loading assignments...</div></Layout>;

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                course_id: '',
                assignment_title: '',
                description: '',
                due_date: '',
                due_time: '',
                priority: 'medium',
                status: 'pending',
              });
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Assignment
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Assignment' : 'Add New Assignment'}</h2>
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
                placeholder="Assignment Title"
                value={formData.assignment_title}
                onChange={(e) => setFormData({ ...formData, assignment_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <input
                  type="time"
                  value={formData.due_time}
                  onChange={(e) => setFormData({ ...formData, due_time: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {editingId ? 'Update Assignment' : 'Add Assignment'}
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

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
        </div>

        {filteredAssignments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No assignments found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 ${
                  assignment.status === 'completed' ? 'opacity-60' : ''
                }`}
                style={{ borderLeftColor: assignment.courses?.color_tag || '#3b82f6' }}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleStatus(assignment)}
                        className="text-gray-400 hover:text-blue-600 transition"
                        title={assignment.status === 'completed' ? 'Mark pending' : 'Mark completed'}
                      >
                        {assignment.status === 'completed' ? (
                          <CheckCircle2 size={24} className="text-green-600" />
                        ) : (
                          <Circle size={24} />
                        )}
                      </button>
                      <div>
                        <h3 className={`text-lg font-bold ${assignment.status === 'completed' ? 'line-through text-gray-600' : 'text-gray-800'}`}>
                          {assignment.assignment_title}
                        </h3>
                        <p className="text-sm text-gray-600">{assignment.courses?.course_name}</p>
                      </div>
                    </div>
                    {assignment.description && (
                      <p className="text-sm text-gray-600 mt-2 ml-9">{assignment.description}</p>
                    )}
                    <div className="mt-2 ml-9 flex items-center gap-4 flex-wrap">
                      <span className="text-sm text-gray-600">Due: {format(new Date(assignment.due_date), 'MMM dd, yyyy')}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        assignment.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : assignment.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {assignment.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(assignment)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(assignment.id)}
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
