import filter from 'leo-profanity';
import { useCallback } from 'react';

import { FilterContext } from '../hooks';

const FilterProvider = ({ children }) => {
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  const filterWord = useCallback((word) => filter.clean(word), []);

  return <FilterContext.Provider value={filterWord}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
