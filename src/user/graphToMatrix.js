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
  const [idaStartVal, setidaStartVal] = useState([])
  const [nodeGoalsLoc, setNodeGoalsLoc] = useState([[]])
  const [matrix, setmatrix] = useState([])
  const [heuristic, setheuristic] = useState([])
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
    setjohnsonVal((e)=> [...AlgoJohnson(matrix, nodeGoalsLoc), ...e])
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
    if (heuristic.length>0) {
      // AlgoIdaStar(matrix, heuristic, 0, nodeGoalsLoc[0][0])
      setidaStartVal((e)=>[...AlgoIdaStar(matrix, heuristic, 0, nodeGoalsLoc[0][0]),...e])
    }
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
        <thead>
          <tr>
            <th>
              Johnson Algorithm Calculation
            </th>
          </tr>
        </thead>
        <tbody>
          {johnsonVal.map((x,i)=>(
              <tr key={i}>
                <td>{x}</td>
              </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    
  )
}

export default GraphToMatrix