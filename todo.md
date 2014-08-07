todo:
- offline view
- oauth
- address databit
- (*ask Tony*) databits
- apply preregistration URL params (organizationId/eventId)
- accept waiver
  - user finger to sign: https://github.com/szimek/signature_pad - bower install signature_pad
- add user (dependant)
- launch camera immediately
- Add Misc Data Bit
- does the scanner have option to display a cancel button?
- scanner timeout
- sort out back/scanner issues
- lightweight server to redirect barcode URL to scan page (e.g., if you scanned from non-sprtid scanner)
- preserve state such that re-opening the app starts where you left off (localStorage?)
- specific databit display/edit
- check-in process: present barcode; scan barcode; push notify or long poll scanee...accept waiver; push notify or long poll scanner...success
- do not require an authenticated state to do anything... write to localStorage, display a banner when things are unsaved
- consider the offline state... write to localStorage for every data-daving operation. if/when online becomes available, send to server
- do not require payment to add to profile... display a banner when additional "pay" data bits have been created (obv. hide those bits if !payment)
- more ion icons (or icomoon)
- memoize requests! (allow for localStorage or inMemory memoization)
- memoize filters


in progress:


backlog:
- add barcodes (e.g., replace the gym or grocery store barcode by scanning it and allowing a user to pick from a list)
- rotate to scan
- Figure out Back Buttons


done:
- cache user request/attach user to global scope
- sign up
- encode barcode URL (not just barcode)
- Add Birthday Data Bit
- Add Health Data Bit
- Add Phone Data Bit
- display data bits
- Make User Update Globally
- Figure out Header
- Menu: Log In/Register/{{name}}/Logout
- splash screen
- barcode width
- current user display => /profile.html
- profile w/SlideBox having last slide be add dependant
- logging
- on scan, add record to database (scanner, scanee, event, timestamp)
- delete data bit
- home page history
- splashscreens
- radioset (like button set)
- display photo
- Add Photo Data Bit
- pick picture from library
- ajax indicator
- bug: delete data bit response includes deleted databit
- preregister for an event: list all events: pick one; [choose dependant]; "sign form"
- request organization membership
- preregister: list only events belonging to an organization
- error messaging
- preregister: only show events for which a user has not already pre-registered
