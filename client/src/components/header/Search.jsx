import { InputBase, Box, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer= styled(Box)`
    background: #fff;
    width: 38%;
    margin-left: 10px ;
    margin-right: 45px;
    border-radius: 2%;
    display: flex;
`;

const InputSearchBase= styled(InputBase)`
    padding-left: 20px;
    width: 100%;
    font-size: unset;
`;

const SearchIconWrapper= styled(Box)`
    color: blue;
    padding: 5px;
    display: flex;
`;

const Search = () => {
  return (
    <SearchContainer>
        <InputSearchBase
            placeholder="search for Products, Brands and more"
        />
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
    </SearchContainer>
  )
}

export default Search;