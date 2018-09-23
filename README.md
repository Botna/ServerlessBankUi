Code demonstration of React/Redux Front end w/ .netCore 2.0 Serverless web api backend. 

This is the Front End project, presently being hosted on 

botna.github.io/BankServerUI

please do not goto the website on mobile, it will hurt your brain and my pride.


TO RUN LOCALLY:
Clone Repo
modify src/config/connection.js's value of baseURI from the serverless url to the localhost:4967 value.  

This is the port utilized in my .net core webAPI's launch settings, so this will allow you to execute it locally if you choose.  
You can of course leave this connection string alone if you would like, it just wont be as snappy (and wont prove that it can be configured to hit different backends easily)

in developing this, i learned more about the lifecycle of AWS lambda's and some of the difficulties.  Since i use ASYNC calls, since i have ZERO warming on the lambdas, a and since .net core lambas have a hell of a start time, the first call you do will take ~ 8 seconds. Additionally, during the Login Functionality, multiple calls will be kicked off simultaenously, which will cause another instance ofhte lambda to be created (you guessed it, taking another 8 seconds). After the first login flow is accomplished, the entire application should be much snappier. 

I have demonstrated a few unit tests that i have used previously for React using enzyme. I did not achieve 100% test coverage by any means (due to time constraints), but the tests should show my understanding of how the framework is used, and what to consider when testing. 
