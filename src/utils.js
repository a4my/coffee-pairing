export const loadNames = () => {
    const storedNames = localStorage.getItem('names');
    return storedNames ? JSON.parse(storedNames) : [];
  };
  
  export const saveNames = (names) => {
    localStorage.setItem('names', JSON.stringify(names));
  };