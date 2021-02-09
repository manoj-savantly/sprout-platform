# sprout-platform  
![CI](https://github.com/savantly-net/sprout-platform/workflows/CI/badge.svg)


![Sprout Web App](./docs/img/favicon.png)  
  
The Sprout Platform provides an extensible and modular application platform, suitable for custom CMS, line-of-business, application portals, or other types of apps.  

You can use the default server, or add the [Sprout Starter Library](https://github.com/savantly-net/sprout-platform/tree/master/backend/starters/sprout-spring-boot-starter) to your own Spring Boot project.  
It can be used headless, but a default UI is provided which is customizable via plugins.  

It's opinionated, but the default configurations can be backed off - so you can use as much or as little as you want.   
Full documentation is in progress, and PRs are welcome!  

# [Go here for documentation](https://sprout-platform.web.app/)  

The front-end UI uses a `plugin` system to add or modify functionality.  
[Read more about the front-end](./frontend/)  

The back-end server uses a `module` system to add or modify functionality. A `module` may also provide `plugins` to the UI.  
[Read more about the back-end](./backend/)  


The platform has gone through several iterations - AngularJS, Angular 2/4/6, and now React.  
I got lots of inspiration [and code] from the Grafana UI + toolkit for this latest iteration.  

I'd love to get some input from the community!  

If there is specific feature you'd like, or if you experience a bug, please open an issue [here](https://github.com/savantly-net/sprout-platform/issues)  

Please consider contributing through PRs or [Patreon](https://www.patreon.com/savantly)  

I believe the Open Source community needs an enterprise grade CMS that's flexible enough for any project starter.  
Help me create that! 

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/Savantly)  

Sprout platform is currently being refactored to leverage the latest libraries and practices. 
Follow this project to stay informed.  

## Quick Start  

Use the docker images to start an example server + web app.  
`docker-compose up`  

The example server creates a user -  
username: admin  
password: changeme!  


## Examples

### Live Server Demo  
- username: admin  
- password: changeme!  

[https://sprout-server.herokuapp.com/](https://sprout-server.herokuapp.com/)  

### Live Client Demo
- username: admin  
- password: changeme!  

[https://sprout-web.herokuapp.com/](https://sprout-web.herokuapp.com/)  


### Screenshots 

#### Default Website Landing Page

![Sprout Web App](./docs/img/default.png)  

#### Editing a Panel 

![Editing a Panel](./docs/img/dashboards.gif)

#### Panel Editor

![Sprout Web App](./docs/img/panel_edit.png)  

#### File/Document Management

![Editing a Panel](./docs/img/examples/file-manager.gif)
