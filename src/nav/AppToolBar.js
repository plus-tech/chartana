import { useNavigate } from 'react-router-dom';

import * as React from 'react';
import { useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { useTheme } from '@mui/material/styles';

import { GetColorModeContext } from '../metadata/Contexts';


const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const ASSET = [
  'Stock',
  'Bond',
  'Fund',
  'FX'
]

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function AppToolBar() {
  //
  // get the current theme and color mode
  const theme = useTheme();
  const colorMode = GetColorModeContext();

  const navigate = useNavigate();

  //
  // ticker entered in the Search box
  const [ticker, setTicker] = useState();

  const [dropdownAncholEl, setDropdownAnchorEl] = React.useState(null);
  const isDropdownMenuOpen = Boolean(dropdownAncholEl);

  //
  // dropdown menu   - possible to make it simpler?
  const handleDropdownMenuOpen = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleDropdownMenuClose = () => {
    setDropdownAnchorEl(null);
  };

  {/* dropdown menu in the center */}
  const dropdownMenuId = 'primary-dropdown-menu';
  const renderDropdownMenu = (
    <Menu
      anchorEl={dropdownAncholEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={dropdownMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isDropdownMenuOpen}
      onClose={handleDropdownMenuClose}
    >
      <MenuItem onClick={() => {navigate('/');            handleDropdownMenuClose();}}>Home</MenuItem>
      <MenuItem onClick={() => {navigate('/symbollist');  handleDropdownMenuClose();}}>Symbol list</MenuItem>
      <MenuItem onClick={() => {navigate('/tickerprice'); handleDropdownMenuClose();}}>Ticker price</MenuItem>
      <MenuItem onClick={() => {navigate('/candlechart'); handleDropdownMenuClose();}}>Show chart</MenuItem>
      <Divider />
      <MenuItem onClick={() => {navigate('/barchart');    handleDropdownMenuClose();}}>Bar chart (Test)</MenuItem>
    </Menu>
  );

  //
  // asset class selection
  const [assetClass, setAssetClass] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAssetClass(value);
  };

  //
  // profile menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        handleMenuClose();
        colorMode.toggleColorMode();
      }}>
        {theme.palette.mode=='light'? 'Dark ' : 'Light '} Mode
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Setting</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
    </Menu>
  );

  /**
   * Load TickerPrice page
   * @param {Number} tickerno: ticker entered in the Search box.
   *
   * @events : Enter key pressed down in the Search box
   *           or Click on the Price button.
  */
  function LoadTickerPrice(tickerno){
    navigate('/tickerprice', { state: { ticker: tickerno } });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            aria-controls={dropdownMenuId}
            aria-haspopup="true"
            onClick={handleDropdownMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          {/* asset class select */}
          <FormControl sx={{mt:'1px'}}>
            <InputLabel id="multiple-checkbox-label" size='small'>Asset</InputLabel>
            <Select
              labelId='multiple-checkbox-label'
              id="demo-multiple-checkbox"
              multiple
              value={assetClass}
              onChange={handleChange}
              input={<OutlinedInput label="Asset" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              sx={{width: '200px', height: '40px'}}
            >
              {ASSET.map((asset) => (
                <MenuItem key={asset} value={asset}>
                  <Checkbox checked={assetClass.indexOf(asset) > -1} />
                  <ListItemText primary={asset} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* search input box */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setTicker(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  LoadTickerPrice(ticker)
                }
              }}
            />
          </Search>

          <Box>
            <Button size='medium'
              color="inherit"
              onClick={() => LoadTickerPrice(ticker)}>
              Price
            </Button>
          </Box>
          <Box>
            <Button size='medium'
              color="inherit"
              onClick={() => {navigate('/symbollist')}}>
              Symbols
            </Button>
          </Box>

          <Box>
            <Button
              size='medium'
              color="inherit"
              onClick={() => {navigate('/test')}}>
              Test
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* account menu button on the right */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {renderDropdownMenu}
          {profileMenu}

        </Toolbar>
      </AppBar>
    </Box>
  );
}
