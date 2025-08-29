export default interface ServiceResponse<T> {
  status: number;
  data: T;
}
