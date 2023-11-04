export interface DailyViewCount {
  date: Date;
  _sum: Count;
}
export interface WeeklyViewCount {
  start: Date;
  end: Date;
  count: number;
}
interface Count {
  count: number;
}
