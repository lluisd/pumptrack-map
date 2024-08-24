import React from "react";
import {useTranslation} from "next-i18next";
import Typography from "@mui/material/Typography";
import {Button, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import { useState, useEffect } from 'react'
import styles from './Contact.module.css'

const Contact = ({open, onClose}) => {
  const { t } = useTranslation('common')

  const handleClose = () => {
    onClose(false)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className={styles.contact}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {t('contact')}
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          {t('contact-text')} <strong><a href = "mailto: admin@pumptracks.311312.xyz">admin@pumptracks.311312.xyz</a></strong>
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default Contact



