todo:
- more ion icons (or icomoon)
- launch camera immediately
- pick picture from library
- add user (dependant)
- Add Misc Data Bit
- display photo
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
- bug: delete data bit response includes deleted databit


in progress:
- Add Photo Data Bit


backlog:
- rotate to scan


done:

x - cache user request/attach user to global scope
x - sign up
x - encode barcode URL (not just barcode)
x - Add Birthday Data Bit
x - Add Health Data Bit
x - Add Phone Data Bit
x - display data bits
x - Make User Update Globally
n - Figure out Back Buttons
x - Figure out Header
x - Menu: Log In/Register/{{name}}/Logout
x - splash screen
x - barcode width
x - current user display => /profile.html
x - profile w/SlideBox having last slide be add dependant
x - logging
x - on scan, add record to database (scanner, scanee, event, timestamp)
x - delete data bit
x - home page history
x - splashscreens
