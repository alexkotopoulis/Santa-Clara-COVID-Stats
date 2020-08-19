# Santa-Clara-COVID-Stats
Google Apps Script for daily collection of local COVID-19 Stats in Santa Clara County

This collection of scripts collects daily statistics for a list of ZIP codes from [Santa Clara County Health Dept REST service](https://data.sccgov.org/browse?category=COVID-19) and stores it into a Google Sheet called "COVID ZIP" in your local Google docs. Santa Clara does not provide historical data on COVID-19 per ZIP code, so this script is needed to collect this data externally.

Installation steps:
1. Create Google Apps Script project at https://script.google.com/.
2. Import the \*.gs files from GIT into the project. This can best be done using the [Google Apps Script GitHub Assistant](https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo?hl=en).
3. Edit the Config.gs file to select the Santa Clara County ZIP codes you want to observe. If you want to use ZIP codes from any other county you will need to find a different REST service for that county and modify the scripts.
4. Test the script by running the function saveCovidStats.
5. Create a trigger to execute this script daily. You can go to Edit > Current Project's Triggers in the Script Editor. A trigger should be Time-Driven, Daily, 4pm-5pm PSTas this is the time that Santa Clara updates its stats. 
