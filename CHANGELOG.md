# v0.3.0—Super Power Selector Modal
- Added Modal to select super powers
  - Modal supports single and multi selection
  - Modal supports option enabledSuperpowers so only super powers that are in that collection are enabled
- Added directive that provides a button to open the selector modal
  - The button supports required attribute. When required is set at least one item has to be selected
  - The button also handles multi and single selection and has different button texts for each case
- Hero Form View checkbox group selector is replaced withe super power selector directive
- Hero got new attribute `strongestSuperpower`
- Hero List View highlights strongest super power  

# v0.2.0—Manage Super Powers
- Created `super-power` module with a list and a form view to create, read, update and delete super powers
- Added attribute icon to the super power
- Added new column to hero list view to display the super powers by using the super power icon
- The delete button of super powers is disabled when the super power is applied on a hero

# v0.1.3—Super Powers
- The heroes got super powers as a new property
- The hero model was extended with a nested collection for the super powers
- Selector was added in the form view to select super powers
- json-server was extended with a new endpoint `/super-powers`

# v0.1.2—Custom Validator
- Added a custom validator directive to verify that the hero name does not already exist
- Registered a validator message to give the user a feedback that the hero is already existing
- Added function to hero collection to find hero by name case insensitive

# v0.1.1—Confirm Delete
In order to prevent accidental loss of a data a confirm modal was added that is displayed when
the user is hitting the delete button. Only when the modal is confirmed the model(s) will be destroyed.

# v0.1.0—Add Heroes
- Set up json-server to have a basic CRUD API
- Configured grunt connect task to proxy all requests to the json-server
- Added Hero module
- Added new menu entry Heroes in index.html
- Added a BackboneJS BaseCollection and a BaseModel in the main module
- Added Heroes Collection and Hero Model
- Added Index list view to see all available heroes
- Added Delete button to list view to delete selected heroes
- Added Form view to create new heroes or to edit existing heroes
- Added CUD toasts for successful POST, PUT, DELETE responses


# v0.0.1—Boiler Plate Portal
- Added default configurations
  - configured i18n with locales de_DE and en_US
  - configured default backend error response handlers
  - configured default handlers for backend CUD operations
  - configured javascript exception handler modal (success operation has still to be implemented)
  - configured user lost internet connection handler
  - configured new app cache version available when the cache manifest is used
- Added #404 view when a route does not exist  
- Added simple start module with no functionality just a simple view
- Added menu bar with Start entry to get to the start view
- Added a locale switcher
- Configured some bootstrap variables like $brand-primary color, custom font, ...
  
