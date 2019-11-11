import { IdleTimeOut } from './idle_timeout';

const $idle_time = document.getElementById('idle_time');

console.log(IdleTimeOut.Current);

IdleTimeOut.Current.Reset();

IdleTimeOut.Current.OnTick.subscribe(seconds => {
  console.log(IdleTimeOut.Current);

  if (seconds <= 4) {
    $idle_time.innerText = 'everything is fine! 😀';
  } else if (seconds > 20) {
    document.location.href = '/logout';
  } else {
    $idle_time.innerText = `page has not been used for ${seconds} seconds`;
  }
});
