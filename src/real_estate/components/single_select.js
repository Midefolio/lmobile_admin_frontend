import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const SingleSelect = ({data, handleSelectChange}) => {

  return ( <>
  <Select
    name="LGAS"
    // value={data[0]}
    onChange={(e)=> {handleSelectChange(e)}}
    options={data}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  </> );
}
export default SingleSelect;
