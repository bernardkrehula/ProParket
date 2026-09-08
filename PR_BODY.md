## Problem

- `JobFormModal/index.tsx` had grown unwieldy, with a single sprawling `return` holding every screen the modal can show
- Addresses were free text — typos, inconsistent formatting, no confirmation the place exists
- No way to see where a job is without copying the address into Maps by hand

## Root Cause

- View details, edit form, rooms, photos, the photo viewer, the delete dialog and the validation snackbar were all rendered inline in one component
- The address field was a plain `TextField` with no lookup behind it
- Page-local code is never cross-read, so a second copy of `NumberStepperField` shadowing the shared one, and the services query written twice in the same file, had both gone unnoticed

## Solution

- Split the modal into 12 components under `components/`, grouped into `address/`, `rooms/` and `photos/`; `index.tsx` becomes the parent that owns form state and the submit flow, and hands each screen to a child to render
- Move styles and helpers into `utils/` (`jobFormModalConfig`, `jobRoomUtils`, `suggestionsFilter`)
- Add Google Places autocomplete to the address field — MUI `Autocomplete` so it inherits the theme and keyboard handling, `freeSolo` so an address Places doesn't know still saves, debounced input, Croatian region and language bias
- Add a map preview with an `AdvancedMarker` under the address in both edit and view mode; clicking anywhere on it opens Google Maps in a new tab
- Resolve saved jobs' positions from their stored address via Places text search (`useAddressLocation`), cached per address
- Replace the duplicate `NumberStepperField` with the shared one and fold the twice-written services query into `useServices`
- Fix three bugs in the vendored autocomplete hook: stale responses overwriting newer ones, a rejected fetch leaving the spinner stuck, and `setState` inside an effect body

## Testing

Run on the branch head:

- `tsc -b`, `eslint --max-warnings=0` and `vite build` all clean

Needs a browser pass — requires **Places API (New)** + **Maps JavaScript API** on the key and a signed-in session:

```
VITE_GOOGLE_MAPS_PLACES_API_KEY=...
VITE_GOOGLE_MAPS_MAP_ID=...          optional, falls back to DEMO_MAP_ID
```

- New job: typing in Adresa shows suggestions after a pause, street line over city line — and fires one request per pause, not per keystroke
- Picking a suggestion fills the field and pins the map below it; clicking the map opens that location in a new tab
- An address Places doesn't know still types and saves — suggestions must not gate the field
- Opening a saved job shows the map in view mode; switching to edit keeps the pin until you start typing, then clears it
- Rooms still work after extraction: adding and removing rooms, services summing into price per m², room and job totals updating
- Photos still work after extraction: upload, delete, and paging through the full-screen viewer
- Save a job with several services in one room, then reopen it — `job_items` must round-trip to the same rooms, with material cost on a single row rather than multiplied across services
- Deleting a job, marking one finished, and returning one to progress still behave as before

`AdvancedMarker` renders nothing without a Map ID, so an empty tile means the env var, not the component.
