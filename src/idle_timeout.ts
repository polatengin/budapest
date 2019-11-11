import { Observable, Observer } from 'rxjs';

export class IdleTimeOut {

  private _tick_count: number = 0;
  private _interval: ReturnType<typeof setInterval>;

  private _observer: Observer<number>;

  public OnTick: Observable<number> = new Observable();

  public Reset = () => {
    this._tick_count = 0;
    if (this._observer) {
      this._observer.next(this._tick_count);
    }

    clearInterval(this._interval);
    this._interval = setInterval(() => { this._observer.next(++this._tick_count); }, 1000);
  }

  public static Current: IdleTimeOut = new IdleTimeOut();

  private constructor() {
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'load'].forEach((event) => {
      document.addEventListener(event, this.Reset , true);
    });

    this.OnTick = Observable.create((observer: Observer<number>) => { this._observer = observer });
  };

}
