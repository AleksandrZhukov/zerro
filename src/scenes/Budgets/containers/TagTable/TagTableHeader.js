import React from 'react'
import { Typography, Box, useMediaQuery, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  row: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: ({ isMobile }) =>
      isMobile ? 'auto 90px 16px' : 'auto 90px 90px 90px 16px',
    alignItems: 'center',
    gridColumnGap: ({ isMobile }) =>
      isMobile ? theme.spacing(0.5) : theme.spacing(2),
  },
}))

export default function TagTableHeader({
  metric = 'available',
  onToggleMetric,
  title = 'Категория',
  ...rest
}) {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const c = useStyles({ isMobile })
  const metrics = {
    budgeted: 'Бюджет',
    outcome: 'Расход',
    available: 'Доступно',
  }

  return (
    <Box p={2} pl={9.5} width="100%" className={c.row} {...rest}>
      <Typography variant="body2" color="textSecondary" noWrap>
        {title}
      </Typography>

      {isMobile ? (
        <Typography variant="body2" color="textSecondary" align="right" noWrap>
          <Link color="textSecondary" onClick={onToggleMetric}>
            {metrics[metric]}
          </Link>
        </Typography>
      ) : (
        <>
          <Typography
            variant="body2"
            color="textSecondary"
            align="right"
            noWrap
            children="Бюджет"
          />
          <Typography
            variant="body2"
            color="textSecondary"
            align="right"
            noWrap
            children="Расход"
          />

          <Typography
            variant="body2"
            color="textSecondary"
            align="right"
            noWrap
            children="Доступно"
          />
        </>
      )}
    </Box>
  )
}
