function CountAnimation(props) {
  // label érték előtti szöveg, opcionális
  // number kötelező, int
  // duration kötelező, számlálás időtartama, int
  const {label, number, duration } = props.data

  const [count, setCount] = useState("0")
  const [s, setStart] = useState(0)
  const [color, setColor] = useState('#000')

  const colorBasic = '#000'
  const colorUp = '#1b5e20'
  const colorDown = '#b71c1c'

  useEffect(() => {
    if(number > s) setColor(colorUp);
    if(number < s) setColor(colorDown);
    if(number === s) setColor(colorBasic);
  }, [number])

  useEffect(() => {
    let start = s;
    const end = number;
    
    if (start === end) return

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      if (number > s) start += 1;
      if (number < s) start -= 1;
      setCount(start)
      if (start === end) {
        clearInterval(timer)
        setStart(start)
        setColor(colorBasic)
      }
    }, incrementTime);

  }, [number, duration]);

  return (
    <div>
      <h3>
        <i>{label} <span style={{ color: color }}>{count}</span></i>
      </h3>
    </div>
  );
}
