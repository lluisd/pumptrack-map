import * as React from 'react'
import Select from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import styles from './LanguageSelector.module.css'
import { useTranslation } from 'next-i18next'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LanguageSelector = ({handleLanguageChange}) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleChange = (event) => {
    const selectedLang = event.target.value
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: selectedLang })
  };

  return (
    <Box className={styles.languageSelector}>
      <FormControl variant="standard" sx={{ p: 0, minWidth: 30 }} size="small">
        <Select
          value={router.locale}
          label="Language"
          onChange={handleChange}
          autoWidth
          disableUnderline
        >
          <MenuItem value='en'>{t('english')}</MenuItem>
          <MenuItem value='es'>{t('spanish')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default LanguageSelector
