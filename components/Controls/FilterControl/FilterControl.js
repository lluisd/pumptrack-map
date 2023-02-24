import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import styles from './FilterControl.module.css'
import { useTranslation } from 'next-i18next'

const FilterControl = ({handleFilterChange}) => {
  const { t } = useTranslation('common')
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
          <FormControlLabel value="all" control={<Radio />} label={t('all')} />
          <FormControlLabel value="video" control={<Radio />} label={t('with-video')} />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default FilterControl
