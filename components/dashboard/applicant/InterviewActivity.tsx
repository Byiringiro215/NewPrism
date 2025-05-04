import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { format, subDays, eachDayOfInterval } from "date-fns"

// Mock data - in production this would come from your API
const generateMockData = () => {
  const today = new Date()
  const days = eachDayOfInterval({
    start: subDays(today, 364),
    end: today
  })

  return days.reduce((acc, date) => {
    const random = Math.random()
    let count = 0
    if (random > 0.9) count = 4
    else if (random > 0.7) count = 3
    else if (random > 0.5) count = 2
    else if (random > 0.8) count = 1
    
    acc[format(date, 'yyyy-MM-dd')] = count
    return acc
  }, {} as Record<string, number>)
}

const activityData = generateMockData()

const getActivityColor = (count: number) => {
  if (count === 0) return 'bg-white/5'
  if (count === 1) return 'bg-violet-900/50'
  if (count === 2) return 'bg-violet-700/50'
  if (count === 3) return 'bg-violet-500/50'
  return 'bg-violet-400/50'
}

const getActivityLabel = (count: number) => {
  if (count === 0) return 'No interviews'
  if (count === 1) return '1 interview'
  return `${count} interviews`
}

export default function InterviewActivity() {
  const weeks = []
  const today = new Date()
  let currentDate = subDays(today, 364)

  for (let i = 0; i < 52; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      const date = format(currentDate, 'yyyy-MM-dd')
      week.push({
        date,
        count: activityData[date] || 0
      })
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
    }
    weeks.push(week)
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Applications Activity</CardTitle>
            <CardDescription className="text-white/70">Your applications history over the past year</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="flex flex-col justify-end gap-[3px] text-xs text-white/50">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="flex gap-[3px]">
              <TooltipProvider>
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((day, dayIndex) => (
                      <Tooltip key={dayIndex}>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-3 h-3 rounded-sm ${getActivityColor(day.count)} hover:opacity-75 transition-opacity cursor-pointer`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">
                            {format(new Date(day.date), 'MMM d, yyyy')}: {getActivityLabel(day.count)}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-4">
          <span className="text-xs text-white/50">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-white/5" />
            <div className="w-3 h-3 rounded-sm bg-violet-900/50" />
            <div className="w-3 h-3 rounded-sm bg-violet-700/50" />
            <div className="w-3 h-3 rounded-sm bg-violet-500/50" />
            <div className="w-3 h-3 rounded-sm bg-violet-400/50" />
          </div>
          <span className="text-xs text-white/50">More</span>
        </div>
      </CardContent>
    </Card>
  )
}