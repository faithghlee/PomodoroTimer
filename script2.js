const pomodoroTimer = document.querySelector("#pomodoro-timer"); //display the time value 
const startButton = document.querySelector('#pomodoro-start');
const pauseButton = document.querySelector('#pomodoro-pause');
const stopButton = document.querySelector('#pomodoro-stop');

let currentTaskLabel = document.querySelector('#pomodoro-clock-task'); //takes values from input task field -- 'Break' or 'Work' 

// START
startButton.addEventListener('click', () => {
    toggleClock();
  })
  
  // PAUSE
  pauseButton.addEventListener('click', () => {
    toggleClock();
  })
  
  // STOP
  stopButton.addEventListener('click', () => {
    toggleClock(true);
  })
  let updatedWorkSessionDuration;
  let updatedBreakSessionDuration;
  currentTaskLabel.innerText = "Work";
let type = 'Work'; // tracks whether we are currently in work or break mode. 

let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;

// in seconds = 5 mins;
let breakSessionDuration = 300;

  //Initialize --> clock is not running (False) and clock is not started (true)
  let isClockRunning = false;
  let isClockStopped = true; //clock is stopped could mean clock is paused or clock is actully paused. 
  let timeSpentInCurrentSession = 0;

  //We associate start, stop and pause event listener with toggleClock. 
  //When we stop the clock, we have the 1) reset the clock to the new work and break duration; 2) output to the list of sessions and 3) reset the appropriate variables. 
  //clearInterval is some built-in method 
  // If we press Pause, we want to be able to start from where we left off again. 

  const toggleClock = (reset) => {
    if (reset) {
      // STOP THE TIMER
      // this means the stopped button was pressed! 
      stopClock(); 
      setUpdatedTimers();

    } else {
        //either we have pressed start or we have pressed paused 
        // we have two variables isClockStopped and isClockRunning to determine that. 
        // we can pause and then start a new session 
        // if isClockStopped that means we are either starting a new session or its our first session 
        if (isClockStopped) {
            setUpdatedTimers();
            //first start 
            isClockStopped = false;
          }
        if (isClockRunning === true) {
        // pause
            clearInterval(clockTimer)
        // update icon to the play one
        // set the vale of the button to start or pause
            isClockRunning = false
        } else {
        // start
             //after pressing pause we resume 
            clockTimer = setInterval(() => {
            stepDown();
            displayCurrentTimeLeftInSession();
            }, 1000)
        isClockRunning = true
        }
    }
  }

  const setUpdatedTimers = () => {
    if (type === 'Work') {

      workSessionDuration = currentTimeLeftInSession
    } else {

      breakSessionDuration = currentTimeLeftInSession
    }
  }
  const displayCurrentTimeLeftInSession = () => {
  const secondsLeft = currentTimeLeftInSession;
  let result = '';
  const seconds = secondsLeft % 60;
  const minutes = parseInt(secondsLeft / 60) % 60;
  let hours = parseInt(secondsLeft / 3600);
  // add leading zeroes if it's less than 10
  function addLeadingZeroes(time) {
    return time < 10 ? `0${time}` : time
  }
  if (hours > 0) result += `${hours}:`
  result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
  pomodoroTimer.innerText = result.toString();
}
  const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
      // decrease time left / increase time spent
      timeSpentInCurrentSession++;
      currentTimeLeftInSession--;
      } else if (currentTimeLeftInSession === 0) {
        timeSpentInCurrentSession = 0;
        // Timer is over -> if work switch to break, viceversa
        if (type === 'Work') {
          currentTimeLeftInSession = breakSessionDuration;

          type = 'Break';
          currentTaskLabel.innerText = "Break";

        } else {
          currentTimeLeftInSession = workSessionDuration;
          type = 'Work';
            currentTaskLabel.innerText = "Work";

        }
      }
      displayCurrentTimeLeftInSession();
    }
    const stopClock = () => {
        // 1) reset the timer we set
       
        clearInterval(clockTimer);
        // 2) update our variable to know that the timer is stopped
        isClockRunning = false;
        // reset the time left in the session to its original state
        currentTimeLeftInSession = workSessionDuration; 
        // update the timer displayed
        displayCurrentTimeLeftInSession();

        type = "Work"
        timeSpentInCurrentSession = 0;
      }
