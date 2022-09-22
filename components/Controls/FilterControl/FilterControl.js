import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import styles from './FilterControl.module.css'

const FilterControl = ({handleFilterChange}) => {
  const [value, setValue] = React.useState('all')

  const handleChange = (event) => {
    setValue(event.target.value)
    handleFilterChange(event.target.value)
  };

  return (
    <Box className={styles.filterControl}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="video" control={<Radio />} label="with Video VR" />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default FilterControl
