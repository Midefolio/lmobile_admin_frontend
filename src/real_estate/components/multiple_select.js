import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const MultiSelect = ({data, handleSelectChange}) => {
  const animatedComponents = makeAnimated();
  
  return ( <>
  <Select
    isMulti
    name="colors"
    // value={from ==='features' ? fea : cat}
    onChange={(e) => {handleSelectChange(e)}}
    components={animatedComponents}
    options={data}
    className="basic-multi-select"
    classNamePrefix=""
  />
  </> );
}
export default MultiSelect;
