const express = require('express');
const router = express.Router();

// Mock US Presidents database
const presidents = [
  { id: 1, number: 1, name: 'George Washington', party: 'No Party', termStart: 1789, termEnd: 1797, vicePresident: 'John Adams' },
  { id: 2, number: 2, name: 'John Adams', party: 'Federalist', termStart: 1797, termEnd: 1801, vicePresident: 'Thomas Jefferson' },
  { id: 3, number: 3, name: 'Thomas Jefferson', party: 'Democratic-Republican', termStart: 1801, termEnd: 1809, vicePresident: 'George Clinton' },
  { id: 4, number: 4, name: 'James Madison', party: 'Democratic-Republican', termStart: 1809, termEnd: 1817, vicePresident: 'Elbridge Gerry' },
  { id: 5, number: 5, name: 'James Monroe', party: 'Democratic-Republican', termStart: 1817, termEnd: 1825, vicePresident: 'Daniel D. Tompkins' },
  { id: 6, number: 6, name: 'John Quincy Adams', party: 'Democratic-Republican', termStart: 1825, termEnd: 1829, vicePresident: 'John C. Calhoun' },
  { id: 7, number: 7, name: 'Andrew Jackson', party: 'Democratic', termStart: 1829, termEnd: 1837, vicePresident: 'Martin Van Buren' },
  { id: 8, number: 8, name: 'Martin Van Buren', party: 'Democratic', termStart: 1837, termEnd: 1841, vicePresident: 'Richard M. Johnson' },
  { id: 9, number: 9, name: 'William Henry Harrison', party: 'Whig', termStart: 1841, termEnd: 1841, vicePresident: 'John Tyler' },
  { id: 10, number: 10, name: 'John Tyler', party: 'Whig', termStart: 1841, termEnd: 1845, vicePresident: 'None' },
  { id: 11, number: 11, name: 'James K. Polk', party: 'Democratic', termStart: 1845, termEnd: 1849, vicePresident: 'George M. Dallas' },
  { id: 12, number: 12, name: 'Zachary Taylor', party: 'Whig', termStart: 1849, termEnd: 1850, vicePresident: 'Millard Fillmore' },
  { id: 13, number: 13, name: 'Millard Fillmore', party: 'Whig', termStart: 1850, termEnd: 1853, vicePresident: 'None' },
  { id: 14, number: 14, name: 'Franklin Pierce', party: 'Democratic', termStart: 1853, termEnd: 1857, vicePresident: 'William R. King' },
  { id: 15, number: 15, name: 'James Buchanan', party: 'Democratic', termStart: 1857, termEnd: 1861, vicePresident: 'John C. Breckinridge' },
  { id: 16, number: 16, name: 'Abraham Lincoln', party: 'Republican', termStart: 1861, termEnd: 1865, vicePresident: 'Andrew Johnson' },
  { id: 17, number: 17, name: 'Andrew Johnson', party: 'Democratic', termStart: 1865, termEnd: 1869, vicePresident: 'None' },
  { id: 18, number: 18, name: 'Ulysses S. Grant', party: 'Republican', termStart: 1869, termEnd: 1877, vicePresident: 'Schuyler Colfax' },
  { id: 19, number: 19, name: 'Rutherford B. Hayes', party: 'Republican', termStart: 1877, termEnd: 1881, vicePresident: 'William A. Wheeler' },
  { id: 20, number: 20, name: 'James A. Garfield', party: 'Republican', termStart: 1881, termEnd: 1881, vicePresident: 'Chester A. Arthur' },
  { id: 21, number: 21, name: 'Chester A. Arthur', party: 'Republican', termStart: 1881, termEnd: 1885, vicePresident: 'None' },
  { id: 22, number: 22, name: 'Grover Cleveland', party: 'Democratic', termStart: 1885, termEnd: 1889, vicePresident: 'Thomas A. Hendricks' },
  { id: 23, number: 23, name: 'Benjamin Harrison', party: 'Republican', termStart: 1889, termEnd: 1893, vicePresident: 'Levi P. Morton' },
  { id: 24, number: 24, name: 'Grover Cleveland', party: 'Democratic', termStart: 1893, termEnd: 1897, vicePresident: 'Adlai Stevenson I' },
  { id: 25, number: 25, name: 'William McKinley', party: 'Republican', termStart: 1897, termEnd: 1901, vicePresident: 'Theodore Roosevelt' },
  { id: 26, number: 26, name: 'Theodore Roosevelt', party: 'Republican', termStart: 1901, termEnd: 1909, vicePresident: 'Charles W. Fairbanks' },
  { id: 27, number: 27, name: 'William H. Taft', party: 'Republican', termStart: 1909, termEnd: 1913, vicePresident: 'James S. Sherman' },
  { id: 28, number: 28, name: 'Woodrow Wilson', party: 'Democratic', termStart: 1913, termEnd: 1921, vicePresident: 'Thomas R. Marshall' },
  { id: 29, number: 29, name: 'Warren G. Harding', party: 'Republican', termStart: 1921, termEnd: 1923, vicePresident: 'Calvin Coolidge' },
  { id: 30, number: 30, name: 'Calvin Coolidge', party: 'Republican', termStart: 1923, termEnd: 1929, vicePresident: 'Charles G. Dawes' },
  { id: 31, number: 31, name: 'Herbert Hoover', party: 'Republican', termStart: 1929, termEnd: 1933, vicePresident: 'Charles Curtis' },
  { id: 32, number: 32, name: 'Franklin D. Roosevelt', party: 'Democratic', termStart: 1933, termEnd: 1945, vicePresident: 'Harry S. Truman' },
  { id: 33, number: 33, name: 'Harry S. Truman', party: 'Democratic', termStart: 1945, termEnd: 1953, vicePresident: 'Alben W. Barkley' },
  { id: 34, number: 34, name: 'Dwight D. Eisenhower', party: 'Republican', termStart: 1953, termEnd: 1961, vicePresident: 'Richard Nixon' },
  { id: 35, number: 35, name: 'John F. Kennedy', party: 'Democratic', termStart: 1961, termEnd: 1963, vicePresident: 'Lyndon B. Johnson' },
  { id: 36, number: 36, name: 'Lyndon B. Johnson', party: 'Democratic', termStart: 1963, termEnd: 1969, vicePresident: 'Hubert Humphrey' },
  { id: 37, number: 37, name: 'Richard Nixon', party: 'Republican', termStart: 1969, termEnd: 1974, vicePresident: 'Gerald Ford' },
  { id: 38, number: 38, name: 'Gerald Ford', party: 'Republican', termStart: 1974, termEnd: 1977, vicePresident: 'Nelson Rockefeller' },
  { id: 39, number: 39, name: 'Jimmy Carter', party: 'Democratic', termStart: 1977, termEnd: 1981, vicePresident: 'Walter Mondale' },
  { id: 40, number: 40, name: 'Ronald Reagan', party: 'Republican', termStart: 1981, termEnd: 1989, vicePresident: 'George H. W. Bush' },
  { id: 41, number: 41, name: 'George H. W. Bush', party: 'Republican', termStart: 1989, termEnd: 1993, vicePresident: 'Dan Quayle' },
  { id: 42, number: 42, name: 'Bill Clinton', party: 'Democratic', termStart: 1993, termEnd: 2001, vicePresident: 'Al Gore' },
  { id: 43, number: 43, name: 'George W. Bush', party: 'Republican', termStart: 2001, termEnd: 2009, vicePresident: 'Dick Cheney' },
  { id: 44, number: 44, name: 'Barack Obama', party: 'Democratic', termStart: 2009, termEnd: 2017, vicePresident: 'Joe Biden' },
  { id: 45, number: 45, name: 'Donald Trump', party: 'Republican', termStart: 2017, termEnd: 2021, vicePresident: 'Mike Pence' },
  { id: 46, number: 46, name: 'Joe Biden', party: 'Democratic', termStart: 2021, termEnd: null, vicePresident: 'Kamala Harris' }
];

// List all presidents
router.get('/', (req, res) => {
  const { page = 1, limit = 50, party, searchTerm } = req.query;
  
  let filtered = [...presidents];
  
  if (party) {
    filtered = filtered.filter(p => p.party.toLowerCase() === party.toLowerCase());
  }
  
  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.vicePresident.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + parseInt(limit));
  
  res.json({ 
    total: filtered.length,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(filtered.length / limit),
    presidents: paginated 
  });
});

// Get president by number
router.get('/number/:num', (req, res) => {
  const president = presidents.find(p => p.number === parseInt(req.params.num));
  if (!president) return res.status(404).json({ error: 'President not found' });
  res.json(president);
});

// Get current/latest president
router.get('/current', (req, res) => {
  const current = presidents.find(p => p.termEnd === null) || presidents[presidents.length - 1];
  res.json(current);
});

// Get party statistics
router.get('/stats/by-party', (req, res) => {
  const stats = {};
  for (const p of presidents) {
    stats[p.party] = (stats[p.party] || 0) + 1;
  }
  res.json(stats);
});

module.exports = router;
