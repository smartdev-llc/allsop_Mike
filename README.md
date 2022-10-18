# Allsop
This project using bootstrap and tailwin for UI
## Project Structure
    - Data: Dummy data 
    - Core: application level services
    - Features
        - Shopping Cart : Shopping Cart Mangement ( Total Cart Amount, Discount Amount, Order Item, Add Voucher, Remove Cart Item )
        - Products : Product managment ( show product by category, add proudct to order )
    - Shared: The shared module contains classes and resources which are used in more than one dynamically loaded module. By always loading with the application the shared components are ready whenever a module requests them.
        - Component:
            - Header and Cart Badge component
        - Services: Cart share service for store shopping cart information
        - Pipe: add  filter extension for simple filter product by category

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.
## How to run project 
## Install nodejs and library for project
Run `npm install` for install nodejs and libarary

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Run Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
