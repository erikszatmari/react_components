import React from 'react';
import 'react-day-picker/lib/style.css';

export default class DayFromTo extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.from === undefined && this.state.from != undefined) this.props.handleDayClick(this.state.from, 'fromValue')
    if(prevState.to === undefined && this.state.to != undefined) this.props.handleDayClick(this.state.to, 'toValue')
    if(prevState.from != undefined && this.state.from != prevState.from) this.props.handleDayClick(this.state.from, 'fromValue')
    if(prevState.to != undefined && this.state.to != prevState.to) this.props.handleDayClick(this.state.to, 'toValue')

    if(prevProps.days.from != this.props.days.from) {
        const d = this.props.days.from.toString()
        console.log(d.length)
        const date = new Date(this.props.days.from)
        if(d.length > 5) {
            if(!isNaN(date.getMonth())) {
                console.log(date.getDate())
                if(date.getDate() == "") console.log("nincs")
                if(d.length == 10) this.setState({ from: date})
                else this.setState({ from: undefined})
            }
        }
    }

    if(prevProps.days.to != this.props.days.to) {
        const d = this.props.days.to.toString()
        console.log(d.length)
        const date = new Date(this.props.days.to)
        if(d.length > 5) {
            if(!isNaN(date.getMonth())) {
                console.log(date.getDate())
                if(date.getDate() == "") console.log("nincs")
                if(d.length == 10) this.setState({ to: date})
                else this.setState({ to: undefined})
            }
        }
    }
  }

  handleDayClick(day) {
    const range = this.props.DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to, weekend: { daysOfWeek: [0,6] }, today: new Date() };
    const DayPicker = this.props.DayPicker

    const MONTHS = [
        'Január',
        'Február',
        'Március',
        'Április',
        'Május',
        'Június',
        'Július',
        'Augusztus',
        'Szeptember',
        'Október',
        'November',
        'December',
      ];
      const WEEKDAYS_LONG = [
        'Vasárnap',
        'Hétfő',
        'Kedd',
        'Szerda',
        'Csütörtök',
        'Péntek',
        'Szombat',
      ];
      const WEEKDAYS_SHORT = ['Vas', 'Hét', 'Kedd', 'Sze', 'Csüt', 'Pén', 'Szo'];
    
      const number = 1;
    
      const modifiersStyles = {
        today: {
          color: '#0170f3'
        }
      };

    return (
      <div className="RangeExample">
        <DayPicker
            className="Selectable"
            numberOfMonths={this.props.numberOfMonths}
            selectedDays={[from, { from, to }]}
            firstDayOfWeek={number}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            locale="hu"
            months={MONTHS}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}
