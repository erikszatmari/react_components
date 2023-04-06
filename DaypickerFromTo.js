import React, { useEffect, useState, Fragment } from 'react';
import 'react-day-picker/lib/style.css';
import { format } from 'date-fns';
import DayPicker, { DateUtils } from 'react-day-picker';
import DayFromTo from './DayFromTo'

export default function DaypickerFromTo () {
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
  
    const handleDayClick = (day, state) => {
      if(day != undefined) {
          if(state == 'fromValue') setFromValue(format(day, 'y-MM-dd'))
          if(state == 'toValue') setToValue(format(day, 'y-MM-dd'))
      }
    }
  
    return <DayFromTo 
      DateUtils={DateUtils} 
      DayPicker={DayPicker}
      days={{from: fromValue, to: toValue}}
      handleDayClick={handleDayClick}/>
  }
