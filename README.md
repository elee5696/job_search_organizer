# job_search_organizer
Full Stack Application that helps organize a job search

## Technologies Used
* React.js
* Webpack 4
* Node.js
* MySQL
* HTML5
* CSS3
* AWS EC2

## Live Demo
Try the application live at https://search.edwardlee.net

## Features
* Users can signup or login to start a new table
* Users can add a listing by entering a company name and the date they applied
* Users can update the post with new data (response date, interview questions, etc)
* Users can delete a post

## Development

### System Requirements
* Node.js 10 or higher
* NPM 6 or higher
* MySQL 8

### Getting Started
1. Clone the repository.
```
git clone https://github.com/elee5696/job_search_organizer
cd job_search_organizer
```
2. Install all dependencies with NPM.
```
npm install
```
3. Create new .env and mysql_credentials.js files using template
```
mysql_credentials.js
server/api/mysql_credentials.js
```
4. Import example database to MySQL
```
npm run db:import
```
5. Start the project. Once started you can view the application by opening http://localhost:3008 in your browser.
```
npm run start
```
