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
  const ambilTempat = useCallback(
    (tempat) => {
      if (tempat){
      setData(tempat)}
    },
    []
  );
  let johnsonReturnResult = []
  useEffect(()=>{
    console.log("data");
    console.log(data);
    console.log(data.length);
    generateMatrix(data)
    generateHeuristic(data)
  })
  
  
  
  const generateMatrix=(result)=>{
    if(result.length){
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

      const matrix = keys.map((key) =>
        keys.map(
          (target) =>
            positions
              .flat(1)
              .filter(({ from, to }) => from === key && to === target)
              .map(({ value }) => value)[0] || 0
        )
      );

      console.log("matrix")
      console.log(matrix)
      johnsonReturnResult.push(...AlgoJohnson(matrix))
      // setjohnsonVal(johnsonReturnResult)
    }
  }
  
  
  console.log("johnsonReturnResult");
  console.log(johnsonReturnResult);
  
  console.log("johnsonReturnResult");
  
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

      console.log("heuristic")
      console.log(heuristic)
    }
  }
  return (
    <div className='content mainmenu-user'>
      <Final onChangePlace={ambilTempat} />
      <p>{johnsonReturnResult}</p>
      
      <table className='center'>
        <thead>
          <tr>
            <th>Location</th>
            <th>Distance (meter)</th>
            <th>Weight</th>
          </tr>
        </thead>
        {data.map((x,i)=>(
          <tbody key={i}>
            <tr>
              <td>{x.location??Math.floor(x.location)}</td>
              <td>{x.distance??Math.floor(x.distance)}</td>
              <td>{x.weight}</td>
            </tr>
          </tbody>
        ))}
      </table>
      {johnsonReturnResult}
      {johnsonVal.map((x,i)=>(<p key={i}>{x}</p>))}
      <p>ini adalah contoh</p>
    </div>
    
  )
}

export default GraphToMatrix