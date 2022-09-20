import React, { useCallback } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { generatePath } from 'react-router-dom';
import Final from './final'
import AlgoIdaStar from './algoIdaStar';
import AlgoJohnson from './algoJohnson';

const GraphToMatrix = () => {
  const [data, setData] = useState([]);
  const [johnsonVal, setjohnsonVal] = useState([])
  const [idaStarVal, setidaStarVal] = useState([])
  const [nodeGoalsLoc, setNodeGoalsLoc] = useState([[]])
  const [matrix, setmatrix] = useState([])
  const [heuristic, setheuristic] = useState([])
  const [johnsonPerformance, setjohnsonPerformance] = useState(0)
  const [idaStarPerformance, setidaStarPerformance] = useState(0)
  const [johnsonToggle, setjohnsonToggle] = useState(true)
  const [idaStarToggle, setidaStarToggle] = useState(true)
  const ambilTempat = useCallback(
    (tempat) => {
      if (tempat){
      setData(tempat)}
    },
    []
  );

  useEffect(()=>{
    // console.log("data");
    // console.log(data);
    // console.log(data.length);
    generateMatrix(data)
    generateHeuristic(data)
  },[data])
  
  const handleJohnson = (e)=>{
    setjohnsonToggle(!johnsonToggle)
    console.log(johnsonToggle);
  }
  const handleidaStar = (e)=>{
    setidaStarToggle(!idaStarToggle)
    console.log(idaStarToggle);
  }
  
  const generateMatrix=(result)=>{
    if(result.length){

      let nodeGoals = []
      const goals = []
      result.map((loc,index)=>{
          let steplength = (result[index].legs[0].steps.length);
          goals.push((loc.legs[0].steps[steplength-1].maneuver.location).toString())
      })
      // console.log(goals);
      
      const positions = result.map((route) => {
        const points = route.legs[0].steps.map((step) => ({
          position: `${step.maneuver.location[0]},${step.maneuver.location[1]}`,
          value: step.weight,
        }));

        const matrix = [];
        points.map((point, index) => {
          if (index < points.length - 1)
            matrix.push({
              from: point.position,
              to: points[index + 1].position,
              value: point.value,
            });
        });
        return matrix;
      });

      const keys = positions
        .map((points) => points.map(({ from, to }) => [from, to]))
        .flat(2)
        .filter((v, i, s) => s.indexOf(v) == i);

      keys.map((key,index)=>{
        goals.map((goal, indexGoal)=>{
            if (key===goal) {
              nodeGoals.push([index, result[indexGoal].location])
            }
        })
      })
        
      const matrix = keys.map((key) =>
        keys.map(
          (target) =>
            positions
              .flat(1)
              .filter(({ from, to }) => from === key && to === target)
              .map(({ value }) => value)[0] || 0
        )
      );

      setNodeGoalsLoc(nodeGoals)
      setmatrix(matrix)
      // setjohnsonVal((e)=> [...AlgoJohnson(matrix, nodeGoalsLoc), ...e])
    }
  }
  
  useEffect(() => {
    let a = performance.now()
    if (matrix.length>0) {
      setjohnsonVal((e)=> [...AlgoJohnson(matrix, nodeGoalsLoc), ...e])
    }
    let b = performance.now()
    setjohnsonPerformance(b-a)
  }, [matrix, nodeGoalsLoc])
  
  // console.log("usestate matrix");
  // console.log(matrix);
  // console.log("nodeGoalsLoc");
  // console.log(nodeGoalsLoc);
  
  const generateHeuristic=(result)=>{
    if(result.length){
      const positions = result.map((route) => {
        const points = route.legs[0].steps.map((step) => ({
          position: `${step.maneuver.location[0]},${step.maneuver.location[1]}`,
          value: step.distance,
        }));

        const heuristic = [];
        points.map((point, index) => {
          if (index < points.length - 1)
            heuristic.push({
              from: point.position,
              to: points[index + 1].position,
              value: point.value,
            });
        });
        return heuristic;
      });

      const keys = positions
        .map((points) => points.map(({ from, to }) => [from, to]))
        .flat(2)
        .filter((v, i, s) => s.indexOf(v) == i);

      const heuristic = keys.map((key) =>
        keys.map(
          (target) =>
            positions
              .flat(1)
              .filter(({ from, to }) => from === key && to === target)
              .map(({ value }) => value)[0] || 0
        )
      );
      setheuristic(heuristic)
    }
  }

  useEffect(() => {
    let a = performance.now()
    if (heuristic.length>0) {
      setidaStarVal((e)=>[...AlgoIdaStar(matrix, heuristic, nodeGoalsLoc),...e])
    }
    let b = performance.now()
    setidaStarPerformance(b-a)
  }, [matrix, heuristic, nodeGoalsLoc])
  
  // console.log("heuristic useState")
  // console.log(heuristic)

  return (
    <div className='content'>
      <Final onChangePlace={ambilTempat} />
      
      <table className='center'>
        <thead>
          <tr>
            <th>Location</th>
            <th>Distance (meter)</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody >
        {data.map((x,i)=>(
            <tr key={i}>
              <td>{x.location??Math.floor(x.location)}</td>
              <td>{x.distance??Math.floor(x.distance)}</td>
              <td>{x.weight}</td>
            </tr>
        ))}
        </tbody>
      </table>
      <table className='center'>
        <thead onClick={handleJohnson}>
          <tr>
            <th>
              Johnson Algorithm<br/>{johnsonVal[johnsonVal.length-1]}
            </th>
          </tr>
        </thead>
        {johnsonToggle?
        <tbody>
          {johnsonVal.map((x,i)=>(
              <tr key={i}>
                <td>{x}</td>
              </tr>
          ))}
        </tbody>:null}
      </table>
      
      <table className='center'>
        <thead onClick={handleidaStar}>
          <tr>
            <th>
              Iterative Deepening A Star Algorithm<br/>{idaStarVal[idaStarVal.length-1]}
            </th>
          </tr>
        </thead>
        {idaStarToggle?
        <tbody>
          {idaStarVal.map((x,i)=>(
              <tr key={i}>
                <td>{x}</td>
              </tr>
          ))}
        </tbody>:null}
      </table>
      
    </div>
    
  )
}

export default GraphToMatrix