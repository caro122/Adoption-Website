const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 3004;
const usersFile = 'users.txt';

const pets = [
  {
    name: "Winnie",
    type: "dog",
    breed: "Dachshund",
    ageMonths: 6,
    gender: "male",
    getsAlong: ["everything"]
  },
  {
    name: "Oscar",
    type: "cat",
    breed: "Shorthair",
    ageYears: 2,
    gender: "male",
    getsAlong: ["cats"]
  },
  {
    name: "Pibble",
    type: "dog",
    breed: "Pug",
    ageYears: 8,
    gender: "male",
    getsAlong: ["dogs"]
  }
];

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
};

const servePageWithTemplate = (res, filePath) => {
  const header = fs.readFileSync('./header.html', 'utf8');
  const footer = fs.readFileSync('./footer.html', 'utf8');
  const content = fs.readFileSync(filePath, 'utf8');

  const finalHtml = content
    .replace('<!--header-->', header)
    .replace('<!--footer-->', footer);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(finalHtml);
};

http.createServer((req, res) => {
  
    
  if (req.url === '/verifyLogin' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });

    req.on('end', () => {
      const { username, password } = querystring.parse(body);
      const loginLine = `${username}:${password}`;

      if (!fs.existsSync(usersFile)) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end("fail");
      }

      const lines = fs.readFileSync(usersFile, 'utf8').split('\n').filter(Boolean);
      const isMatch = lines.includes(loginLine);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end(isMatch ? "success" : "fail");
    });

    return;
  }

  
  if (req.url === '/findPet' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });

    req.on('end', () => {
      const formData = querystring.parse(body);

      const matches = pets.filter(pet => {
        const typeMatch = formData.Cat?.toLowerCase() === pet.type;
        const genderMatch = !formData.Gender || formData.Gender.toLowerCase() === pet.gender;
        return typeMatch && genderMatch;
      });

      const resultHtml = matches.map(p => `
        <fieldset class="pet">
          <legend style="font-size: 20px; font-weight: bold;">${p.name}</legend>
          <p><b>Type:</b> ${p.type} <br><b>Breed:</b> ${p.breed} <br><b>Gender:</b> ${p.gender}</p>
        </fieldset>
      `).join('<br>');

      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(`
        <!DOCTYPE html><html><head><title>Results</title></head><body>
        <h1>Matching Pets</h1>
        ${resultHtml || "<p>No pets match your criteria.</p>"}
        </body></html>
      `);
    });

    return;
  }

 
  if (req.url === '/processAccount' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });

    req.on('end', () => {
      const { username, password } = querystring.parse(body);
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

      if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`<p>Invalid format. Please try again.</p>`);
      }

      let existing = '';
      if (fs.existsSync(usersFile)) {
        existing = fs.readFileSync(usersFile, 'utf8');
      }

      if (existing.includes(`${username}:`)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`<p>Username already exists. Please choose another one.</p>`);
      }

      fs.appendFileSync(usersFile, `${username}:${password}\n`);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(`<p>Account successfully created. You may now log in.</p>`);
    });

    return;
  }

  
  const url = req.url === '/' ? '/Homepage.html' : req.url;
  const ext = path.extname(url);
  const filePath = path.join(__dirname, url);

  if (fs.existsSync(filePath)) {
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    if (ext === '.html') {
      servePageWithTemplate(res, filePath);
    } else {
      res.writeHead(200, { 'Content-Type': mimeType });
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }

}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
