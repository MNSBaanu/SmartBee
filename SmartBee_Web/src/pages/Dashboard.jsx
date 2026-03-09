import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Layout } from '../components/Layout';
import { Calendar, BookOpen, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react';
import { formatDistanceToNow, format, isToday, isTomorrow } from 'date-fns';

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCourses: 0,
    upcomingLectures: [],
    pendingAssignments: [],
    recentNotes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      const [coursesData, lecturesData, assignmentsData, notesData] = await Promise.all([
        supabase
          .from('courses')
          .select('count', { count: 'exact' })
          .eq('user_id', user.id),
        supabase
          .from('lectures')
          .select('*, courses(course_name, color_tag)')
          .eq('user_id', user.id)
          .gte('lecture_date', today)
          .order('lecture_date', { ascending: true })
          .limit(5),
        supabase
          .from('assignments')
          .select('*, courses(course_name, color_tag)')
          .eq('user_id', user.id)
          .eq('status', 'pending')
          .order('due_date', { ascending: true })
          .limit(5),
        supabase
          .from('notes')
          .select('*, lectures(lecture_title, lecture_date, courses(course_name))')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3),
      ]);

      setStats({
        totalCourses: coursesData.count || 0,
        upcomingLectures: lecturesData.data || [],
        pendingAssignments: assignmentsData.data || [],
        recentNotes: notesData.data || [],
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatLectureDate = (date) => {
    const d = new Date(date);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'MMM dd');
  };

  if (loading) {
    return <Layout><div className="text-center py-8">Loading dashboard...</div></Layout>;
  }

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Courses</p>
                <p className="text-4xl font-bold">{stats.totalCourses}</p>
              </div>
              <BookOpen size={40} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Upcoming Lectures</p>
                <p className="text-4xl font-bold">{stats.upcomingLectures.length}</p>
              </div>
              <Calendar size={40} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Pending Assignments</p>
                <p className="text-4xl font-bold">{stats.pendingAssignments.length}</p>
              </div>
              <AlertCircle size={40} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Recent Notes</p>
                <p className="text-4xl font-bold">{stats.recentNotes.length}</p>
              </div>
              <CheckCircle size={40} className="opacity-50" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Lectures</h2>
            {stats.upcomingLectures.length === 0 ? (
              <p className="text-gray-600">No upcoming lectures</p>
            ) : (
              <div className="space-y-3">
                {stats.upcomingLectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border-l-4"
                    style={{ borderLeftColor: lecture.courses?.color_tag || '#3b82f6' }}
                  >
                    <div className="flex-shrink-0">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">{formatLectureDate(lecture.lecture_date)}</p>
                        <p className="font-bold text-lg text-gray-800">{lecture.start_time.slice(0, 5)}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{lecture.lecture_title}</p>
                      <p className="text-sm text-gray-600">{lecture.courses?.course_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Assignments</h2>
            {stats.pendingAssignments.length === 0 ? (
              <p className="text-gray-600">No pending assignments</p>
            ) : (
              <div className="space-y-3">
                {stats.pendingAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-3 bg-gray-50 rounded-lg border-l-4"
                    style={{ borderLeftColor: assignment.courses?.color_tag || '#3b82f6' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{assignment.assignment_title}</p>
                        <p className="text-sm text-gray-600">{assignment.courses?.course_name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Due: {format(new Date(assignment.due_date), 'MMM dd, yyyy')}
                        </p>
                      </div>
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
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Notes</h2>
          {stats.recentNotes.length === 0 ? (
            <p className="text-gray-600">No notes yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.recentNotes.map((note) => (
                <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">
                    {note.lectures?.lectures_date && format(new Date(note.lectures.lecture_date), 'MMM dd')}
                  </p>
                  <p className="font-semibold text-gray-800 mb-2">{note.note_title}</p>
                  <p className="text-xs text-gray-600 line-clamp-2">{note.note_content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
