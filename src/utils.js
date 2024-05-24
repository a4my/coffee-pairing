export const loadNames = () => {
    const storedNames = localStorage.getItem('names');
    return storedNames ? JSON.parse(storedNames) : [];
  };
  
export const saveNames = (names) => {
  localStorage.setItem('names', JSON.stringify(names));
};

export const loadPastResults = () => {
  const storedResults = localStorage.getItem('pastResults');
  return storedResults ? JSON.parse(storedResults) : [];
};

export const savePastResults = (results) => {
  localStorage.setItem('pastResults', JSON.stringify(results));
};