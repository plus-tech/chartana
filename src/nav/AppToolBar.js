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

import { useColorModeContext } from '../common/contexts.js';
import { checkTicker } from '../common/utils.js';


// 
// primary dropdown menu
export function PrimaryMenu( props ){
  const {showCandlestickChart, showTickerPrice, showSymbolList, showTest} = props;

  const navigate = useNavigate();

  const [dropdownAncholEl, setDropdownAnchorEl] = React.useState(null);

  //
  // dropdown menu   - possible to make it simpler?
  const handleDropdownMenuOpen = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleDropdownMenuClose = () => {
    setDropdownAnchorEl(null);
  };

  const dropdownMenuId = 'primary-dropdown-menu';
  
  return (
    <Box>
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
        open={Boolean(dropdownAncholEl)}
        onClose={handleDropdownMenuClose}
      >
        <MenuItem onClick={() => {handleDropdownMenuClose(); navigate('/');          }}>Home</MenuItem>
        <Divider />
        <MenuItem onClick={() => {handleDropdownMenuClose(); showCandlestickChart(); }}>Show chart</MenuItem>
        <MenuItem onClick={() => {handleDropdownMenuClose(); showTickerPrice();      }}>Show price</MenuItem>
        <MenuItem onClick={() => {handleDropdownMenuClose(); showSymbolList();       }}>Symbol list</MenuItem>      
        <Divider />
        <MenuItem onClick={() => {handleDropdownMenuClose(); showTest();             }}>Test</MenuItem>
      </Menu>
    </Box>
  );

}

//
// profile dropdown menu
export function ProfileMenu(props){
  //
  // get the current theme and color mode
  const theme = useTheme();
  const colorMode = useColorModeContext();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';

  return (
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
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleMenuClose(); 
          colorMode.toggleColorMode();}}
        >
          {theme.palette.mode=='light'? 'Dark ' : 'Light '} Mode
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Setting</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
      </Menu>
    </Box>
  );
}


// 
// asset class select
export function AssetSelect(){
  const itemheight = 50;
  const itempaddingtop = 8;
  const menuprops = {
    PaperProps: {
      style: {
        maxHeight: itemheight * 4.5 + itempaddingtop,
        width: 200,
      },
    },
  };

  const assetcls = [
    'Stock',
    'Bond',
    'Fund',
    'FX'
  ];

  const [assetClass, setAssetClass] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAssetClass(value);
  };

  return (
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
        MenuProps={menuprops}
        sx={{width: '200px', height: '40px'}}
      >
        {assetcls.map((asset) => (
          <MenuItem key={asset} value={asset}>
            <Checkbox checked={assetClass.indexOf(asset) > -1} />
            <ListItemText primary={asset} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}


//
// search box
// const { onTickerChange, showTickerPrice } = props;
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


export default function AppToolBar({onTickerChange}) {
  //
  // get the current theme and color mode
  const theme = useTheme();
  const colorMode = useColorModeContext();
  const [ticker, setTicker] = useState(null);

  const navigate = useNavigate();

  const params = {
    onTickerChange: onTickerChange,
    showCandlestickChart: showCandlestickChart,
    showTickerPrice: showTickerPrice,
    showSymbolList: showSymbolList,
    showTest: showTest,
  };

  /**
   * Load CandlestickChart page displaying the certain ticker's price chart
   * @param {Number} ticker: ticker entered in the Search box.
   *
   * @events : Enter key pressed down in the Search box
   *           or Click on the Price button.
  */
  function showCandlestickChart(){
    // navigate('/candlestick', { state: { ticker: tickerno } });
    if (checkTicker(ticker)){
      navigate('/candlestick');
    }
  }
    
  /**
   * Load TickerPrice page
   * @param {Number} ticker: ticker entered in the Search box.
   *
   * @events : Enter key pressed down in the Search box
   *           or Click on the Price button.
  */
  function showTickerPrice(){
    // navigate('/tickerprice', { state: { ticker: tickerno } });
    console.log('type of ticker: ', typeof(ticker));
    if (checkTicker(ticker)){
      navigate('/tickerprice');
    }
  }

  /**
   * navigate to the SymbolList page
 * @param {} : None
 * @returns : None
   */
  function showSymbolList(){
    navigate('/symbollist');
  }

  /**
   * navigate to the Test page
   */
  function showTest(){
    navigate('/test');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <PrimaryMenu {...params} />

          <AssetSelect />

          {/* <SearchBox {...params}/> */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {
                setTicker(e.target.value);
                onTickerChange(e.target.value)}}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.keyCode === 13) {
                  showTickerPrice();
                }
              }}
            />
          </Search>

          <Box>
            <Button size='medium'
              color="inherit"
              onClick={showCandlestickChart}>
              Chart
            </Button>
          </Box>
          <Box>
            <Button size='medium'
              color="inherit"
              onClick={showTickerPrice}>
              Price
            </Button>
          </Box>
          <Box>
            <Button size='medium'
              color="inherit"
              onClick={showSymbolList}>
              Symbols
            </Button>
          </Box>

          <Box>
            <Button
              size='medium'
              color="inherit"
              onClick={showTest}>
              Test
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <ProfileMenu />

        </Toolbar>
      </AppBar>
    </Box>
  );
}
