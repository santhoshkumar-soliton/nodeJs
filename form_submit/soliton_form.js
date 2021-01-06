const express = require('express');
const fs = require('fs');
const app = express();

app.set('view-engine','ejs');
app.use(express.urlencoded({extended : false}));

app.get('/soliton', (req, res) => {
    res.render('form.ejs');
});

app.post('/soliton', (req, res) => {
    console.log(req.body.name);
    storeData(req.body, 'formData.json');
});

const storeData = (formData, path) => {
  try {
    fs.readFile(path, function (err, data) {
        var json = JSON.parse(data);
        console.log(json);
        json.push(formData);
        console.log(json);
        fs.writeFile("formData.json", JSON.stringify(json), function(err, result) {
            if(err) console.log('error', err);
        });
    });
  } catch (err) {
    console.error(err)
  }
}
app.listen(5000);