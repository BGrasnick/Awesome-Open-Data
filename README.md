# Awesome Drug Map

## Project Summary

*Your project documentation should be between 3 and 5 pages long and explain the following questions*

### What were your initial considerations on the user group, the use of it?

- We want to provide useful data in a descriptive and demonstative way so that users do not need to try figuring out what our application is all about. Therefore we filled the screen with just as much information as needed.
- What we tried to do was to implement a way to tell the user a story about how drug use has changed over the years and maybe even let the him guess how future trends may be evolving. So it was necessary to obtain information about past and present drug uses.
- To navigate through these information - and find exactly what he wants - we gave the user some tools: dragging, zooming and clicking.
- By adding dragging and zooming to the application, we make sure that the user gets to the place he is looking for. Meanwhile clicking enables him to view the data in detail whether by clicking on a country or by clicking through the tabs/drugs.
- One of our main goals was to create the possibility to compare data of differenct countries. So we added the concept of pinning the information cards, which are shown when clicking on a country, and thereby view data of multiple states at once. 
- The added red vertical line, seen in the bar chart of any country's data and symbolizing the mean average of the selected drug in the selected country, helps to rationalize the shown data.
- Adding these few concepts makes it relatively easy to use our application and therefore it does not require much skill or knowledge by the user. However, what it needs to properly use the application is a minor interest in the main topic of drugs or at least an open mind.
- This means our major user group is defined by mostly young adults (18 - 35 years old) with said mindset.

### Which data did you choose? By which criteria?

 - After an inital search on the topic open drug data, we found two good sources for data:
 - [EMCDDA for Europe](http://www.emcdda.europa.eu/data/2014)
 - [SAMHSA for the US](http://oas.samhsa.gov/states.cfm)
 - Another piece of data that was considered to be used as a source were the findings of the [Global Drug Survey](http://www.globaldrugsurvey.com/). However, as their survey is voluntary, this source was discarded as it is not representative.
 - The European data source from the EMCDDA is a comprehensive collection of interesting data not limited to the prevalence of drug use but also including topics like overdose deaths, seizures, prices and purity of drugs.
 - For our application, only the prevalence of drug use was chosen to be used as we wanted to focus on the usage of drugs.
 - The data on drug usage includes a wide range of different substances from which we chose to visualize cannabis, cocaine, ecstasy, amphetamines, alcohol and cigarettes. Those drugs were chosen as some of them are comporable to the data gathered from the US while the others were selected out of interest.
 - The data is available to be exported as CSV and Excel files. Moreover, the data is available in the categories of lifetime, last year or last month prevalence and can be selected for different age grouphs like all adults (15-64), young adults (15-34) or aged 15-24 going up to aged 55-64. 
 - Data is provided for all EU states and some additional ones like Turkey although some may be missing data on selected drugs. Additional to the prevalence among males, females and the total population, the year of the data collection is given.
 - In order to use the data in our prototype, the CSV files were used and converted to JSON using [this](http://www.convertcsv.com/csv-to-json.htm) awesome tool. The JSON files were then processed using node.js and the parse.js script that can be found in the EU_parse_script directory which also includes the JSON files used. Finally, average values for all the different drug prevalences were calculated in order to be used to represent the whole EU. 
 - This was done in order to be comparable to the US which provided data for the nation as a whole as well as all states. Unfortunately, this data was provided as tables in plain HTML documents. Moreover, only data on cannabis, alcohol and cigarette usage was contained in those tables.
 - In order to get the data in a machine-readable form, for each year chosen (2009, 2006 and 2004) a separate JavaScript script was written as the tables were not consistent. Those scripts have to be executed on the HTML pages themselves (for example [this](http://oas.samhsa.gov/2k9State/WebOnlyTables/stateTabs.htm) for 2009). Those scripts can be found in the US_parse_scripts_and_data directory as well as the JSON files that were generated by them.
 - The different JSON files for the years 2009, 2006 and 2004 were then merged into a single JSON file which was combined with the European data to create the basis for our application. 
 - The data provided by SAMHSA included different age groups (12-17, 18-25, 26+ etc.) and total as well as percentile values for drug consumption. Using the data from different age groups and years, a comparable database could be created.

### Did you encounter difficulties?

 - The data for the US was only available as plain HTML tables or PDF documents. However, using some JavaScript and XPath it was possible to parse those HTML tables.
 - Item 2
 - Item 3

### Did you even have to change the project due to these difficulties/lacking data?

 - Item 1
 - Item 2
 - Item 3

### How did you realize your project?

 - At the beginning, we asked us, which data we are going to use and searched for some good data ideas
 - We split the group in a programming team, a data team and a ui-design team, that we had no communication and developing trouble
 - Item 2
 - Item 3

### Which languages, libraries, frameworks, tools did you use?

 - [Backbone](http://backbonejs.org)
 - [Underscore](http://underscorejs.org)
 - [D3](http://d3js.org/)
 - [TopoJSON](https://github.com/mbostock/topojson)

### Which considerations did you have in terms of design and interface?

**Your expierience in terms of searching data and using it are especially
valuable for me when I am in touch with data providers asking how they
can improve their service.**

![alt tag](app/img/icons.png)

- We tried to have a minimal design, that the user can explore the drug data very easy.
- There are Icons, which display the different drugs.
- Every drug has their own color, that you can see the differents between them.
- The easiest way to show the data was in a map, so we creaded an interactive world map, where you can zoom in and out.
- We had the focus on Europe and United States of America, because we could find some good data.
- When you click on some specific country, it shows up a diagramm, where you can compare for example the canabis consume in different coutrys.
- You have the possibility to fix the diagram information for a better comparison.
