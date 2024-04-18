/*
what if this works well with Google charts?

*/
import { useNavigate } from 'react-router-dom';
import {
  useColorMode,
  Flex,
  Button,
  Wrap,
  WrapItem,
  HStack,
  Box,
  Select,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  StackDivider,
} from '@chakra-ui/react';

import{
  ChevronDownIcon,
} from '@chakra-ui/icons';

const Toolbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();

  return (
    <>
      <HStack padding='3px' width='100%'>
        <Box>
          <Select placeholder='Class' variant='outline' size='sm'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
        </Box>
        <Box>
          <Input variant='outline' placeholder='Ticker' size='sm'/>
        </Box>
        <StackDivider borderColor='gray.200' />
        <Box>
          <Button variant='link' size='sm' onClick={() => {navigate('/test')}}>
            Test API
          </Button>
        </Box>
        <StackDivider borderColor='gray.200' />
        <Box>
          <Button variant='link' size='sm'>
            Shortcut
          </Button>
        </Box>
        <StackDivider borderColor='gray.200' />
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size='sm'>
              To do
            </MenuButton>
            <MenuList fontSize='sm'>
              <MenuItem onClick={() => {navigate('/')}}>Home</MenuItem>
              <MenuItem onClick={() => {navigate('/tickerlist')}}>Ticker list</MenuItem>
              <MenuItem onClick={() => {navigate('/price')}}>Ticker price</MenuItem>
              <MenuItem onClick={() => {navigate('/candlechart')}}>Show chart</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => {navigate('/barchart')}}>Bar chart (Test)</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
      <HStack padding='3px'>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size='sm'>
              User
            </MenuButton>
            <MenuList fontSize='sm'>
              <MenuItem>Setting</MenuItem>
              <MenuItem onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </>
  )
}

export default Toolbar;

{/*
div borderRadius='md'

*/}
