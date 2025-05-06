/**
 * App.js
 *
 * Root component of the application.
 * Applies global MUI theming (via ThemeProvider) and centers the main opportunities list.
 */
import React, { useState } from 'react';
import OpportunitiesList from './components/OpportunitiesList';
import opportunities from './data/OpportunitiesJSON';
import { useTheme, useMediaQuery, Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, BottomNavigation, BottomNavigationAction } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 112;

// App component: wraps OpportunitiesList in theme and positions it in the viewport.
function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [navValue, setNavValue] = useState('portfolio');
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {!isMobile && (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Primary offerings
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: isMobile ? '100%' : drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: isMobile ? '100%' : drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItemButton sx={{ flexDirection: 'column', py: 2 }}>
                <ListItemIcon sx={{ minWidth: 0, mb: 0.5 }}><GridViewIcon /></ListItemIcon>
                <ListItemText primary="Portfolio" sx={{ textAlign: 'center' }}/>
              </ListItemButton>
              <ListItemButton sx={{ flexDirection: 'column', py: 2 }}>
                <ListItemIcon sx={{ minWidth: 0, mb: 0.5 }}><ShowChartIcon /></ListItemIcon>
                <ListItemText primary="Invest" sx={{ textAlign: 'center' }}/>
              </ListItemButton>
              <ListItemButton sx={{ flexDirection: 'column', py: 2 }}>
                <ListItemIcon sx={{ minWidth: 0, mb: 0.5 }}><SwapHorizIcon /></ListItemIcon>
                <ListItemText primary="Trade" sx={{ textAlign: 'center' }}/>
              </ListItemButton>
              <ListItemButton sx={{ flexDirection: 'column', py: 2 }}>
                <ListItemIcon sx={{ minWidth: 0, mb: 0.5 }}><AccountBalanceWalletIcon /></ListItemIcon>
                <ListItemText primary="Wallets" sx={{ textAlign: 'center' }}/>
              </ListItemButton>
              <ListItemButton sx={{ flexDirection: 'column', py: 2 }}>
                <ListItemIcon sx={{ minWidth: 0, mb: 0.5 }}><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Account" sx={{ textAlign: 'center' }}/>
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {!isMobile && <Toolbar />}
        <OpportunitiesList opportunities={opportunities} />
      </Box>

      {isMobile && (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigation
            showLabels
            value={navValue}
            onChange={(event, newValue) => setNavValue(newValue)}
          >
            <BottomNavigationAction label="Portfolio" value="portfolio" icon={<GridViewIcon />} />
            <BottomNavigationAction label="Invest"    value="invest"    icon={<ShowChartIcon />} />
            <BottomNavigationAction label="Trade"     value="trade"     icon={<SwapHorizIcon />} />
            <BottomNavigationAction label="Wallets"   value="wallets"   icon={<AccountBalanceWalletIcon />} />
            <BottomNavigationAction label="Account"   value="account"   icon={<AccountCircleIcon />} />
          </BottomNavigation>
        </Box>
      )}
    </Box>
  );
}

export default App;
