import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from 'logic/authorization'
import { exportCSV } from 'logic/exportCSV'
import { exportJSON } from 'logic/exportJSON'
import { makeStyles } from '@mui/styles'
import SettingsIcon from '@mui/icons-material/Settings'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import BarChartIcon from '@mui/icons-material/BarChart'
import { Link } from 'react-router-dom'
import {
  Box,
  Divider,
  IconButton,
  IconButtonProps,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { Tooltip } from 'components/Tooltip'
import { useThemeType } from 'helpers/useThemeType'
import { sendEvent } from 'helpers/tracking'
import { resetData } from 'store/data'
import { clearLocalData } from 'logic/localData'
import { Confirm } from 'components/Confirm'

const useStyles = makeStyles(({ spacing }) => ({
  menuIcon: { marginRight: spacing(1) },
}))
type SettingsMenuProps = {
  showLinks?: boolean
  anchorEl: Element | null
  onClose: () => void
}
export const SettingsMenu: FC<SettingsMenuProps> = props => {
  const { anchorEl, onClose, showLinks } = props
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useThemeType()
  const handleThemeChange = () => {
    sendEvent('Settings: toggle theme')
    onClose()
    theme.toggle()
  }
  const handleExportCSV = () => {
    sendEvent('Settings: export csv')
    dispatch(exportCSV)
  }
  const handleExportJSON = () => {
    sendEvent('Settings: export json')
    dispatch(exportJSON)
  }
  const handleLogOut = () => {
    sendEvent('Settings: log out')
    dispatch(logOut())
  }
  const reloadData = () => {
    sendEvent('Settings: reload data')
    dispatch(resetData())
    dispatch(clearLocalData())
    window.location.reload()
  }
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem onClick={handleExportCSV}>
        <SaveAltIcon className={classes.menuIcon} color="action" />
        Скачать CSV
      </MenuItem>
      <MenuItem onClick={handleExportJSON}>
        <SaveAltIcon className={classes.menuIcon} color="action" />
        Полный бэкап
      </MenuItem>
      <Box my={1}>
        <Divider light />
      </Box>
      <MenuItem onClick={handleThemeChange}>
        {theme.type === 'dark' ? (
          <>
            <WbSunnyIcon className={classes.menuIcon} color="action" />
            Светлая тема
          </>
        ) : (
          <>
            <NightsStayIcon className={classes.menuIcon} color="action" />
            Тёмная тема
          </>
        )}
      </MenuItem>
      <Box my={1}>
        <Divider light />
      </Box>
      <MenuItem component={Link} to="/stats" key="/stats">
        <BarChartIcon className={classes.menuIcon} color="action" />
        Статистика (beta 😬)
      </MenuItem>

      {showLinks && [
        <MenuItem component={Link} to="/about" key="/about">
          <HelpOutlineIcon className={classes.menuIcon} color="action" />
          Как пользоваться
        </MenuItem>,
        <MenuItem component={Link} to="/donation" key="/donation">
          <FavoriteBorderIcon className={classes.menuIcon} color="action" />
          Поддержать проект
        </MenuItem>,
        <MenuItem component={Link} to="/review" key="/review">
          <WhatshotIcon className={classes.menuIcon} color="action" />
          Итоги года
        </MenuItem>,
      ]}
      <Box my={1} key="divider">
        <Divider light />
      </Box>
      <MenuItem onClick={handleLogOut}>
        <ExitToAppIcon className={classes.menuIcon} color="action" />
        Выйти
      </MenuItem>
      <Confirm onOk={reloadData}>
        <MenuItem>
          <ExitToAppIcon className={classes.menuIcon} color="action" />
          Перезагрузить данные
        </MenuItem>
      </Confirm>
      <Box pl={6} pr={2} py={0.5}>
        <Typography
          variant="overline"
          color="textSecondary"
          align="center"
          onClick={() => window.location.reload()}
        >
          {process.env.REACT_APP_VERSION}
        </Typography>
      </Box>
    </Menu>
  )
}

interface MenuButtonProps extends IconButtonProps {
  showLinks?: boolean
}

export const MenuButton: FC<MenuButtonProps> = ({ showLinks, ...rest }) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const handleClose = () => setAnchorEl(null)
  return (
    <>
      <Tooltip title="Настройки">
        <IconButton onClick={e => setAnchorEl(e.currentTarget)} {...rest}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <SettingsMenu
        anchorEl={anchorEl}
        onClose={handleClose}
        showLinks={showLinks}
      />
    </>
  )
}
