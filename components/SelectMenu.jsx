import React, { useCallback, useEffect } from 'react'

export default function SearchBar({onFilter, region}) {

  // const searchRegion= useMemo()
  const handleChange = useCallback((e) => {

    console.log(e.target.value);
  })


  return (
    <div className="search-container">
      <select onChange={(e)=>onFilter(e.target.value)}>
        <option value=''>Select Region [All Region] </option>)
        {Object.values(region).map((region)=> <option key={region} value={region}>{region}</option>)}
      </select>
    </div>
  )
} 