//MUI
import {AppBar, Toolbar, Box, Typography, styled} from '@mui/material';
import Search from './Search';
import CustomButton from './CustomButton';

const StyledHeader= styled(AppBar)`
background: #2874f0;
height: 55px;
`

const Component= styled(Box)`
    margin-left: 12%;
    line-height: 0;
`;

const SubHeading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
`;

const CustomButtonWrapper= styled(Box)`
    margin: 0 5% 0 auto;
`;

const Header = () => {

    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';

  return (
    <StyledHeader>
        <Toolbar style={{minHeight: 55}}>
            <Component>
                <img src={logoURL} alt='logo' style={{width: 75}} />
            <Box>
                <SubHeading>Explore&nbsp;
                    <Box component="span" style={{color: '#FFE500'}}>Plus</Box>
                </SubHeading>
            </Box>
            </Component>
            <Search />
            <Box>
                <CustomButton />
            </Box>          
        </Toolbar>
    </StyledHeader>
  )
}

export default Header