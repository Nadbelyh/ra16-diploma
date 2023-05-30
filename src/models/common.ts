export interface Match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

export interface RouteComponentProps<P> {
  match?: Match<P>;
  location?: any;
  t?: any;
}

export interface AsyncState<D> {
  isFetching: boolean;
  error?: string;
  data?: D;
}
