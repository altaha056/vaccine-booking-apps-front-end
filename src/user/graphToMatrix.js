import React, { useCallback } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { generatePath } from 'react-router-dom';
import Final from './final'
const GraphToMatrix = () => {
  const [data, setData] = useState([]);

  const ambilTempat = useCallback(
    (tempat) => {
      console.log("tempat");
      if (tempat){
      setData(tempat)}
      console.log(tempat);
    },
    []
  );
  
  useEffect(()=>{
    console.log("data");
    console.log(data);
    console.log(data.length);
    generateMatrix(data)
  })
  
  const generateMatrix=(result)=>{
    if(result.length){
      console.log("result");
      console.log(result);
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

      console.log(matrix)
    }
  }
  
  return (
    <div>
      <Final onChangePlace={ambilTempat} />
      <p>This page generate graph to matrix</p>
    </div>
    
  )
}

export default GraphToMatrix