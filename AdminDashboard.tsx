import React, { useState } from 'react';
import {
  User,
  Task,
  TaskAssignment,
  WithdrawalRequest,
  AuditLog,
  FAQItem,
  SponsorItem,
  MainCategory,
} from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { AdminChallengeManager } from './AdminChallengeManager';
import {
  ShieldAlert,
  Users,
  Briefcase,
  FileCheck2,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  Eye,
  Settings,
  HelpCircle,
  Building,
  KeyRound,
  FileText,
  AlertCircle,
  Download,
  Trophy,
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  tasks: Task[];
  users: User[];
  assignments: TaskAssignment[];
  withdrawals: WithdrawalRequest[];
  auditLogs: AuditLog[];
  faqs: FAQItem[];
  sponsors: SponsorItem[];
  onReviewSubmission: (
    assignmentId: string,
    action: 'accept' | 'request_revision' | 'reject',
    reason?: string
  ) => Promise<boolean>;
  onProcessWithdrawal: (
    withdrawalId: string,
    action: 'complete' | 'reject',
    note?: string
  ) => Promise<boolean>;
  onCreateTask: (taskData: Partial<Task>) => Promise<boolean>;
  onDeleteTask: (taskId: string) => Promise<boolean>;
  onUpdateUserRole: (userId: string, role: 'freelancer' | 'admin' | 'super_admin') => Promise<boolean>;
  onNavigate: (route: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  tasks,
  users,
  assignments,
  withdrawals,
  auditLogs,
  faqs,
  sponsors,
  onReviewSubmission,
  onProcessWithdrawal,
  onCreateTask,
  onDeleteTask,
  onUpdateUserRole,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'submissions' | 'tasks' | 'withdrawals' | 'users' | 'challenge' | 'audit'
  >('overview');

  // Submissions queue filter
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'under_review' | 'revision_required' | 'completed'>('under_review');
  const [selectedAssignment, setSelectedAssignment] = useState<TaskAssignment | null>(null);
  const [reviewReason, setReviewReason] = useState('');
  const [processingReview, setProcessingReview] = useState(false);

  // Withdrawal processing
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null);
  const [withdrawalNote, setWithdrawalNote] = useState('');
  const [processingWithdrawal, setProcessingWithdrawal] = useState(false);

  // Task creation state
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<MainCategory>('Writing');
  const [newTaskSubtype, setNewTaskSubtype] = useState('Article Writing');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPayment, setNewTaskPayment] = useState(15.0);
  const [newTaskWordCount, setNewTaskWordCount] = useState('800 - 1,200 Words');
  const [newTaskTime, setNewTaskTime] = useState('2 - 3 Hours');
  const [newTaskSlots, setNewTaskSlots] = useState(10);
  const [creatingTask, setCreatingTask] = useState(false);

  // User search
  const [userSearchQuery, setUserSearchQuery] = useState('');

  // Metrics
  const pendingSubmissions = assignments.filter((a) => a.status === 'under_review');
  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'pending');
  const totalEscrowHeld = users.reduce((acc, u) => acc + u.balance + u.pendingBalance, 0);

  const handleReviewAction = async (action: 'accept' | 'request_revision' | 'reject') => {
    if (!selectedAssignment) return;
    setProcessingReview(true);
    try {
      const success = await onReviewSubmission(selectedAssignment.id, action, reviewReason);
      if (success) {
        setSelectedAssignment(null);
        setReviewReason('');
      }
    } finally {
      setProcessingReview(false);
    }
  };

  const handleWithdrawalAction = async (action: 'complete' | 'reject') => {
    if (!selectedWithdrawal) return;
    setProcessingWithdrawal(true);
    try {
      const success = await onProcessWithdrawal(selectedWithdrawal.id, action, withdrawalNote);
      if (success) {
        setSelectedWithdrawal(null);
        setWithdrawalNote('');
      }
    } finally {
      setProcessingWithdrawal(false);
    }
  };

  const handleCreateTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingTask(true);
    try {
      const success = await onCreateTask({
        title: newTaskTitle,
        category: newTaskCategory,
        subtype: newTaskSubtype,
        description: newTaskDescription,
        payment: Number(newTaskPayment),
        wordCount: newTaskWordCount,
        estimatedTime: newTaskTime,
        totalSlots: Number(newTaskSlots),
        remainingSlots: Number(newTaskSlots),
        status: 'available',
        clientName: 'WEJOBS Editorial Client',
        clientRating: 5.0,
        objective: 'Commissioned editorial deliverable on WEJOBS platform.',
        targetAudience: 'Professional readership and digital subscribers.',
        instructions: ['Follow brief strictly', 'Ensure 100% original content', 'Proofread carefully'],
        structure: ['Title', 'Introduction', 'Key Points', 'Conclusion'],
        writingStyle: 'Professional, Engaging, and Structured',
        submissionFormat: 'DOCX / PDF / TXT',
        requirements: ['Originality', 'Accuracy'],
        restrictions: ['No unauthorized AI generation', 'No plagiarism'],
        acceptanceCriteria: 'Meets word count, clear grammar, and addresses objective.',
        revisionPolicy: 'Up to 2 revisions supported before final decision.',
      });

      if (success) {
        setCreateTaskModalOpen(false);
        setNewTaskTitle('');
        setNewTaskDescription('');
      }
    } finally {
      setCreatingTask(false);
    }
  };

  return (
    <div id="admin-dashboard" className="py-8 sm:py-12 bg-neutral-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-neutral-800/80 border border-neutral-700/80 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  WEJOBS Admin & Editorial Suite
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500 text-white uppercase">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Authenticated as {currentUser.email} • Full RBAC Management Controls
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreateTaskModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Task</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-neutral-800">
          {[
            { key: 'overview', label: 'Executive Overview', icon: <TrendingUp className="w-4 h-4" /> },
            {
              key: 'submissions',
              label: `Submissions Review (${pendingSubmissions.length})`,
              icon: <FileCheck2 className="w-4 h-4" />,
            },
            {
              key: 'withdrawals',
              label: `Withdrawals (${pendingWithdrawals.length})`,
              icon: <DollarSign className="w-4 h-4" />,
            },
            {
              key: 'tasks',
              label: `Task Catalog (${tasks.length})`,
              icon: <Briefcase className="w-4 h-4" />,
            },
            {
              key: 'users',
              label: `User Registry (${users.length})`,
              icon: <Users className="w-4 h-4" />,
            },
            {
              key: 'challenge',
              label: 'Monthly Challenge 🏆',
              icon: <Trophy className="w-4 h-4" />,
            },
            {
              key: 'audit',
              label: `Audit Logs (${auditLogs.length})`,
              icon: <Clock className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-neutral-800 text-orange-400 border-t-2 border-orange-500'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 1. Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-neutral-800/80 border border-neutral-700/80 space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase">Total Users</span>
                <p className="text-3xl font-black text-white">{users.length}</p>
                <p className="text-xs text-neutral-500">
                  {users.filter((u) => u.role === 'freelancer').length} Freelancers •{' '}
                  {users.filter((u) => u.role !== 'freelancer').length} Staff
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-800/80 border border-neutral-700/80 space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase">Live Tasks</span>
                <p className="text-3xl font-black text-orange-400">{tasks.length}</p>
                <p className="text-xs text-neutral-500">
                  {tasks.reduce((a, t) => a + t.remainingSlots, 0)} Total Available Slots
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-800/80 border border-neutral-700/80 space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase">
                  Pending Reviews
                </span>
                <p className="text-3xl font-black text-amber-400">
                  {pendingSubmissions.length}
                </p>
                <p className="text-xs text-neutral-500">Awaiting editorial verdict</p>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-800/80 border border-neutral-700/80 space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase">
                  Pending Withdrawals
                </span>
                <p className="text-3xl font-black text-emerald-400">
                  {pendingWithdrawals.length}
                </p>
                <p className="text-xs text-neutral-500">
                  ${pendingWithdrawals.reduce((a, w) => a + w.amount, 0).toFixed(2)} USD queued
                </p>
              </div>
            </div>

            {/* Quick Action Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Pending Submissions */}
              <div className="p-6 rounded-3xl bg-neutral-800/80 border border-neutral-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-orange-400" />
                    <span>Pending Submissions Queue</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className="text-xs text-orange-400 font-bold hover:underline"
                  >
                    View All
                  </button>
                </div>

                {pendingSubmissions.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-6 text-center">
                    All submitted deliverables have been reviewed.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {pendingSubmissions.slice(0, 4).map((sub) => (
                      <div
                        key={sub.id}
                        onClick={() => {
                          setSelectedAssignment(sub);
                          setActiveTab('submissions');
                        }}
                        className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-700/60 hover:border-orange-500 transition-colors cursor-pointer flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-white line-clamp-1">{sub.taskTitle}</p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            By User {sub.userId.substring(0, 8)}... • ${sub.payment.toFixed(2)} USD
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                          Review
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pending Withdrawals */}
              <div className="p-6 rounded-3xl bg-neutral-800/80 border border-neutral-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Pending Payout Requests</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('withdrawals')}
                    className="text-xs text-orange-400 font-bold hover:underline"
                  >
                    View All
                  </button>
                </div>

                {pendingWithdrawals.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-6 text-center">
                    No pending withdrawal requests.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {pendingWithdrawals.slice(0, 4).map((w) => (
                      <div
                        key={w.id}
                        onClick={() => {
                          setSelectedWithdrawal(w);
                          setActiveTab('withdrawals');
                        }}
                        className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-700/60 hover:border-emerald-500 transition-colors cursor-pointer flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-emerald-400">${w.amount.toFixed(2)} USD</p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            {w.method.toUpperCase()} • {w.accountDetails?.accountName || 'Beneficiary'}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Process
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. Submissions Review Tab */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Editorial Review Queue</h2>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setSubmissionFilter('under_review')}
                  className={`px-3 py-1.5 rounded-lg ${
                    submissionFilter === 'under_review' ? 'bg-orange-500 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  Under Review ({pendingSubmissions.length})
                </button>
                <button
                  onClick={() => setSubmissionFilter('all')}
                  className={`px-3 py-1.5 rounded-lg ${
                    submissionFilter === 'all' ? 'bg-orange-500 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  All ({assignments.length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Submissions List */}
              <div className="lg:col-span-1 space-y-3 max-h-[700px] overflow-y-auto">
                {assignments
                  .filter((a) => (submissionFilter === 'all' ? true : a.status === submissionFilter))
                  .map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setSelectedAssignment(a)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                        selectedAssignment?.id === a.id
                          ? 'bg-neutral-800 border-orange-500 ring-2 ring-orange-500/30'
                          : 'bg-neutral-850 bg-neutral-800/50 border-neutral-700 hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-400">${a.payment.toFixed(2)} USD</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold capitalize bg-neutral-700 text-neutral-300">
                          {a.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="font-bold text-white line-clamp-2">{a.taskTitle}</h4>
                      <p className="text-[11px] text-neutral-400">
                        Assigned to User: {a.userId.substring(0, 8)}...
                      </p>
                    </div>
                  ))}
              </div>

              {/* Detail Review Panel */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-neutral-800/90 border border-neutral-700 text-xs space-y-6">
                {selectedAssignment ? (
                  <>
                    <div className="flex items-center justify-between border-b border-neutral-700 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-orange-400 uppercase">
                          Assignment ID: {selectedAssignment.id}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1">
                          {selectedAssignment.taskTitle}
                        </h3>
                      </div>
                      <span className="text-xl font-black text-emerald-400">
                        ${selectedAssignment.payment.toFixed(2)} USD
                      </span>
                    </div>

                    {/* Deliverable details */}
                    <div className="space-y-3 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-700">
                      <h4 className="font-bold text-white uppercase text-[11px] flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-orange-400" />
                        <span>Submitted Deliverable File</span>
                      </h4>
                      <p className="text-neutral-300">
                        File: <span className="font-mono text-white">{selectedAssignment.fileName || 'No file attached'}</span>
                      </p>
                      {selectedAssignment.submissionNote && (
                        <p className="text-neutral-300">
                          Note: <span className="italic text-neutral-200">"{selectedAssignment.submissionNote}"</span>
                        </p>
                      )}
                      {selectedAssignment.referenceLink && (
                        <p className="text-neutral-300">
                          Link: <a href={selectedAssignment.referenceLink} target="_blank" rel="noreferrer" className="text-orange-400 underline">{selectedAssignment.referenceLink}</a>
                        </p>
                      )}
                    </div>

                    {/* Version history */}
                    {selectedAssignment.submissionVersions && selectedAssignment.submissionVersions.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-bold text-white uppercase text-[11px]">Submission Versions</h4>
                        <div className="space-y-1.5 font-mono text-[11px]">
                          {selectedAssignment.submissionVersions.map((v) => (
                            <div key={v.versionNumber} className="p-2 rounded bg-neutral-900 flex justify-between">
                              <span>v{v.versionNumber}: {v.fileName}</span>
                              <span className="text-neutral-400 capitalize">{v.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Review Feedback Box */}
                    <div className="space-y-2">
                      <label className="block font-bold text-white uppercase text-[11px]">
                        Editorial Decision Feedback / Revision Notes
                      </label>
                      <textarea
                        rows={3}
                        value={reviewReason}
                        onChange={(e) => setReviewReason(e.target.value)}
                        placeholder="Provide reasons for acceptance, required revision changes, or rejection justification..."
                        className="w-full p-3 rounded-xl border border-neutral-700 bg-neutral-900 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>

                    {/* Review Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        disabled={processingReview}
                        onClick={() => handleReviewAction('accept')}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept & Disburse ${selectedAssignment.payment.toFixed(2)} USD</span>
                      </button>

                      <button
                        type="button"
                        disabled={processingReview}
                        onClick={() => handleReviewAction('request_revision')}
                        className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Request Revision</span>
                      </button>

                      <button
                        type="button"
                        disabled={processingReview}
                        onClick={() => handleReviewAction('reject')}
                        className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject Deliverable</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16 text-neutral-500">
                    Select a submission from the left queue to inspect deliverable files and issue verdicts.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Monetary Payout Verification Queue</h2>

            <div className="p-6 rounded-3xl bg-neutral-800/80 border border-neutral-700 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-700 text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">User ID</th>
                    <th className="py-3 px-3">Method</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Recipient Details</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700/60">
                  {withdrawals.map((w) => (
                    <tr key={w.id} className="hover:bg-neutral-700/30">
                      <td className="py-3 px-3 text-neutral-400 whitespace-nowrap">
                        {new Date(w.requestedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-neutral-300">
                        {w.userId.substring(0, 10)}...
                      </td>
                      <td className="py-3 px-3 uppercase font-bold text-neutral-200">
                        {w.method.replace('_', ' ')}
                      </td>
                      <td className="py-3 px-3 font-black text-emerald-400 text-sm whitespace-nowrap">
                        ${w.amount.toFixed(2)} USD
                      </td>
                      <td className="py-3 px-3 text-neutral-300">
                        <span className="font-semibold">{w.accountDetails?.accountName}</span> (
                        {w.accountDetails?.accountNumber || w.accountDetails?.accountIdentifier || w.accountDetails?.walletAddress})
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                            w.status === 'completed'
                              ? 'bg-emerald-950 text-emerald-300'
                              : w.status === 'rejected'
                              ? 'bg-rose-950 text-rose-300'
                              : 'bg-amber-950 text-amber-300'
                          }`}
                        >
                          {w.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2 whitespace-nowrap">
                        {w.status === 'pending' && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedWithdrawal(w);
                                handleWithdrawalAction('complete');
                              }}
                              className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
                            >
                              Approve & Disburse
                            </button>
                            <button
                              onClick={() => {
                                setSelectedWithdrawal(w);
                                handleWithdrawalAction('reject');
                              }}
                              className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. Task Catalog CRUD Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Full Task Catalog ({tasks.length} tasks)</h2>
                <p className="text-xs text-neutral-400">Live atomic slot capacity and discipline management.</p>
              </div>
              <button
                onClick={() => setCreateTaskModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Create Task
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-neutral-800/80 border border-neutral-700 max-h-[700px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-700 text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-3">Title & Category</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3">Slots (Remaining / Total)</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700/60">
                  {tasks.slice(0, 100).map((t) => (
                    <tr key={t.id} className="hover:bg-neutral-700/30">
                      <td className="py-3 px-3 max-w-sm">
                        <p className="font-bold text-white truncate">{t.title}</p>
                        <p className="text-[11px] text-neutral-400">{t.category} • {t.subtype}</p>
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-400">${t.payment.toFixed(2)} USD</td>
                      <td className="py-3 px-3 font-semibold text-neutral-200">{t.remainingSlots} / {t.totalSlots}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          t.status === 'available' ? 'bg-emerald-950 text-emerald-300' : 'bg-neutral-700 text-neutral-300'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => onDeleteTask(t.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/60 rounded"
                          title="Delete Task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. User Registry Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Registered Users & Role Management</h2>
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="Search user name or email..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-neutral-800/80 border border-neutral-700 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-700 text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-3">User</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Available Balance</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3 text-right">Change Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700/60">
                  {users
                    .filter((u) =>
                      userSearchQuery
                        ? u.fullName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
                        : true
                    )
                    .map((u) => (
                      <tr key={u.id} className="hover:bg-neutral-700/30">
                        <td className="py-3 px-3 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <AvatarDisplay user={u} size="xs" />
                            <span>{u.fullName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-neutral-300 font-mono text-[11px]">{u.email}</td>
                        <td className="py-3 px-3 font-bold text-emerald-400">${u.balance.toFixed(2)} USD</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-700 text-neutral-200">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <select
                            value={u.role}
                            onChange={(e) => onUpdateUserRole(u.id, e.target.value as any)}
                            className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs text-white"
                          >
                            <option value="freelancer">Freelancer</option>
                            <option value="admin">Admin</option>
                            <option value="super_admin">Super Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. Audit Logs Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Immutable Platform Audit Trail</h2>
            <div className="p-6 rounded-3xl bg-neutral-800/80 border border-neutral-700 max-h-[700px] overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-neutral-700 text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Action</th>
                    <th className="py-3 px-3">Actor</th>
                    <th className="py-3 px-3">Target</th>
                    <th className="py-3 px-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700/60 text-[11px]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-neutral-700/30">
                      <td className="py-2.5 px-3 text-neutral-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-orange-400 font-bold">{log.action}</td>
                      <td className="py-2.5 px-3 text-neutral-300">{log.actorEmail}</td>
                      <td className="py-2.5 px-3 text-neutral-400">{log.targetId || '-'}</td>
                      <td className="py-2.5 px-3 text-neutral-300 max-w-xs truncate">
                        {JSON.stringify(log.details)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Challenge Management Tab */}
        {activeTab === 'challenge' && (
          <AdminChallengeManager currentUser={currentUser} />
        )}
      </div>

      {/* Create Task Modal */}
      {createTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-3xl p-6 sm:p-8 my-8 text-white space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold">Publish New Writing Commission</h3>
            <form onSubmit={handleCreateTaskSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                  placeholder="e.g. Comparative Analysis of Renewable Energy Storage"
                  className="w-full p-2.5 rounded-xl border border-neutral-700 bg-neutral-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-neutral-700 bg-neutral-800 text-white"
                  >
                    <option value="Writing">Writing</option>
                    <option value="Creative Writing">Creative Writing</option>
                    <option value="Editing">Editing</option>
                    <option value="Research & Writing">Research & Writing</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Subtype</label>
                  <input
                    type="text"
                    value={newTaskSubtype}
                    onChange={(e) => setNewTaskSubtype(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-neutral-700 bg-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Payment (USD)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newTaskPayment}
                    onChange={(e) => setNewTaskPayment(Number(e.target.value))}
                    required
                    className="w-full p-2.5 rounded-xl border border-neutral-700 bg-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Word Count</label>
                  <input
                    type="text"
                    value={newTaskWordCount}
                    onChange={(e) => setNewTaskWordCount(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-neutral-700 bg-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Total Slots</label>
                  <input
                    type="number"
                    value={newTaskSlots}
                    onChange={(e) => setNewTaskSlots(Number(e.target.value))}
                    required
                    className="w-full p-2.5 rounded-xl border border-neutral-700 bg-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Task Description</label>
                <textarea
                  rows={3}
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-neutral-700 bg-neutral-800 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-700 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingTask}
                  className="px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold cursor-pointer"
                >
                  {creatingTask ? 'Publishing...' : 'Publish Task into Escrow'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
