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
          name="row-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="Todos" />
          <FormControlLabel value="video" control={<Radio />} label="con Video" />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default FilterControl
