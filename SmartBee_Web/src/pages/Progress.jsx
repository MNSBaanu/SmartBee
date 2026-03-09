import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Layout } from '../components/Layout';
import { BarChart3, TrendingUp, Award } from 'lucide-react';

export const Progress = () => {
  const { user } = useAuth();
  const [courseProgress, setCourseProgress] = useState([]);
  const [stats, setStats] = useState({
    totalLectures: 0,
    completedAssignments: 0,
    pendingAssignments: 0,
    totalNotes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProgressData();
    }
  }, [user]);

  const loadProgressData = async () => {
    try {
      const coursesResponse = await supabase
        .from('courses')
        .select('id, course_name, course_code, color_tag')
        .eq('user_id', user.id);

      if (coursesResponse.error) throw coursesResponse.error;

      const courses = coursesResponse.data || [];

      const progressData = await Promise.all(
        courses.map(async (course) => {
          const [lectures, assignments, notes] = await Promise.all([
            supabase
              .from('lectures')
              .select('count', { count: 'exact' })
              .eq('course_id', course.id),
            supabase
              .from('assignments')
              .select('status')
              .eq('course_id', course.id),
            supabase
              .from('notes')
              .select('count', { count: 'exact' })
              .eq('user_id', user.id),
          ]);

          const assignmentData = assignments.data || [];
          const completed = assignmentData.filter(a => a.status === 'completed').length;
          const total = assignmentData.length;
          const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

          return {
            ...course,
            totalLectures: lectures.count || 0,
            completedAssignments: completed,
            totalAssignments: total,
            completionPercentage,
            totalNotes: notes.count || 0,
          };
        })
      );

      setCourseProgress(progressData);

      const allAssignments = await supabase
        .from('assignments')
        .select('status')
        .eq('user_id', user.id);

      const allLectures = await supabase
        .from('lectures')
        .select('count', { count: 'exact' })
        .eq('user_id', user.id);

      const allNotes = await supabase
        .from('notes')
        .select('count', { count: 'exact' })
        .eq('user_id', user.id);

      const assignmentData = allAssignments.data || [];
      const completed = assignmentData.filter(a => a.status === 'completed').length;

      setStats({
        totalLectures: allLectures.count || 0,
        completedAssignments: completed,
        pendingAssignments: assignmentData.length - completed,
        totalNotes: allNotes.count || 0,
      });
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><div className="text-center py-8">Loading progress...</div></Layout>;

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Progress Tracking</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Lectures</p>
                <p className="text-4xl font-bold">{stats.totalLectures}</p>
              </div>
              <Award size={40} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Completed Assignments</p>
                <p className="text-4xl font-bold">{stats.completedAssignments}</p>
              </div>
              <TrendingUp size={40} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Pending Assignments</p>
                <p className="text-4xl font-bold">{stats.pendingAssignments}</p>
              </div>
              <BarChart3 size={40} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Notes</p>
                <p className="text-4xl font-bold">{stats.totalNotes}</p>
              </div>
              <Award size={40} className="opacity-50" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Progress</h2>

          {courseProgress.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No courses yet. Add courses to start tracking progress!</p>
          ) : (
            <div className="space-y-6">
              {courseProgress.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: course.color_tag }}
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{course.course_name}</h3>
                        <p className="text-sm text-gray-600">{course.course_code}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">{course.completionPercentage}%</p>
                      <p className="text-sm text-gray-600">Complete</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">Lectures</p>
                      <p className="text-2xl font-bold text-gray-800">{course.totalLectures}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">Assignments</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {course.completedAssignments}/{course.totalAssignments}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-600 mb-1">Notes</p>
                      <p className="text-2xl font-bold text-gray-800">{course.totalNotes}</p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r to-blue-600 from-blue-500 h-full transition-all duration-500"
                      style={{ width: `${course.completionPercentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-2">Overall Progress</h3>
              <p className="text-gray-600 text-sm">
                You've completed {stats.completedAssignments} out of {stats.completedAssignments + stats.pendingAssignments} assignments and attended {stats.totalLectures} lectures.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-bold text-gray-800 mb-2">Active Learning</h3>
              <p className="text-gray-600 text-sm">
                You've taken {stats.totalNotes} notes so far. Keep documenting your learning journey!
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
              <h3 className="font-bold text-gray-800 mb-2">Stay Motivated</h3>
              <p className="text-gray-600 text-sm">
                {stats.pendingAssignments > 0
                  ? `You have ${stats.pendingAssignments} pending assignments. Keep up the great work!`
                  : 'Great job! All assignments are complete. Focus on maintaining your progress!'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <h3 className="font-bold text-gray-800 mb-2">Study Recommendation</h3>
              <p className="text-gray-600 text-sm">
                Review your notes regularly and create summaries to solidify your learning and prepare for exams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
