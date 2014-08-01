# Awesome Drug Map

## Project Retrospective


*Your project documentation should be between 3 and 5 pages long and explain the following questions
Your expierience in terms of searching data and using it are especially
valuable for me when I am in touch with data providers asking how they
can improve their service.*


### What were your initial considerations on the user group, the use of it?

We want to provide useful data in a descriptive and demonstrative way so that users do not need to try figuring out what our application is all about. Therefore we filled the screen with just as much information as needed.

What we tried to do was to implement a way to tell the user a story about how drug use has changed over the years and maybe even let the him guess how future trends may be evolving. So it was necessary to obtain information about past and present drug uses.

To navigate through these information - and find exactly what he wants - we gave the user some tools: dragging, zooming and clicking. By adding dragging and zooming to the application, we make sure that the user gets to the place he is looking for. Meanwhile clicking enables him to view the data in detail whether by clicking on a country or by clicking through the tabs/drugs.

One of our main goals was to create the possibility to compare data of different countries. So we added the concept of *pinning* the information cards, which are shown when clicking on a country, and thereby view data of multiple states at once. 

The added red vertical line, seen in the bar chart of any country's data and symbolizing the mean average of the selected drug in the selected country, helps to rationalize the shown data.

Adding these few concepts makes it relatively easy to use our application and therefore it does not require much skill or knowledge by the user. However, what it needs to properly use the application is a minor interest in the main topic of drugs or at least an open mind.
This means our major user group is defined by mostly young adults (18 - 35 years old) with said mindset.

### Which data did you choose? By which criteria?

After an inital search on the topic open drug data, we found two good sources for data:

 - [EMCDDA for Europe](http://www.emcdda.europa.eu/data/2014)
 - [SAMHSA for the US](http://oas.samhsa.gov/states.cfm)
 
 Another piece of data that was considered to be used as a source were the findings of the [Global Drug Survey](http://www.globaldrugsurvey.com/). However, as their survey is voluntary, this source was unfortunately discarded as it is not representative.
 
The European data source from the EMCDDA is a comprehensive collection of interesting data not limited to the prevalence of drug use but also including topics like overdose deaths, seizures, prices and purity of drugs.

For our application, only the *prevalence* of drug use was chosen to be used as we wanted to focus on the usage of drugs.

The data on drug usage includes a wide range of different substances from which we chose to visualize cannabis, cocaine, ecstasy, amphetamines, alcohol and cigarettes. Those drugs were chosen as some of them are comparable to the data gathered from the US while the others were selected out of interest.

The data is available to be exported as CSV and Excel files. Moreover, the data is available in the categories of lifetime, last year or last month prevalence and can be selected for different age groups like all adults (15-64), young adults (15-34) or aged 15-24 going up to aged 55-64. 

Data is provided for all EU states and some additional ones like Turkey although some may be missing data on selected drugs. Additional to the prevalence among males, females and the total population, the year of the data collection is given.

In order to use the data in our prototype, the CSV files were used and converted to JSON using [this](http://www.convertcsv.com/csv-to-json.htm) awesome tool. The JSON files were then processed using node.js and the parse.js script that can be found in the EU_parse_script directory which also includes the JSON files used. Finally, average values for all the different drug prevalences were calculated in order to be used to represent the whole EU. 

This was done in order to be comparable to the US which provided data for the nation as a whole as well as all states. Unfortunately, this data was provided as tables in plain HTML documents. Moreover, only data on cannabis, alcohol and cigarette usage was contained in those tables.

In order to get the data in a machine-readable form, for each year chosen (2009, 2006 and 2004) a separate JavaScript script was written as the tables were not consistent. Those scripts have to be executed on the HTML pages themselves (for example [this](http://oas.samhsa.gov/2k9State/WebOnlyTables/stateTabs.htm) for 2009). Those scripts can be found in the US_parse_scripts_and_data directory as well as the JSON files that were generated by them.

The different JSON files for the years 2009, 2006 and 2004 were then merged into a single JSON file which was combined with the European data to create the basis for our application. 

The data provided by SAMHSA included different age groups (12-17, 18-25, 26+ etc.) and total as well as percentile values for drug consumption. Using the data from different age groups and years, a comparable database could be created.

### Did you encounter difficulties?

 The data for the US was only available as plain HTML tables or PDF documents. 
 However, using JavaScript and XPath it was possible to parse those HTML tables.
 
 In order to be able to show Europe and the US as a whole but also as split states we needed geometry information for three contexts: World, Europe and US.
 Finding shapefiles for US States was fairly easy but not so much for the european states. We ended up generating this file by ourselves.


### Did you even have to change the project due to these difficulties/lacking data?

From a programmers point of view, we were able to realize basically everything we wanted. Time was the only limiting factor.

Data on the other hand was limited and hard to normalize due to different separation of age groups represented in the sources.


### How did you realize your project?

First we were looking for possible data sources on the internet to evaluate whether working on this topic was feasible.

Every week, we met at the HTW campus to talk about past week's tasks and assign new task to our todo-list. 
We tried being agile about it to respond to feedback quickly. 

To distribute tasks we split up into three specialized teams : Design, Code and Data

#### Data
Check the top of the Page, because we allready wrote something about the design part.

#### Design
See [below](#which-considerations-did-you-have-in-terms-of-design-and-interface)

#### Code

First we set up the basic development environment, downloading and setting up the tools mentioned below.
To begin with the project we started off with investigating D3's possibilities. 
There was a really helpful [tutorial](http://bost.ocks.org/mike/map/) that got us kickstarted on everything map related.
Now we had to build the user interface on top of the map-layer. 







### Which languages, libraries, frameworks, tools did you use?

In order to quickly produce visual results we chose the browser of our environment of choice.

We decided to use [SASS](http://sass-lang.com/)(SCSS Syntax) for Stylesheets and JavaScript for the application.
For asset compilation and workflow optimization we chose [Grunt](http://gruntjs.com/) as Task Runner. Crucial for development were the following modules: [autoprefixer](https://github.com/ai/autoprefixer), [EJS](http://embeddedjs.com/) for templating, [grunt-contrib-livereload](https://github.com/gruntjs/grunt-contrib-livereload) for hot swapping changes in the stylesheets.

Not all of us were familiar with JavaScript in the beginning. 
This is why we chose not to use Coffee- or TypeScript. We know that this project was about sharing knowledge and learning together. 

For the general MVC structure of the application we used [Backbone](http://backbonejs.org).
We gained the following benefits by doing so:

* Merge data from different .json files into a single model
* Structure our views and SVGs
* Leverage [Underscore](http://underscorejs.org)'s collection utility functions (sort, filter, ..)

To display data we chose to use, learn and love mbostock's [D3](http://d3js.org/). There have been plenty of examples on the internet related to SVG, maps and TopoJSON to learn from. 

To make our SVG map aware of topology we used [TopoJSON](https://github.com/mbostock/topojson).

Last but not least, we used git for version control, working mostly on the master branch.


### Which considerations did you have in terms of design and interface?


![alt tag](app/img/icons.png)

We tried to have a 'minimal design', that the user can explore the drug data very easy. On the top of the application, there are Icons, which display the different drugs. Every drug has their own color. The countries with more saturaion has more people, which consume drugs. We used for the design part programs like Adobe Photoshop and Illustrator, to create the drug-icons.

To show to data in a map was the best way. We creaded an interactive world map, where you can zoom in and out. We had the focus on Europe and the United States of America, because we found some good data about these continents/countries. When you click on some specific country, it shows up a diagramm, where you can compare, for example the canabis consume in different countrys. You have the possibility to fix the diagram information for a better comparison.
