# frontend-k8s

This service contains a express app which runs in node.js
See index.js file for more details on endpoints.

It also contains a Dockerfile in case if the service needs to be run in a containerized environment.
Dockerfile uses a node tag which was choosen based on M1 Macbook. This FROM image have ARM support as well.

frontend dicrectory is there if you want to deploy this service to a kubernetes cluster.
chart was generated with helm, so a lot of things will be extra in it. These can be utilized/referenced or removed as per need.

.dockerignore contains some of those folder which we do not need in docker image.
Also, we are doing npm install in Dockerfile because we do not want to copy each and every file under node_modules. It takes more time than installing all the dependencies with npm.


Helmcharts can be modified to add more environment variables. This will increase the configuration of the service, which is better if the service will get bigger in source code footprint. I am considering not to do that in this small service.


stakater-frontend.yaml file under helmchart directory is a sample output from helm template command, a little modified after. It can be deleted or used in a cluster. Suit your need.