export interface ApiResponse<T> {
  successs: boolean;
  message: string;
  data: T;
}
