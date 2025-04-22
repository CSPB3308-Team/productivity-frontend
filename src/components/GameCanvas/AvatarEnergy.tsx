import { useContext, useEffect, useState } from 'react';
import styles from './GameCanvas.module.css';
import { TaskContext } from '../../pages/TaskPage/TaskPage';
import { TaskData } from '../../types';

export default function EnergyBar() {
  const { longTasks, shortTasks, dailyTasks } = useContext(TaskContext);
  const [tasks, setTasks] = useState<TaskData[] | null>(null);
  const [energy, setEnergy] = useState<Number>(0);

  const MAX_TIME = 48*3600*1000; // 48 hours in milliseconds

  useEffect(() => {
    var taskList: Array<TaskData> = [];
    var times: Array<number> = [];

    // add all task types to task array
    if (longTasks) taskList = taskList.concat(longTasks);
    if (shortTasks) taskList = taskList.concat(shortTasks);
    if (dailyTasks) taskList = taskList.concat(dailyTasks);

    setTasks(taskList);

    if (taskList.length > 0) {
      // find tasks that have been completed
      var tempTasks = taskList.filter(task => task.task_complete === true);

      // store dates of all completed tasks
      tempTasks?.filter((task) => {
        let d = new Date(task.due_date);
        times.push(d.getTime());
      })

      times?.sort((a, b) => a - b); // sorts numerically, rather than alphabatically

      if (times.length > 0) {
        let last = times[times.length-1]; // get last (most recent) completion
        let percent = (1 - (Date.now() - last) / MAX_TIME) * 100;
        if (percent > 100) {
          percent = 100;
        } else if (percent < 0) {
          percent = 0;
        }
        setEnergy(percent);
      }
    }

    // console.log(tasks)


  }, [longTasks, shortTasks, dailyTasks]);

  return (
    <div className={styles.energyBar}>
      <div className={styles.energyBarFill} style={{width: `${energy}%`}}>
      
      </div>
    </div>
  )
}





