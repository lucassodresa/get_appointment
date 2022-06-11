import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { GEOCODER_PROVIDER_URL } from 'constants/global';
import { AutoComplete, Input } from 'antd';

const SearchMapInput = ({ setLocation, mapInstance }) => {
  const [placesList, setPlacesList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const onSearch = async (search) => {
    if (search.length < 3) return;
    const url = GEOCODER_PROVIDER_URL + search;
    const response = await fetch(url);
    const placesList = await response.json();
    setPlacesList(
      placesList.map(({ display_name, lat, lon, place_id }) => ({
        key: place_id,
        value: display_name,
        lat,
        lon
      }))
    );
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((nextValue) => onSearch(nextValue), 500),
    []
  );

  const handleSearch = (value) => debouncedSearch(value);
  const handleChange = (value) => setSearchText(value);

  const handleSelected = (_, { lat, lon }) => {
    setLocation([lat, lon]);
    mapInstance.setView({ lat, lng: lon }, 15);
    setPlacesList([]);
    setSearchText('');
  };

  return (
    <AutoComplete
      style={{ marginBottom: '10px' }}
      dropdownClassName="certain-category-search-dropdown"
      options={placesList}
      onSelect={handleSelected}
      onSearch={handleSearch}
      onChange={handleChange}
      value={searchText}
    >
      <Input.Search size="large" placeholder="Enter address" enterButton />
    </AutoComplete>
  );
};
export default SearchMapInput;
