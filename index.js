/*
1. write down what you want it to do. Start with a small problem.
2. Make sure to make sure that you don't try to do too much at once
3. Start with sync functions
4. Write an example of what you want the output to look like
5. https://github.com/jprichardson/node-fs-extra
6. Be careful with adding strings together
7. Read your own code
8. Test your regex in a separate environment
9. Regex varies slightly between languages/platforms
10. Don't use regex (unless you need it)
11. Document inputs and outputs
12. Commit every time something new works
13. Write code that catches errors
*/

/*

1. Create an empty CSV file.
1a. Write something to the CSV
1b. Write something to the CSV that has line breaks
2. get a list of all the filenames in the text directory of the rfcs repo.
../rfcs/text/
3. Write the list of files to the CSV
4. Write the RFC number and the filename to the CSV
5. Get the Start Date, RFC PR url


The output we want in the end is:

RFC number, RFC file name, PR link, Start Date

*/

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const outputFile = './output.csv'
const rfcsPath = '../rfcs/text/'

const getRfcNumber = (filename) => {
    // example input 0408-decorators.md
    // desired output is 0408
    return filename.substring(0, 4)
}

const readDate = (filename) => {
    // example input 0408-decorators.md
    // output 2014-08-18 

    let fileContents = fs.readFileSync(path.join('../rfcs/text', filename), 'utf8')
    let startDate = fileContents.match(/\d\d\d\d\-\d\d\-\d\d/)

    if (!startDate) {
        console.warn('No start date found in ' + filename)
    }
    return fileContents.match(/\d\d\d\d\-\d\d\-\d\d/)
}


fse.ensureFileSync(outputFile) // 'some/path/output.csv'

const fileList = fs.readdirSync(rfcsPath);

const results = fileList
    .map(file => {
        // input is 0408-decorators.md
        // output is 0408, 0408-decorators.md
        let rfcNumber = getRfcNumber(file)
        let startDate = readDate(file)
        return `${rfcNumber}, ${file}, ${startDate}`
    })
    .join('\n')

fs.writeFileSync(outputFile, results);