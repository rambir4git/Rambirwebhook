// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient, Platform} = require('dialogflow-fulfillment');
const {Card, Suggestion, Payload} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function aboutbot(agent){
    
    var stop = agent.parameters.stop;
    stop = stop.toLowerCase();
    if((stop.includes('stop'))||(stop.includes('quit'))||(stop.includes('exit'))){
      	agent.add(`Understood! Thanks for using our services, we will talk again. 😌`);
      
      	agent.add(new Suggestion(`Are you there ?`));
      	return;
    }
    
  		welcome(agent);
  }
  
  function welcome(agent) {
    agent.add(`Hi ! This is MekBot, your virtual assistant for Mekvahan. 😎`);
    
    agent.add(new Suggestion(`List all services`));
    agent.add(new Suggestion(`What can you do?`));
    agent.add(new Suggestion(`Exit`));
  }
 
  function fallback(agent) {
    agent.add(`I'm sorry, can you try again?`);
    
    agent.add(new Suggestion(`List chatbot services`));
    agent.add(new Suggestion(`What can you do?`));
  }

  function welcomeservice(agent){
    
    agent.add(new Suggestion(`About Mekvahan`));
    agent.add(new Suggestion(`Mekvahan Service`));
    agent.add(new Suggestion(`SOS or Roadside Assistance`));
    agent.add(new Suggestion(`Mekvahan Service Hours`));
    agent.add(new Suggestion(`Mekvahan Support`));
    agent.add(new Suggestion(`Booking Cancellation`));
    agent.add(new Suggestion(`Referrals`));
    agent.add(new Suggestion(`Offers`));
    agent.add(new Suggestion(`Unable to find my service`));
    agent.add(new Suggestion(`More options`));
    
     const payloadResponse = {
        'list':['About Mekvahan','Mekvahan Service','SOS or Roadside Assistance',
               'Mekvahan Service Hours','Mekvahan Support','Booking Cancellation',
               'Referrals','Offers','Unable to find my service','More options'],
       	'title':'Good Morning Abhishek. Help me choose from services below',
       	'type':'list'
    };
    
  agent.add(
    new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
    
	agent.setContext({ name: 'level1', lifespan: 50 });
  }
  
  function level1(agent){
    var params = agent.parameters.welcomeservices;
    var name = params;
    params = params.toLowerCase();
    if((params.includes('about'))&&(params.includes('mekvahan'))){
      agent.add(name+"\n\nMekvahan is a platform of curated set of service network partners who"
				+" follow tightly defined rules and regulations to deliver superior customer" 
				+" experience. Few other benefits to you - ");
      
      agent.add("a.	Book a service at any time from Mekvahan website or mobile app &" 
					+" get an instant confirmation.\n\n"
				+"b. Doorstep pick up and drop by Mekvahan service providers.\n\n"
				+"c. All details about the vehicle (information & pictures if any)" 
					+" captured by the Mekvahan users on the website & mobile apps are used and" 
					+" verified instantly by the service partners and the providers.\n\n"
				+"d. All estimates, revised estimates, work detail, service engineer etc"
					+" are uploaded by the service partners on the Mekvahan Service"
					+" Partner web & mobile application.\n\n"
				+"e. Customers can eventually pay at his doorstep by card or cash."
					+" Mekvahan provides an advisory layer for the customer by using" 
					+" historical aggregated data to advise the customer about any" 
					+" abnormal jobs being undertaken by the service center. Mekvahan" 
					+" has an expert team, which then coordinates to clarify and satisfy" 
					+" the customer about these issues.");
    }
    
    else if((params.includes('mekvahan'))&&(params.includes('service'))){
      
    	agent.add(new Suggestion(`Car Service`));
    	agent.add(new Suggestion(`Bike Service`));
    	agent.add(new Suggestion(`SOS Service`));
      
      	agent.setContext({ name: 'level2', lifespan: 50 });
      
      	const payloadResponse = {
       		 'list':['Car Service','Bike Service','SOS Service'],
       		 'title':'Mekvahan Service List',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
    }
    
    else if(params.includes('hour')){
    	agent.add(name+"\n\nWe give Regular service 9 AM to 9PM and SOS or Emergency services" 
				+" 24*7 to our esteemed customers.");
    }
    
    else if((params.includes('sos'))||(params.includes('roadside'))){
    	agent.add(name+"\n\nYou can avail emergency assistance (onsite or roadside assistance)" 
				+" on click of a button for towing, breakdown, key recovery, out of fuel," 
				+" door lock etc. Most importantly you don’t need any subscription to avail" 
				+" this service and you can track help arriving to you when your family or" 
				+" you are in a distress situation. Always be assured of a Mekvahan assist" 
				+" partner to be around you and reach you within 45 minutes. No more calls" 
				+" and queues when you need quick assistance.");
    }
    
    else if(params.includes('support')){
    	agent.add(name+"\n\nOur 24x7 customer support is available to assist you either" 
				+" through Help section in the App or you can directly connect with our" 
				+" support team at +91-7838878899");
    }
    
    else if((params.includes('able')||params.includes('cant')||params.includes('not'))&&(params.includes('find'))){
    	agent.add(name+"\n\nWe service every kind of cars and bikes with accuracy and" 
				+" transparency and if you don’t find any model on our website or" 
				+" mobile app then contact us with our support team 24*7"  
				+" (+91-7838878888) and get an instant quote.");
    }
    
    else if(params.includes('cancel')){
      agent.add(name+"\n\nYou can simply go to the “Bookings” section of the App and cancel the" 
				+" booking anytime before your vehicle is picked up or in any case you face" 
				+" difficulties contact us with our support team 24*7  @(+91-7838878888).");
    }
      
    else if(params.includes('referral')){
      agent.add(name+"\n\nHelp us grow by introducing Mekvahan to your friends and also earn rewards." 
				+" On every friend you invite, you can get upto Rs. 500 off.");
      
      agent.add(`Share your invite code “ABHI20” with your friend.`);
      
      agent.add("After you refer someone, you and the referee each will get a credit of"
				+" ₹100 & ₹50 in your respective wallets (after both of you download the app)" 
				+" and an additional credit of ₹25 & ₹75 (after both of you complete the first" 
				+" service of minimum ₹500).");
    }
      
    else if(params.includes('offer')){
      agent.add(name+"\n\nCoupon code available - ​MVNEW​ “Flat 50% off on any service upto ₹200”." 
				+" (Available for first time users only)");
    }
    
    else if(params.includes('more')&&params.includes('option')){
      
      	const payloadResponse = {
       		 'list':['Mekcoins wallet','FAQs'],
       		 'title':'More Options',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
      	
    	agent.add(new Suggestion(`Mekcoins wallet`));
    	agent.add(new Suggestion(`FAQs`));
     }
    
    else if(params.includes('mekcoin')||params.includes('wallet')){
      agent.add(name+"\n\nWe, at Mekvahan, think that discounts and cashbacks have become a" 
				+" trend today to acquire and retain a user base more & more and the time" 
				+" has come to introduce new measures to provide bigger and better benefits" 
				+" to everyone. To that, we introduce MekCoins Wallet , the new way to earn," 
				+" transact & save on Mekvahan Services.");
      
      agent.add("App install Offers/promo codes/ coupons/cashbacks can be used to earn" 
				+" Mekcoins, which is automatically credited in your wallet basis the specific"
				+" T&C of the offer. You can add MekCoins with the help of coupon codes on the" 
				+" redeem voucher page. In one transaction, you can either");
      
      agent.add(`1. Earn new Mekcoins as cashback\n2. Use the existing Mekcoins as discount`);
     
    }
    
    else if(params.includes('faq')){
      	agent.add(name);
      
    	agent.add("1. Is Mekvahan a service center?\n\n"
     			+"We don’t own physical service centers. Mekvahan is a stack that has partnered with authorized, multi-brand and independent garages with defined specifications and expertise. They have curated their specialization and listed it on the Mekvahan platform. We prefer to empower customers with the choice to select their service center depending on the job requirements and customer priorities.");
    
      	agent.add(" 2. How is Mekvahan better than other aggregators?\n\n"
                  +"Mekvahan doesn’t confuse customers with too many options. We keep it simple with few options with best-suited structure and coverage for your vehicle at a very competitive price available in the market. Mekvahan acts as a single point of contact to manage any service, repair, maintenance service or damage with specifications  in an organized structured way.");
      
      	agent.add("3. Pickup and drop off service of my vehicle is chargeable or free?\n\n"
                  +"Absolutely free, Mekvahan gives you free pickup and drop off service (validating certain T&Cs).");
      
      	agent.add("4. Which parts and inventory do we use?\n\n"
                  +"Mekvahan uses only genuine parts and inventory (supplied directly from verified OEMs or OESs) for customer benefit.");
      
      	agent.add("5. Are we providing any warranty period?\n\n"
                  +"Our every kind of service comes under the particular warranty period (based upon the class of service availed).");
      
      	agent.add("6. Which type of cars and bikes do we service?\n\n"
                  +"We service every kind of cars and bikes with accuracy and transparency and if you don’t find any model on our website or mobile app then contact us with our support team 24*7  (+91-7838878888) and get an instant quote.");
      
      	agent.add("7. Which engine oil grade do we use in the car or bike service?\n\n"
                  +"We use the best suitable grades of the top brands available in the market according to the need and model of the vehicle for the engine oil requirements.");
      
      	agent.add("8. What if I face any issue after the service of my car or bike?\n\n"
                  +"We automatically give you an unconditional warranty period on service for your car/bike when you book your service. Apart from this, our 24x7 customer support is available to assist you.");
      
      	agent.add("9. Why is mekvahan better for your car rather than authorised service centre or local vendor?\n\n"
                  +"Quality is hard to assure from the local service centres and there is no sense of transparency in the services they provide.\nThe authorised service centres are unnecessarily expensive and multi-brand workshops don’t have a standard operating procedure. Also, the quotations provided by these centres vary from one another.");
      
      	agent.add("10. How Can You Offer 40% Savings On Services?\n\n"
                  +"Our distinctive business model enables us to provide affordable car services. We achieve savings on labour costs, centralized bulk procurement of spare parts, no real-estate overheads, and adept operational excellence, which are passed on straight to You as the customer.");
    }
    
    else{
    	agent.add(`Instruction unclear, retry. 🙃`);
    }
   
  }
  
  function level2(agent){
  	var params = agent.parameters.level2;
    
    params = params.toLowerCase();
    
    if(params.includes('sos')&&params.includes('service')){
      
      agent.add(new Suggestion(`Flat Tyre`));
      agent.add(new Suggestion(`Battery JumpStart`));
      agent.add(new Suggestion(`Key Recovery`));
      agent.add(new Suggestion(`Emergency Fuel`));
      agent.add(new Suggestion(`Emergency Towing`));
      agent.add(new Suggestion(`Onsite Assistance`));
      agent.add(new Suggestion(`Chauffeur Service`));
      agent.add(new Suggestion(`Technical Support`));
      agent.add(new Suggestion(`Cabs & More`));
      
      	const payloadResponse = {
       		 'list':['Flat Tyre','Battery JumpStart','Key Recovery','Emergency Fuel','Emergency Towing',
                    'Onsite Assistance','Chauffeur Service','Technical Support','Cabs & More'],
       		 'title':'SOS Services',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
      
    }
    else if(params.includes('car')&&params.includes('service')){
      
      agent.add(new Suggestion(`General Service`));
      agent.add(new Suggestion(`Repairing`));
      agent.add(new Suggestion(`Wheel Care`));
      agent.add(new Suggestion(`Denting and Painting`));
      agent.add(new Suggestion(`Car Care`));
      agent.add(new Suggestion(`Others`));
      
      	const payloadResponse = {
       		 'list':['General Service','Repairing','Wheel Care','Denting and Painting','Car Care',
                    'Others'],
       		 'title':'Car Services',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
      
    }
    else if(params.includes('bike')&&params.includes('service')){
      
      agent.add(new Suggestion(`General Service`));
      agent.add(new Suggestion(`Repairing`));
      agent.add(new Suggestion(`Wheel Care`));
      agent.add(new Suggestion(`Bodypart Fixer`));
      agent.add(new Suggestion(`Bike and Engine Care`));
      agent.add(new Suggestion(`Others`));
      
      	const payloadResponse = {
       		 'list':['General Service','Repairing','Wheel Care','Bodypart Fixer','Bike and Engine Care',
                    'Others'],
       		 'title':'Bike Services',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
    }
    else{
    	agent.add(`Instruction unclear, retry. 🙃`);
    }
  }
  
  function level3(agent){
    	var name2 = agent.parameters.level2;
    	var name3 = agent.parameters.level3;
    	var params2 = name2.toLowerCase();
    	var params3 = name3.toLowerCase();
    	if(params2.includes('sos')){
          agent.add('You chose '+name3+' under '+name2+' category, here is some info about the service.');
        	if(params3.includes('tyre')&&params3.includes('flat')){
            	agent.add('Description:\nTyre punctured by sharp objects. Our service providers get the puncture removed.' 
 						+'\n\n● ID proof copy of the customer is mandate.'
                        +'\n● Flat tyre fixing cost is only for one puncture. Additional punctures will be charged extra.'
                        +'\n● All the spares, consumables & accessories are charged extra.'
                        +'\n● Car tube tyre punctures can not be fixed on the spot.'
                        +'\n● We will charge 149INR for Bike & 249INR for Car if the request is cancelled after our technicians reach the spot.');
            }
          else if(params3.includes('battery')||params3.includes('jumpstart')){
            	agent.add('Description:\nBattery is fully discharged & the engine is not cranking. Our service providers give external charge to the battery to get the ignition working.' 
 						+'\n\n● ID proof copy of the customer is mandate.'
                        +'\n● All the spares (Battery), consumables & other accessories are charged extra.'
                        +'\n● We recommend to keep the vehicle ON for at least 40 Minutes after the Jumpstart.'
                        +'\n● We will charge 149INR for Bike & 249INR for Car if the request is cancelled after our technicians reach the spot.');
            }
          else if(params3.includes('key')&&params3.includes('recover')){
          		agent.add('Description:\nKey is lost somewhere and key socket not working. Our service provider change the key lockout or repairs it.' 
 						+'\n\n● ID proof copy of the customer is mandate.' 
						+'\n● Customer should be available while doing unlock.'
                        +'\n● The Vehicle registration certificate should match with the customer identity.'
                        +'\n● All the spares (Keys, Key Set, Fuses etc), consumables & other accessories are charged extra.'
                        +'\n● We provide only a temporary solution & we recommend our customers to get a complete service done from an authorised service center.'
                        +'\n● We will charge 149INR for Bike & 249INR for Car if the request is cancelled after our technicians reach the spot.');
          }
          else if(params3.includes('fuel')){
          		agent.add('Description:\nVehicle is not starting or vehicle turns off after ignition. Our service providers will be sent to the location with fuel requested.' 
 						+'\n\n● ID proof copy of the customer is mandate.'
                        +'\n● Fuel cost is charged extra on actual price in the city.'
                        +'\n● We will fill the fuel to the Car or Bike in front of the customer.'
                        +'\n● Fuel delivery is available depending on the fuel availability in the city.'
                        +'\n● We will charge 149INR for Bike & 249INR for Car if the request is cancelled after our technicians reach the spot.');
          }
          else if(params3.includes('towing')){
          		agent.add('Description:\nVehicle is not starting or the vehicle got broken down, some time after ignition. Our service provider provides a forklift or flatbed crane towing.' 
 						+'\n\n● ID proof copy of the customer is mandate.'
                        +'\n● Beyond 15KMs (Per KM) 30INR.'
                        +'\n● Waiting charge is applicable beyond 40 Mins delay in onloading or offloading the vehicle.'
                        +'\n● Waiting charges - 249INR (Day) & 400INR (Night) for every one hour.'
                        +'\n● Toll charges, Parking charges & Permits are extra.'
                        +'\n● We will charge 149INR for Bike & 249INR for Car if the request is cancelled after our technicians reach the spot.');
          }
          else if(params3.includes('onsite')&&params3('assist')){
          		agent.add('Description:\nHorn malfunction occurs, headlights not working and wiper blade not working. Our service provider repairs or replaces it.' 
 						+'\n\n● ID proof copy of the customer is mandate.'
                        +'\n● The above cost is only for Minor fixes on-spot which can be done within 15-20mins. If any major work involved then it will be charged extra.'
                        +'\n● All the spares, consumables & accessories are charged extra.'
                        +'\n● We will charge 149INR for Bike & 249INR for Car if the request is cancelled after our technicians reach the spot.');
          }
          else if(params3.includes('chauffeur')){
          		agent.add('Description:\nOur professional & trained drivers whose job is to drive your car or bike for the user from one location to another location.'  
 						+'\n\n● ID proof copy of the customer is mandate.'
                        +'\n● Beyond 15KMs (Per KM) 30INR.'
                        +'\n● Waiting charge is applicable beyond 40 Mins delay in onloading or offloading the vehicle.'
                        +'\n● Waiting charges - 249INR (Day) & 400INR (Night) for every one hour.'
                        +'\n● Toll charges, Parking charges & Permits are extra.'
                        +'\n● We will charge 149INR for Bike & 249INR for Car if the request is cancelled after our technicians reach the spot.');
          }
          else if(params3.includes('technical')&&params3.includes('support')){
          		agent.add('Description:\nTech support and detailed information on any mechanical or electrical issues(s) in the user\'s car or bike or any other external issues like horn malfunction occurs, headlights not working and wiper blade not working. Users can directly talk with the OEM/OES or vehicle brand tech support team');
          }
          else if(params3.includes('cabs')&&params3.includes('more')){
          		agent.add('Description:\nAny Outstation Cab can be booked.'
                        +'\n\n● ID proof copy of the customer is mandate.'
                        +'\n● We will charge 149INR for Bike & 249INR for Car if the request is cancelled after our technicians reach the spot.');
          }
          else{
          		agent.add(`Instruction unclear, retry. 🙃`);
          }
          agent.add('That\'s it for this service class want to explore another one?')
              agent.add(new Suggestion('Car Service'));
              agent.add(new Suggestion('Bike Service'));
          //agent.setContext({ name: 'level5', lifespan: 50 });
         //end of sos service here once and for all. 
        }
    //process for remaining two services.
  		else if(params2.includes('car')){
        	if(params3.includes('general')){
              agent.add(new Suggestion('Primary Service'));
              agent.add(new Suggestion('Standard Service'));
              agent.add(new Suggestion('Comprehensive Service'));
              
      	const payloadResponse = {
       		 'list':['Primary Service','Standard Service','Comprehensive Service'],
       		 'title':'General Service for cars',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
            }
          	else if(params3.includes('repair')){
              	agent.add(new Suggestion('Comprehensive Checkup'));
              	agent.add(new Suggestion('Brake/Disk Pad Replacement'));
              	agent.add(new Suggestion('Ac Check'));
              	agent.add(new Suggestion('Ac Gas Refill'));
              	agent.add(new Suggestion('Ac Service'));
              	agent.add(new Suggestion('Clutch Check'));
              	agent.add(new Suggestion('Battery Charging/Replacement'));
              	agent.add(new Suggestion('Other Diagnosis'));
              	agent.add(new Suggestion('Car Scanning'));
              
      	const payloadResponse = {
       		 'list':['Comprehensive Checkup','Brake/Disk Pad Replacement','Ac Check',
                    'Ac Gas Refill','Ac Service','Clutch Check','Battery Charging/Replacement',
                    'Other Diagnosis','Car Scanning'],
       		 'title':'Repairing Service for cars',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
            }
          	else if(params3.includes('wheel')&&params3.includes('care')){
              	agent.add(new Suggestion('Wheel Alignment'));
              	agent.add(new Suggestion('Wheel Balancing'));
              	agent.add(new Suggestion('Wheel Alignment And Balancing'));
              	agent.add(new Suggestion('Tyre Replacement'));
              
      	const payloadResponse = {
       		 'list':['Wheel Alignment','Wheel Balancing','Wheel Alignment And Balancing',
                    'Tyre Replacement'],
       		 'title':'Wheel Care Service for cars',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
            }
          	else if(params3.includes('dent')&&params3.includes('paint')){
              	agent.add(new Suggestion('Bumper Front'));
              	agent.add(new Suggestion('Bumper Rear'));
              	agent.add(new Suggestion('Quarter Panel Left'));
              	agent.add(new Suggestion('Quarter Panel Right'));
              	agent.add(new Suggestion('Running Board Left'));
              	agent.add(new Suggestion('Running Board Right'));
              	agent.add(new Suggestion('Dicky'));
              	agent.add(new Suggestion('Bonnet'));
              	agent.add(new Suggestion('Roof'));
              	agent.add(new Suggestion('Full Body'));
              	agent.add(new Suggestion('Fender Left'));
              	agent.add(new Suggestion('Fender Right'));
              	agent.add(new Suggestion('Door Front Left'));
              	agent.add(new Suggestion('Door Front Right'));
              	agent.add(new Suggestion('Door Rear Left'));
              	agent.add(new Suggestion('Door Rear Right'));
              
      	const payloadResponse = {
       		 'list':['Bumper Front','Bumper Rear','Quarter Panel Left','Quarter Panel Right',
                    'Running Board Left','Running Board Right','Dicky','Bonnet','Roof',
                    'Full Body','Fender Left','Door Front Left','Door Front Right','Door Rear Left',
                    'Door Rear Right'],
       		 'title':'Denting and Painting for cars',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));	
            }
          	else if(params3.includes('car')&&params3.includes('care')){
              	agent.add(new Suggestion('Car Wash'));
              	agent.add(new Suggestion('Interior Dry Cleaning'));
              	agent.add(new Suggestion('Exterior Rubbing & Polishing'));
              	agent.add(new Suggestion('Complete Car Detailing'));
              	agent.add(new Suggestion('Teflon Coating'));
              	agent.add(new Suggestion('Nano Coating'));
              
      	const payloadResponse = {
       		 'list':['Car Wash','Interior Dry Cleaning','Exterior Rubbing & Polishing',
                     'Complete Car Detailing','Teflon Coating','Nano Coating'],
       		 'title':'Car Care Service for cars',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));	
            }
          	else if(params3.includes('other')){
              	agent.add(new Suggestion('Mechanical Problems'));
              	agent.add(new Suggestion('Electrical Problems'));
              
      	const payloadResponse = {
       		 'list':['Mechanical Problems','Electrical Problems'],
       		 'title':'Other Service for cars',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
            }
        }
    
    	else if(params2.includes('bike')){
        	if(params3.includes('general')){
              agent.add(new Suggestion('Primary Checkup'));
              agent.add(new Suggestion('Standard Checkup'));
              agent.add(new Suggestion('Comprehensive Checkup'));
              
      	const payloadResponse = {
       		 'list':['Primary Checkup','Standard Checkup','Comprehensive Checkup'],
       		 'title':'General Service for bikes',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
            }
          	else if(params3.includes('repair')){
              	agent.add(new Suggestion('Brake Shoe Replacement'));
              	agent.add(new Suggestion('Brake Pad Replacement'));
              	agent.add(new Suggestion('Clutch Cable Replacement'));
              	agent.add(new Suggestion('Brake Pad/ Disk Pad Replacement'));
              	agent.add(new Suggestion('Disk Brake Bleeding'));
              	agent.add(new Suggestion('Disc Plate Replacement'));
              	agent.add(new Suggestion('Disc Caliper'));
              	agent.add(new Suggestion('Master Cylinder Overhaul'));
              	agent.add(new Suggestion('Brakes Cleaning'));
              	agent.add(new Suggestion('Accelerator Cable Replacement'));
              	agent.add(new Suggestion('Speedometer Cable Replacement'));
              	agent.add(new Suggestion('Seat Cable Replacement'));
              	agent.add(new Suggestion('Brake Cable Replacement'));
              	agent.add(new Suggestion('Throttle Cable Replacement'));
              	agent.add(new Suggestion('Choke Cable Replacement'));
              	agent.add(new Suggestion('Clutch Lever Replacement'));
              	agent.add(new Suggestion('Brake Lever Replacement'));
              	agent.add(new Suggestion('Rear Brake Pedal Replacement'));
              	agent.add(new Suggestion('Clutch Cable Replacement'));
              	agent.add(new Suggestion('Lock Assy Or Ignition Key Assy Replacement'));
              	agent.add(new Suggestion('Cone Set Or Steering Ball Race Replacement'));
              	agent.add(new Suggestion('Switch Assembly Replacement'));
              	agent.add(new Suggestion('Wiring Check Up'));
              	agent.add(new Suggestion('Wiring Harness Replacement'));
              	agent.add(new Suggestion('Magnet Coil Checkup'));
              	agent.add(new Suggestion('Wiring Overhaul'));
              
      	const payloadResponse = {
       		 'list':['Brake Shoe Replacement','Brake Pad Replacement','Clutch Cable Replacement',
                     'Brake Pad/ Disk Pad Replacement','Disk Brake Bleeding','Disc Plate Replacement',
                     'Disc Caliper','Master Cylinder Overhaul','Brakes Cleaning','Accelerator Cable Replacement',
                     'Speedometer Cable Replacement','Seat Cable Replacement','Brake Cable Replacement','Throttle Cable Replacement','Choke Cable Replacement',
                    'Clutch Lever Replacement','Brake Lever Replacement','Rear Brake Pedal Replacement','Clutch Cable Replacement','Lock Assy Or Ignition Key Assy Replacement',
                    'Cone Set Or Steering Ball Race Replacement','Switch Assembly Replacement','Wiring Check Up','Wiring Harness Replacement','Magnet Coil Checkup',
                    'Wiring Overhaul'],
       		 'title':'Repairing Service for bikes',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));	
            }
          	else if(params3.includes('wheel')&&params3.includes('care')){
            	agent.add('1. Tyre Replacement\n2. Spoke Wheel Replacement\n3. Alloy Wheel Replacement\n'
                          +'4. Rim Or Alloy Wheel Truing\n5. Wheel Bearing Replacement\n'
                          +'6. Tyre Tube Puncture\n'
                          +'7. Tyre Tubeless Puncture\n8. Tube Replacement');
              	
              	agent.add(new Suggestion('Tyre Replacement'));
              	agent.add(new Suggestion('Spoke Wheel Replacement'));
              	agent.add(new Suggestion('Alloy Wheel Replacement'));
              	agent.add(new Suggestion('Rim Or Alloy Wheel Truing'));
              	agent.add(new Suggestion('Wheel Bearing Replacement'));
              	agent.add(new Suggestion('Tyre Tube Puncture'));
              	agent.add(new Suggestion('Tyre Tubeless Puncture'));
              	agent.add(new Suggestion('Tube Replacement'));
              
      	const payloadResponse = {
       		 'list':['Tyre Replacement','Spoke Wheel Replacement','Alloy Wheel Replacement',
                     'Rim Or Alloy Wheel Truing','Wheel Bearing Replacement','Tyre Tube Puncture',
                    'Tyre Tubeless Puncture','Tube Replacement'],
       		 'title':'Wheel Care Service for bikes',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
            }
          	else if(params3.includes('body')&&params3.includes('fix')){
              	agent.add(new Suggestion('Center Stand Replacement'));
              	agent.add(new Suggestion('Handlebar Replacement'));
              	agent.add(new Suggestion('Side Stand Replacement'));
              	agent.add(new Suggestion('Mirror Replacement'));
              	agent.add(new Suggestion('Lock Set Replacement'));
              	agent.add(new Suggestion('Footrest Replacement'));
              	agent.add(new Suggestion('Mud Guard Replacement'));
              	agent.add(new Suggestion('Crash Guard Replacement'));
              	agent.add(new Suggestion('Chain Cover Replacement'));
              	agent.add(new Suggestion('Fork Bend Removal'));
              	agent.add(new Suggestion('Headlight Unit Replacement'));
              	agent.add(new Suggestion('Headlight Bulb Replacement'));
              	agent.add(new Suggestion('Tail Light Bulb Replacement'));
              	agent.add(new Suggestion('Indicator Bulb Replacement'));
              	agent.add(new Suggestion('Fuse Replacement'));
              	agent.add(new Suggestion('Parking Bulb Replacement'));
              
      	const payloadResponse = {
       		 'list':['Center Stand Replacement','Handlebar Replacement','Side Stand Replacement','Mirror Replacement','Lock Set Replacement',
                    'Footrest Replacement','Mud Guard Replacement','Crash Guard Replacement','Chain Cover Replacement','Fork Bend Removal',
                    'Headlight Unit Replacement','Headlight Bulb Replacement','Tail Light Bulb Replacement','Indicator Bulb Replacement','Fuse Replacement',
                    'Parking Bulb Replacement'],
       		 'title':'Bodypart Fixer Service for bikes',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
            }
          	else if(params3.includes('engine')&&params3.includes('care')){
              	agent.add(new Suggestion('Oiling And Lubricant'));
              	agent.add(new Suggestion('Coolant Top Up'));
              	agent.add(new Suggestion('Battery Distilled Water Top Up'));
              	agent.add(new Suggestion('Half Engine Overhaul'));
              	agent.add(new Suggestion('Full Engine Overhaul'));
              	agent.add(new Suggestion('Clutch Overhaul'));
              	agent.add(new Suggestion('Battery Charging'));
              	agent.add(new Suggestion('Battery Replacement'));
              	agent.add(new Suggestion('Fork Oil Replacement'));
              	agent.add(new Suggestion('Brake Fluid Replacement'));
              	agent.add(new Suggestion('Carburettor Clean'));
              	agent.add(new Suggestion('Spark Plug Replacement'));
              	agent.add(new Suggestion('Air Filter Replacement'));
              	agent.add(new Suggestion('Chain Sprocket Replacement'));
              	agent.add(new Suggestion('Front Fork Or Seal Replacement'));
              	agent.add(new Suggestion('Petrol Pipe Replacement'));
              	agent.add(new Suggestion('Tappet Adjustment'));
              	agent.add(new Suggestion('Bike Wash And Polish'));
              
      	const payloadResponse = {
       		 'list':['Oiling And Lubricant','Coolant Top Up','Battery Distilled Water Top Up','Half Engine Overhaul','Full Engine Overhaul',
                    'Clutch Overhaul','Battery Charging','Battery Replacement','Carburettor Clean','Spark Plug Replacement',
                    'Air Filter Replacement','Chain Sprocket Replacement','Front Fork Or Seal Replacement','Petrol Pipe Replacement','Tappet Adjustment',
                    'Bike Wash And Polish'],
       		 'title':'Bike and Engine Care Service for bikes',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
            }
          	else if(params3.includes('other')){
              	agent.add(new Suggestion('Mechanical Problems'));
              	agent.add(new Suggestion('Electrical Problems'));
              
      	const payloadResponse = {
       		 'list':['Mechanical Problems','Electrical Problems'],
       		 'title':'Other Service for bikes',
       		 'type':'list'
    	};

  		agent.add(
    		new Payload(agent.TELEGRAM, payloadResponse, {rawPayload: true, sendAsMessage: true}));
            }
        }
    	
    	else{
          		agent.add(`Instruction unclear, retry. 🙃`);
        }
    	agent.setContext({ name: 'level4', lifespan: 50 });
  }
  
  function level4(agent){
  		agent.add('intent level4, pink data for bike and car services');
    	var name2 = agent.parameters.level2;
    	var name3 = agent.parameters.level3;
    	var params2 = name2.toLowerCase();
    	var params3 = name3.toLowerCase();
    	agent.add('data from api');
    
    	agent.add('would like to explore another one?');
    	agent.add(new Suggestion('Car Service'));
    	agent.add(new Suggestion('Bike Service'));
    	agent.add(new Suggestion('SOS Service'));
    	//agent.setContext({ name: 'level5', lifespan: 50 });
  }
  
  function level5(agent){
    	var name2 = agent.parameters.level2;
    	var name3 = agent.parameters.level3;
    	var name4 = agent.parameters.level4;
    	var params2 = name2.toLowerCase();
    	var params3 = name3.toLowerCase();
    	var params4 = name4.toLowerCase();
  		agent.add('level5, to purchase this service call an api or Abhijeet sir');
    	agent.add('service parameters: '+name2+' --> '+name3+' --> '+name4);
  }
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('AboutBot', aboutbot);
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('welcomeservice', welcomeservice);
  intentMap.set('level1',level1);
  intentMap.set('level2',level2);
  intentMap.set('level3',level3);
  intentMap.set('level4',level4);
  intentMap.set('level5',level5);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
