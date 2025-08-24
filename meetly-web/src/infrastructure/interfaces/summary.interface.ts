export interface WeeklyActivitySummary {
  completedTasks: number
  pendingTasks: number
  upcomingEvents: number
  weeklyProgress: number
  overdueTasks: number
  nearestTask?: {
    title: string
    dueDate: Date
  }
  nearestEvent?: {
    title: string
    startDate: Date
  }
  priorityDistribution: TaskPriorityDistribution
  trendComparedToLastWeek: number
  dailyAverageCompleted: number
  inProgressTasks: number
  pastEvents: number
}

export interface TaskPriorityDistribution {
  high: number
  medium: number
  low: number
}
