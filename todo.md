todo:
- add user (dependant)
- Add Misc Data Bit
- display photo
- on scan, add record to database (scanner, scanee, event, timestamp)
- home page history
- does the scanner have option to display a cancel button?
- scanner timeout
- sort out back/scanner issues
- more ion icons (or icomoon)
- lightweight server to redirect barcode URL to scan page (e.g., if you scanned from non-sprtid scanner)
- delete data bit
- preserve state such that re-opening the app starts where you left off (localStorage?)
- specific databit display/edit
- check-in process: present barcode; scan barcode; push notify or long poll scanee...accept waiver; push notify or long poll scanner...success
- do not require an authenticated state to do anything... write to localStorage, display a banner when things are unsaved
- consider the offline state... write to localStorage for every data-daving operation. if/when online becomes available, send to server
- do not require payment to add to profile... display a banner when additional "pay" data bits have been created (obv. hide those bits if !payment)


in progress:
- logging
- profile w/SlideBox having last slide be add dependant
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
