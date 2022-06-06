import { select, arc} from 'd3'
import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [sliderValue, setSliderValue] = useState(80)
  const containerRef = useRef(null)

  useEffect(() => {
    drawChart(sliderValue)
  }, [sliderValue])

    function handleChange(e){
      setSliderValue(e.target.value)
    }

    function drawChart(value){
      const height = 350, width=960;
      const tau = 2 * Math.PI;
      const maxValue = 100;
      const slice = value/maxValue
      const  innerRadius= 90, outerRadius= 120, startAngle= 0, cornerRadius= 40;

      select("svg").remove()

      const svg = select(containerRef.current)
                  .append('svg')
                  .attr('height', '60%')
                  .attr('width', '100%')
                  .attr("viewBox", `0 0 ${width} ${height}`)
                  .append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        // An arc will be created
      const arcGen = arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(startAngle)
          .cornerRadius(cornerRadius)

      const arc1 = svg.append("path")
          .datum({endAngle: tau})
          .style("fill", "#ddd")
          .attr("d", arcGen);


      const foreground = svg.append("path")
          .datum({endAngle: slice * tau})
          .attr('fill', '#F57B21')
          .attr("d", arcGen);

      svg.append("text")
          .attr("text-anchor", "middle")
          .text(`${value}%`)
          .style('font-size', '3.2em')
          .style('fill', '#A9BF51');

      svg.append("text")
          .attr("text-anchor", "middle")
          .text("Sales")
          .attr('dy', '1.45em')
          .style('font-size', '1.75em');
      }


  return (
    <div className='container'>
        <div ref={containerRef}></div>
        <div className="slidecontainer"> 
          <div className='salesfigure'>{sliderValue}</div>
          <input type="range" min="0" max="100" value={sliderValue}  onChange={handleChange}/>
        </div>
    </div>
  );
}

export default App;
