export interface DailyViewCount {
  id: number;
  date: Date;
  count: number;
  planetId: number;
}
export interface WeeklyViewCount {
  start: Date;
  end: Date;
  count: number;
}
interface Count {
  count: number;
}
