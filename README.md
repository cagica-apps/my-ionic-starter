# my-ionic-starter

An ionic app boilerplate

Based on Ionic Base (https://github.com/meltuhamy/ionic-base).

From Ionic Base  
		* Unit test support using karma  
		* Better gulp tasks.  

Added angular-material, because the grid system is better than ionic grid.  
Added andy.scss mixins (https://github.com/gillesbertaux/andy)

## Installation
Clone or download the repository and run:  
	
```
npm install
bower install
```

## Better project structure for big applications
```
www  
├── app.js  
├── app  
│   ├── components  
│   │   ├──accounts  
│   │   │   ├── account.ctrl.js  
│   │   │   ├── account.scss  
│   │   │   └── tab-account.html  
│   │   ├── chats  
│   │   │   ├── chats.ctrl.js  
│   │   │   ├── chatdetail.ctrl.js  
│   │   │   ├── chats.scss  
│   │   │   ├── tab-chats.html  
│   │   │   └── chat-detail.html  
│   │   └── dash  
│   │       ├── dash.ctrl.js  
│   │       ├── dash.scss  
│   │       └── tab-dash.html  
│   ├── layout  
│   │   └── tabs  
│   │       └── tabs.html  
│   └── shared  
│   │   └── services  
│   │       └── chats.service.js  
├── img  
└── scss  
    ├── _mixins.scss  
    └── ionic.app.scss  
 ```
