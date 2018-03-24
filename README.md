## Mongo Web Client Application - ISTE 438

This project is part of the ISTE 438 course, and represents an online search client for a Mongo DB dataset.
The dataset is a collection of all the registered crimes, classified as terrorist attacks. Mongo web client enables the user to access this dataset by connecting to the, custom made, remotely deployed Node JS server.

The user is able to perform textual based queries that actually work as a regex search on a dataset's field summary. 
Summary describes what the terrorist attack was about.

Also, the user is able to perform GeoSpatial Queries over specified longitude, latitude and radius. 
In both cases results of the query are presented on Google Maps, but if the search was GeoSpatial than there is a certain circle surrounding all the results which denotes that all of the found documents are within specified requirements.

## Client Application URL
http://dinohorvat.com/dev/contemp/main
