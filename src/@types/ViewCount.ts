export interface DailyViewCount {
  date: Date;
  _sum: Count;
}
export interface WeeklyViewCount {
  start: Date;
  end: Date;
  count: Count;
}
interface Count {
  count: number;
}
